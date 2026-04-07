/**
 * Animations.jsx — Performance-optimised animation components
 *
 * Key principles:
 * 1. Only animate `opacity` and `transform` — GPU-composited, zero layout cost.
 * 2. Keep y-offsets small (≤ 20px). Large offsets mean more pixels to repaint.
 * 3. Use `once: true` so IntersectionObserver is disconnected after triggering.
 * 4. CountUp uses requestAnimationFrame instead of setInterval — stays in sync
 *    with the browser's render loop and never drops frames.
 * 5. PageTransition keeps y-delta tiny (8px) so route changes feel instant.
 */
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ── Shared easing curve ─────────────────────────────────────── */
/* expo-out: fast initial movement, smooth settle — feels 60fps even at 30fps */
const EASE = [0.16, 1, 0.3, 1]

/* ── FadeIn variant map ──────────────────────────────────────── */
/* Reduced offset 28 → 18px to lower repaint area */
const fadeVariants = {
  up:    { hidden: { opacity: 0, y: 18  }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -18 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 18  }, visible: { opacity: 1, x: 0 } },
}

export function FadeIn({
  children,
  delay     = 0,
  direction = 'up',
  className = '',
  style     = {},
}) {
  const ref    = useRef(null)
  /* margin: start animation 40px before element reaches viewport */
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const v      = fadeVariants[direction] || fadeVariants.up

  return (
    <motion.div
      ref={ref}
      variants={v}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── StaggerContainer ────────────────────────────────────────── */
/* Reduced staggerChildren 0.06 → 0.05 — cards pop faster */
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
}

const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
}

export function StaggerContainer({ children, style = {}, className = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, style = {}, className = '' }) {
  return (
    <motion.div variants={staggerItem} style={style} className={className}>
      {children}
    </motion.div>
  )
}

/* ── ScaleIn ─────────────────────────────────────────────────── */
export function ScaleIn({ children, delay = 0, style = {} }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={inView
        ? { opacity: 1, scale: 1 }
        : { opacity: 0, scale: 0.93 }
      }
      transition={{ duration: 0.4, delay, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── CountUp — RAF-based, 60fps-synced ───────────────────────── */
/*
  Previous implementation used setInterval(fn, 1000/60) which creates a
  timer that TRIES to fire at 60fps but is not frame-synced with the
  browser renderer. This causes jank when the scroll compositor is also
  running. Using requestAnimationFrame keeps everything in the same frame.
*/
export function CountUp({ end, suffix = '', prefix = '', duration = 1.6 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime = null
    let rafId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      /* ease-out cubic: fast start, slow finish */
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

/* ── PageTransition ──────────────────────────────────────────── */
/*
  Tiny y delta (8px) so route changes look instant, not sluggish.
  duration 0.35 → 0.25 for snappier page navigation.
*/
export function PageTransition({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{   opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
