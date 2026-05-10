'use client'

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./CipherText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const CipherText = ({
  reach       = 110,
  fadeDuration = 0.95,
  decodeSpeed  = 0.55,
  glyphSet     = "0123456789@#$%&!?ABCDEFabcdef",
  className    = "",
  style        = {},
  children,
}) => {
  const wrapRef    = useRef(null);
  const glyphsRef  = useRef([]);
  const hotSet     = useRef(new Set());
  const loopRef    = useRef(null);
  const cursorRef  = useRef({ x: -9999, y: -9999 });

  const scanGlyphs = useCallback(() => {
    const { x, y } = cursorRef.current;

    glyphsRef.current.forEach((g) => {
      const r    = g.getBoundingClientRect();
      const gx   = r.left + r.width  / 2;
      const gy   = r.top  + r.height / 2;
      const dist = Math.hypot(x - gx, y - gy);
      const near = dist < reach;
      const was  = hotSet.current.has(g);

      if (near && !was) {
        hotSet.current.add(g);
        const t = 1 - dist / reach;           // proximity 0-1

        gsap.to(g, {
          overwrite: "auto",
          duration:  0.18,
          scale:     1 + t * 0.15,
          color:     `hsl(${160 + t * 80}, 75%, ${60 + t * 25}%)`,
          ease:      "power2.out",
        });

        gsap.to(g, {
          overwrite: "auto",
          duration:  fadeDuration * (0.35 + t * 0.65),
          scrambleText: {
            text:        g.dataset.ch || "",
            chars:       glyphSet,
            speed:       decodeSpeed,
            revealDelay: 0.08,
          },
          ease: "none",
        });
      }

      if (!near && was) {
        hotSet.current.delete(g);
        gsap.to(g, {
          overwrite: "auto",
          duration:  0.35,
          scale:     1,
          color:     "",
          ease:      "sine.inOut",
        });
      }
    });

    loopRef.current = requestAnimationFrame(scanGlyphs);
  }, [reach, fadeDuration, decodeSpeed, glyphSet]);

  useEffect(() => {
    const wrap    = wrapRef.current;
    const liveSet = hotSet.current;
    if (!wrap) return;

    const para = wrap.querySelector("p");
    if (!para) return;

    const split = SplitText.create(para, {
      type:       "chars,words",
      charsClass: "gt-char",
      wordsClass: "gt-word",
    });

    glyphsRef.current = split.chars;

    glyphsRef.current.forEach((g) => {
      gsap.set(g, {
        display:         "inline-block",
        transformOrigin: "50% 55%",
        attr:            { "data-ch": g.textContent || "" },
      });
    });

    // Intro — stagger from centre outward
    gsap.fromTo(
      glyphsRef.current,
      { opacity: 0, y: 14, filter: "blur(8px)" },
      {
        opacity:  1,
        y:        0,
        filter:   "blur(0px)",
        duration: 0.55,
        stagger:  { each: 0.016, from: "center" },
        ease:     "expo.out",
        delay:    0.08,
      }
    );

    const onMove  = (e) => { cursorRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { cursorRef.current = { x: -9999, y: -9999 }; };

    wrap.addEventListener("pointermove",  onMove,  { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    loopRef.current = requestAnimationFrame(scanGlyphs);

    return () => {
      wrap.removeEventListener("pointermove",  onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
      split.revert();
      liveSet.clear();
    };
  }, [scanGlyphs]);

  return (
    <div ref={wrapRef} className={`gt-block ${className}`} style={style}>
      <span className="gt-label" aria-hidden="true">
        <span className="gt-pip" />
        hover to decode
      </span>
      <p className="gt-text">{children}</p>
    </div>
  );
};

export default CipherText;