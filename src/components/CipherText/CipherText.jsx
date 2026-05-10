'use client'

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./CipherText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const CipherText = ({
  radius = 120,
  duration = 1.0,
  speed = 0.6,
  scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const activeRef = useRef(new Set());
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const processChars = useCallback(() => {
    const { x, y } = mouseRef.current;

    charsRef.current.forEach((c) => {
      const { left, top, width, height } = c.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dist = Math.hypot(x - cx, y - cy);
      const inRange = dist < radius;
      const wasActive = activeRef.current.has(c);

      if (inRange && !wasActive) {
        activeRef.current.add(c);
        const proximity = 1 - dist / radius;

        gsap.to(c, {
          overwrite: "auto",
          duration: 0.2,
          scale: 1 + proximity * 0.18,
          color: `hsl(${270 - proximity * 60}, 80%, ${70 + proximity * 20}%)`,
          ease: "power2.out",
        });

        gsap.to(c, {
          overwrite: "auto",
          duration: duration * (0.4 + proximity * 0.6),
          scrambleText: {
            text: c.dataset.content || "",
            chars: scrambleChars,
            speed,
            revealDelay: 0.1,
          },
          ease: "none",
        });
      }

      if (!inRange && wasActive) {
        activeRef.current.delete(c);
        gsap.to(c, {
          overwrite: "auto",
          duration: 0.4,
          scale: 1,
          color: "",
          ease: "power2.inOut",
        });
      }
    });

    rafRef.current = requestAnimationFrame(processChars);
  }, [radius, duration, speed, scrambleChars]);

  useEffect(() => {
    const root = rootRef.current;
    const activeSet = activeRef.current;
    if (!root) return;

    const pEl = root.querySelector("p");
    if (!pEl) return;

    const split = SplitText.create(pEl, {
      type: "chars,words",
      charsClass: "ct-char",
      wordsClass: "ct-word",
    });

    charsRef.current = split.chars;

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: "inline-block",
        transformOrigin: "50% 60%",
        attr: { "data-content": c.textContent || "" },
      });
    });

    gsap.fromTo(
      charsRef.current,
      { opacity: 0, y: 16, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: { each: 0.018, from: "start" },
        ease: "power3.out",
        delay: 0.1,
      }
    );

    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    root.addEventListener("pointermove", handleMove, { passive: true });
    root.addEventListener("pointerleave", handleLeave, { passive: true });

    rafRef.current = requestAnimationFrame(processChars);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      split.revert();
      activeSet.clear();
    };
  }, [processChars]);

  return (
    <div ref={rootRef} className={`ct-block ${className}`} style={style}>
      <span className="ct-eyebrow" aria-hidden="true">
        <span className="ct-dot" />
        interactive
      </span>
      <p className="ct-text">{children}</p>
    </div>
  );
};

export default CipherText;