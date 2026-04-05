import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu, IconX, IconArrowRight } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/culture', label: 'Culture' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggle = () => {
    setMobileOpen(p => {
      document.body.style.overflow = p ? '' : 'hidden'
      return !p
    })
  }

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', padding: '0 28px',
          background: scrolled ? 'rgba(253,250,246,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(228,221,211,0.8)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          willChange: 'background',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary)', letterSpacing: '-0.02em' }}>
              EatEpic
            </span>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--primary)', background: 'rgba(232,101,10,0.1)', padding: '2px 7px', borderRadius: 100, textTransform: 'uppercase' }}>
              Pre-Launch
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
            {links.map(link => {
              const active = location.pathname === link.to
              return (
                <Link key={link.to} to={link.to} style={{
                  position: 'relative', fontSize: '0.88rem', fontWeight: active ? 600 : 500,
                  color: active ? 'var(--primary)' : 'var(--text-muted)',
                  transition: 'color 0.2s',
                }}>
                  {link.label}
                  {active && (
                    <motion.span layoutId="nav-pill" style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 2, background: 'var(--primary)', borderRadius: 2,
                    }} transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.div className="nav-desktop" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#waitlist-section"
                className="btn btn-primary btn-sm"
                onClick={e => {
                  e.preventDefault()
                  setMobileOpen(false)
                  if (location.pathname === '/') {
                    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    navigate('/')
                    setTimeout(() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }), 300)
                  }
                }}
              >
                Join Waitlist
              </a>
            </motion.div>
            <button onClick={toggle} aria-label="Menu" className="nav-mobile-only" style={{
              background: 'none', border: '1.5px solid var(--border)', padding: '8px 10px', cursor: 'pointer',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)',
            }}>
              <div style={{ width: 20, height: 20 }}>
                {mobileOpen ? <IconX /> : <IconMenu />}
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 999,
              background: 'rgba(253,250,246,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 28px 28px',
            }}
          >
            {links.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={link.to} style={{
                  display: 'block', padding: '12px 14px', borderRadius: 8, fontWeight: 500, fontSize: '0.95rem',
                  color: location.pathname === link.to ? 'var(--primary)' : 'var(--text)',
                  background: location.pathname === link.to ? 'rgba(232,101,10,0.07)' : 'transparent',
                  marginBottom: 2,
                }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} style={{ marginTop: 16 }}>
              <a
                href="#waitlist-section"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={e => {
                  e.preventDefault()
                  setMobileOpen(false)
                  document.body.style.overflow = ''
                  if (location.pathname === '/') {
                    setTimeout(() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }), 200)
                  } else {
                    navigate('/')
                    setTimeout(() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }), 350)
                  }
                }}
              >
                Join Waitlist <IconArrowRight />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .nav-mobile-only { display: none !important; } }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}
