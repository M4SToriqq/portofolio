import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RevealText.css';

gsap.registerPlugin(ScrollTrigger);

const RevealText = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.08,
  baseRotation = 4,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="rt-word" key={index} data-word={word}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    gsap.fromTo(el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      { ease: 'none', rotate: 0,
        scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true },
      }
    );

    const words = el.querySelectorAll('.rt-word');

    gsap.fromTo(words, { opacity: baseOpacity },
      { ease: 'none', opacity: 1, stagger: 0.05,
        scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
      }
    );

    gsap.fromTo(words, { y: 12 },
      { ease: 'none', y: 0, stagger: 0.05,
        scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
      }
    );

    if (enableBlur) {
      gsap.fromTo(words, { filter: `blur(${blurStrength}px)` },
        { ease: 'none', filter: 'blur(0px)', stagger: 0.05,
          scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
        }
      );
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`rt-container ${containerClassName}`}>
      <span className="rt-bar" aria-hidden="true" />
      <p className={`rt-text ${textClassName}`}>{splitText}</p>
      <span className="rt-label" aria-hidden="true">scroll</span>
    </div>
  );
};

export default RevealText;