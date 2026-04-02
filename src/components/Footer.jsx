import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconLinkedIn, IconTwitter, IconInstagram } from './Icons'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/culture', label: 'Culture' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Journal' },
]

const socials = [
  { Icon: IconInstagram, label: 'Instagram', href: 'https://www.instagram.com/' },
  { Icon: IconTwitter, label: 'Twitter', href: 'https://twitter.com/' },
  { Icon: IconLinkedIn, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" className="footer-brand-name">
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                </svg>
              </div>
              EatEpic
            </Link>
            <p className="footer-brand-tagline">
              Digitizing India's home tiffin economy. Connecting home cooks with food lovers — building in 2025.
            </p>
            <div className="footer-socials">
              {socials.map(({ Icon, label, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn"
                  whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                  <div style={{ width: 15, height: 15 }}><Icon /></div>
                </motion.a>
              ))}
            </div>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 8 }}>
              <motion.span
                style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%', display: 'block', flexShrink: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>Pre-Launch · Waitlist Open</span>
            </div>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            {navLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>

          {/* Platform */}
          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#waitlist-section" onClick={scrollToWaitlist}>Join Waitlist</a>
            <Link to="/contact" state={{ topic: 'Chef Partnership' }}>Register as Chef</Link>
            <Link to="/culture">How It Works</Link>
            <Link to="/careers">Join the Team</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:kaleavishkar500@gmail.com">kaleavishkar500@gmail.com</a>
            <a href="tel:+919356891389">+91 93568 91389</a>
            <a href="https://maps.google.com/?q=Mumbai+Maharashtra" target="_blank" rel="noopener noreferrer">Mumbai, Maharashtra</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)', gap: 16 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'flex', gap: 10, alignItems: 'center' }}>
            &copy; {new Date().getFullYear()} <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>EatEpic Technologies. All rights reserved.</Link>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem' }}>
            <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
