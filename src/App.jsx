import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Chatbot from './components/Chatbot'
import ToastProvider from './components/ToastProvider'
import Home from './pages/Home'
import Culture from './pages/Culture'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Admin from './pages/Admin'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      /*
        Performance-tuned Lenis settings:
        - duration 0.7 (was 0.9) — snappier, feels more responsive
        - easing: expo-out curve gives fast initial response then smooth settle
        - smoothWheel: true — smooth mouse wheel
        - smoothTouch: false — native touch scroll is already smooth on modern
          phones and feels more natural; lenis touch can add latency
        - lerp: 0.1 — interpolation factor (lower = smoother but laggy,
          higher = snappier; 0.1 is the sweet spot for 60fps feel)
      */
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 4),   // expo-out: fast then settle
      smoothWheel: true,
      smoothTouch: false,                         // let browser handle touch
      touchMultiplier: 1,
      infinite: false,
      lerp: 0.1,
    })

    /*
      Use a single rAF loop — don't create nested requestAnimationFrame calls.
      This keeps the loop on the same frame budget as the browser compositor.
    */
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <HashRouter>
      <ToastProvider>
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog"    element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal type="privacy" />} />
            <Route path="/terms"   element={<Legal type="terms" />} />
            <Route path="/admin"   element={<Admin />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <Chatbot />
        <BackToTop />
      </ToastProvider>
    </HashRouter>
  )
}
