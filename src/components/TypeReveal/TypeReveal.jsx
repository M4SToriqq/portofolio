import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const TypeReveal = ({
  text,
  className = "",
  delay = 80,
  duration = 0.75,
  ease = "power4.out",
  splitType = "chars",
  from = { opacity: 0, y: 48, rotateX: -25, transformOrigin: "0% 50% -50px" },
  to = { opacity: 1, y: 0, rotateX: 0 },
  threshold = 0.1,
  rootMargin = "-80px",
  textAlign = "left",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;
    animationCompletedRef.current = false;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "tr-line",
      });
    } catch (error) {
      console.error("TypeReveal init failed:", error);
      return;
    }

    const targets =
      splitType === "lines" ? splitter.lines :
      splitType === "words" ? splitter.words :
      splitter.chars;

    if (!targets?.length) { splitter.revert(); return; }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity, filter";
      t.style.display = "inline-block";
    });

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit  = marginMatch ? (marginMatch[2] || "px") : "px";
    const sign = marginValue < 0
      ? `-=${Math.abs(marginValue)}${marginUnit}`
      : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el, start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => { scrollTriggerRef.current = self; },
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, { ...to, clearProps: "willChange,filter", immediateRender: true });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to, duration, ease,
      stagger: { each: delay / 1000, from: "start" },
      force3D: true,
    });

    return () => {
      tl.kill();
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      gsap.killTweensOf(targets);
      splitter?.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <p ref={ref} className={`tr-parent ${className}`} style={{ textAlign, overflow: "hidden", display: "block", whiteSpace: "normal", wordWrap: "break-word", perspective: "600px", }}>
      {text}
    </p>
  );
};

export default TypeReveal;