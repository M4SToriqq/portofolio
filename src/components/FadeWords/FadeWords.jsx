'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

// Easing: elastic overshoot — different curve from original spring
const elasticOut = (t) =>
  t === 0 ? 0 : t === 1 ? 1
    : Math.pow(2, -9 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1

const mix = (a, b, t) => a * (1 - t) + b * t

function runSegmentAnim(node, { dir, offset, peakBlur, ms, delay }) {
  let frameId = null
  let timeoutId = null

  const startX = dir === 'left' ? -offset * 2.2 : dir === 'right' ? offset * 2.2 : 0
  const startY = dir === 'top'  ? -offset       : dir === 'bottom' ? offset       : 0

  // Set hidden initial state immediately
  node.style.opacity   = '0'
  node.style.filter    = `blur(${peakBlur}px)`
  node.style.transform = `translate(${startX}px, ${startY}px) scale(0.91)`

  timeoutId = setTimeout(() => {
    let origin = null

    const tick = (now) => {
      if (!origin) origin = now
      const raw   = Math.min((now - origin) / ms, 1)
      const tMove = elasticOut(raw)
      // Blur clears faster than movement — visible difference from original
      const tFade = raw < 0.45 ? raw / 0.45 : 1

      node.style.opacity   = Math.min(raw / 0.30, 1).toFixed(3)
      node.style.filter    = `blur(${Math.max(0, mix(peakBlur, 0, tFade)).toFixed(2)}px)`
      node.style.transform = [
        `translate(${mix(startX, 0, tMove).toFixed(2)}px,`,
        `${mix(startY, 0, tMove).toFixed(2)}px)`,
        `scale(${mix(0.91, 1, tMove).toFixed(4)})`,
      ].join(' ')

      if (raw < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
  }, delay)

  return () => {
    clearTimeout(timeoutId)
    if (frameId) cancelAnimationFrame(frameId)
  }
}

const FadeWords = ({
  text       = '',
  className  = '',
  style      = {},
  splitBy    = 'words',      // 'words' | 'chars'
  direction  = 'bottom',
  staggerMs  = 75,
  duration   = 0.6,
  blur       = 12,
  shift      = 24,
  threshold  = 0.15,
  rootMargin = '0px',
  onDone,
}) => {
  const tokens = useMemo(
    () => (splitBy === 'words' ? text.split(' ') : text.split('')),
    [text, splitBy]
  )

  const [triggered, setTriggered] = useState(false)
  const rootRef    = useRef(null)
  const nodeRefs   = useRef([])
  const teardowns  = useRef([])

  const onVisible = useCallback(([entry], obs) => {
    if (entry.isIntersecting) {
      setTriggered(true)
      obs.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const io = new IntersectionObserver(onVisible, { threshold, rootMargin })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [threshold, rootMargin, onVisible])

  useEffect(() => {
    if (!triggered) return

    teardowns.current.forEach((fn) => fn())
    teardowns.current = []

    nodeRefs.current.forEach((node, idx) => {
      if (!node) return

      const delayMs = idx * staggerMs
      const isLast  = idx === nodeRefs.current.length - 1

      const stop = runSegmentAnim(node, {
        dir:      direction,
        offset:   shift,
        peakBlur: blur,
        ms:       duration * 1000,
        delay:    delayMs,
      })

      teardowns.current.push(stop)

      if (isLast && onDone) {
        const tid = setTimeout(onDone, delayMs + duration * 1000)
        teardowns.current.push(() => clearTimeout(tid))
      }
    })

    return () => { teardowns.current.forEach((fn) => fn()) }
  }, [triggered, direction, staggerMs, duration, blur, shift, onDone])

  // Reset nodes when key props change
  useEffect(() => {
    nodeRefs.current.forEach((node) => {
      if (!node) return
      node.style.opacity   = '0'
      node.style.filter    = `blur(${blur}px)`
      node.style.transform = ''
    })
  }, [direction, blur])

  return (
    <p
      ref={rootRef}
      className={className}
      style={{
        display:    'inline',
        lineHeight: 'inherit',
        flexWrap:   'wrap',
        alignItems: 'baseline',
        ...style,
      }}
    >
      {tokens.map((tok, i) => {
        const isSpace   = splitBy === 'chars' && tok === ' '
        const displayed =
          splitBy === 'words'
            ? tok + (i < tokens.length - 1 ? '\u00A0' : '')
            : isSpace
            ? '\u00A0'
            : tok

        return (
          <span
            key={`${tok}-${i}`}
            ref={(el) => (nodeRefs.current[i] = el)}
            style={{
              display:    'inline-block',
              whiteSpace: 'pre',
              willChange: 'transform, filter, opacity',
            }}
          >
            {displayed}
          </span>
        )
      })}
    </p>
  )
}

export default FadeWords