import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu, IconX, IconArrowRight } from './Icons'

/* ── Nav link definitions ───────────────────────────────────── */
const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/culture', label: 'Culture' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog',    label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

/* ── Breakpoint: hamburger below this width ─────────────────── */
const MOBILE_BP = 820   // slightly wider than 768 — gives breathing room

/* ── Inline CSS injected once for nav show/hide ─────────────── */
/* Using CSS (not JS state) prevents the 1-frame flash on initial render */
const NAV_STYLE = `
  /* Desktop: show links + CTA, hide hamburger */
  @media (min-width: ${MOBILE_BP + 1}px) {
    .eatepic-nav-links       { display: flex !important; }
    .eatepic-nav-cta         { display: flex !important; }
    .eatepic-nav-hamburger   { display: none !important; }
  }
  /* Mobile: hide links + CTA, show hamburger */
  @media (max-width: ${MOBILE_BP}px) {
    .eatepic-nav-links       { display: none !important; }
    .eatepic-nav-cta         { display: none !important; }
    .eatepic-nav-hamburger   { display: flex !important; }
  }
`

/* ── Helper: scroll to waitlist (cross-page aware) ──────────── */
function goToWaitlist(navigate, pathname, onDone) {
  onDone?.()
  if (pathname === '/') {
    setTimeout(
      () => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }),
      60
    )
  } else {
    navigate('/')
    setTimeout(
      () => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }),
      380
    )
  }
}

/* ═══════════════════════════════════════════════════════════════
   Navbar component
═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  /* ── Scroll detection — run immediately so nav bg is correct ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()   // ← call once right away
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close menu on route change ── */
  useEffect(() => { closeMenu() }, [location.pathname]) // eslint-disable-line

  /* ── ESC key to close ── */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, []) // eslint-disable-line

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const toggleMenu = useCallback(() => {
    menuOpen ? closeMenu() : openMenu()
  }, [menuOpen, closeMenu, openMenu])

  /* ── Determine if page needs a dark-aware nav ── */
  /* Pages other than Home may have dark hero sections */
  const isHome = location.pathname === '/'

  return (
    <>
      {/* ── Inject CSS breakpoints (once, in <head> via React) ── */}
      <style>{NAV_STYLE}</style>

      {/* ════════════════════ NAV BAR ════════════════════════════ */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'var(--nav-h)',
          display: 'flex',
          alignItems: 'center',
          /* Always show a solid background (avoids unreadable text on dark pages) */
          background: scrolled || !isHome
            ? 'rgba(253,250,246,0.97)'
            : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          borderBottom: scrolled || !isHome
            ? '1px solid rgba(228,221,211,0.9)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Inner row — max-width constrained */}
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 32px)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          minWidth: 0,
        }}>

          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            to="/"
            aria-label="EatEpic — Home"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              flexShrink: 0, minWidth: 0,
            }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(232,101,10,0.28)',
              flexShrink: 0,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
              fontWeight: 800, color: 'var(--secondary)',
              letterSpacing: '-0.02em', lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              EatEpic
            </span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--primary)', background: 'rgba(232,101,10,0.1)',
              padding: '2px 7px', borderRadius: 100, textTransform: 'uppercase',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>
              Pre-Launch
            </span>
          </Link>

          {/* ── Desktop nav links (hidden ≤820px via injected CSS) ── */}
          <nav
            className="eatepic-nav-links"
            style={{ alignItems: 'center', gap: 28 }}
          >
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    position: 'relative',
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--primary)' : 'var(--text-muted)',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: -3,
                        left: 0, right: 0,
                        height: 2, background: 'var(--primary)', borderRadius: 2,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Right side controls ─────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

            {/* Desktop CTA (hidden ≤820px via injected CSS) */}
            <div className="eatepic-nav-cta">
              <a
                id="nav-cta"
                href="#waitlist-section"
                className="btn btn-primary btn-sm"
                onClick={e => {
                  e.preventDefault()
                  goToWaitlist(navigate, location.pathname)
                }}
                style={{ whiteSpace: 'nowrap' }}
              >
                Join Waitlist
              </a>
            </div>

            {/* Hamburger (hidden >820px via injected CSS) */}
            <button
              id="nav-hamburger"
              className="eatepic-nav-hamburger"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              style={{
                background: 'none',
                border: '1.5px solid var(--border)',
                borderRadius: 8,
                padding: 0,
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary)',
                transition: 'border-color 0.2s, background 0.2s',
                /* Minimum 44×44 accessible touch target */
                minWidth: 44, minHeight: 44,
                width: 44, height: 44,
              }}
            >
              <div style={{
                width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {menuOpen ? <IconX /> : <IconMenu />}
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════ MOBILE MENU OVERLAY ═════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(26,26,46,0.45)',
                zIndex: 998,
              }}
            />

            {/* Menu panel */}
            <motion.div
              key="nav-panel"
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 'var(--nav-h)',
                left: 0, right: 0,
                /* Full height below nav — allows scrolling if needed */
                bottom: 0,
                zIndex: 999,
                background: 'rgba(253,250,246,0.99)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(20px, 4vw, 28px)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Nav links section */}
              <div style={{ flex: 1 }}>
                {NAV_LINKS.map((link, i) => {
                  const active = location.pathname === link.to
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.045 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '15px 16px',
                          marginBottom: 4,
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1.05rem',
                          fontWeight: active ? 600 : 500,
                          color: active ? 'var(--primary)' : 'var(--text)',
                          background: active ? 'rgba(232,101,10,0.08)' : 'transparent',
                          border: active
                            ? '1px solid rgba(232,101,10,0.16)'
                            : '1px solid transparent',
                          transition: 'background 0.15s',
                        }}
                      >
                        <span>{link.label}</span>
                        {active && (
                          <span style={{
                            width: 16, height: 16,
                            color: 'var(--primary)', flexShrink: 0,
                            display: 'flex', alignItems: 'center',
                          }}>
                            <IconArrowRight />
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Separator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                style={{
                  height: 1, background: 'var(--border)',
                  margin: '20px 0 22px',
                  flexShrink: 0,
                }}
              />

              {/* Bottom CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  gap: 10, flexShrink: 0,
                }}
              >
                <a
                  href="#waitlist-section"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
                  onClick={e => {
                    e.preventDefault()
                    goToWaitlist(navigate, location.pathname, closeMenu)
                  }}
                >
                  Join Waitlist — It's Free&nbsp;
                  <span style={{ display: 'inline-flex', width: 16, height: 16, flexShrink: 0 }}>
                    <IconArrowRight />
                  </span>
                </a>

                {/* Trust micro-copy */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap',
                  gap: 8, justifyContent: 'center', marginTop: 4,
                }}>
                  {['Free to join', 'Cancel anytime', 'No app needed yet'].map(chip => (
                    <span key={chip} style={{
                      fontSize: '0.76rem', color: 'var(--text-muted)',
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--border)',
                      padding: '4px 12px', borderRadius: 100,
                    }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
