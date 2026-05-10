'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

const springEase = (t) =>
  1 - Math.exp(-5.5 * t) * Math.cos(2 * Math.PI * 1.3 * t * 0.28)
const lerp = (a, b, t) => a + (b - a) * t

function animateSpan(el, { dir, y, blur: blurPeak, dur, delay }) {
  let rafId = null
  let timerId = null
  const initX = dir === 'left' ? -y * 2 : dir === 'right' ? y * 2 : 0
  const initY = dir === 'top' ? -y : dir === 'bottom' ? y : 0

  const applyInitial = () => {
    el.style.opacity = '0'
    el.style.filter = `blur(${blurPeak}px)`
    el.style.transform = `translate(${initX}px, ${initY}px) scale(0.93)`
  }

  applyInitial()

  timerId = setTimeout(() => {
    const totalMs = dur * 1000
    let startTs = null

    const frame = (now) => {
      if (!startTs) startTs = now
      const rawT = Math.min((now - startTs) / totalMs, 1)
      const tPos = springEase(rawT)
      const tBlur = rawT < 0.55
        ? rawT / 0.55
        : 1

      el.style.opacity = Math.min(rawT / 0.35, 1).toFixed(3)
      el.style.filter = `blur(${Math.max(0, lerp(blurPeak, 0, tBlur)).toFixed(2)}px)`
      el.style.transform = [
        `translate(${lerp(initX, 0, tPos).toFixed(2)}px,`,
        `${lerp(initY, 0, tPos).toFixed(2)}px)`,
        `scale(${lerp(0.93, 1, tPos).toFixed(4)})`,
      ].join(' ')

      if (rawT < 1) rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
  }, delay)

  return () => {
    clearTimeout(timerId)
    if (rafId) cancelAnimationFrame(rafId)
  }
}

const FadeWords = ({
  text = '',
  className = '',
  style = {},
  animateBy = 'words',
  direction = 'bottom',
  stagger = 80,
  duration = 0.55,
  blurAmount = 14,
  offset = 28,
  threshold = 0.15,
  rootMargin = '0px',

  onComplete,
}) => {
  const segments = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  )

  const [inView, setInView] = useState(false)
  const containerRef = useRef(null)
  const spanRefs = useRef([])
  const cleanupRef = useRef([])

  const handleIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      setInView(true)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new IntersectionObserver(handleIntersect, { threshold, rootMargin })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [threshold, rootMargin, handleIntersect])

  useEffect(() => {
    if (!inView) return

    cleanupRef.current.forEach((fn) => fn())
    cleanupRef.current = []

    spanRefs.current.forEach((el, i) => {
      if (!el) return

      const delay = i * stagger
      const isLast = i === spanRefs.current.length - 1

      const cancel = animateSpan(el, {
        dir: direction,
        y: offset,
        blur: blurAmount,
        dur: duration,
        delay,
      })

      cleanupRef.current.push(cancel)

      if (isLast && onComplete) {
        const totalMs = delay + duration * 1000
        const tid = setTimeout(onComplete, totalMs)
        cleanupRef.current.push(() => clearTimeout(tid))
      }
    })

    return () => {
      cleanupRef.current.forEach((fn) => fn())
    }
  }, [inView, direction, stagger, duration, blurAmount, offset, onComplete])

  useEffect(() => {
    spanRefs.current.forEach((el) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.filter = `blur(${blurAmount}px)`
      el.style.transform = ''
    })
  }, [direction, blurAmount])

  return (
    <p ref={containerRef} className={className} style={{ display: 'inline', lineHeight: 'inherit', flexWrap: 'wrap', alignItems: 'baseline', ...style,}}>
      {segments.map((seg, i) => {
        const isSpace = animateBy === 'chars' && seg === ' '
        const displaySeg =
          animateBy === 'words'
            ? seg + (i < segments.length - 1 ? '\u00A0' : '')
            : isSpace
            ? '\u00A0'
            : seg

        return (
          <span key={`${seg}-${i}`} ref={(el) => (spanRefs.current[i] = el)} style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform, filter, opacity' }}>
            {displaySeg}
          </span>
        )
      })}
    </p>
  )
}

export default FadeWords;