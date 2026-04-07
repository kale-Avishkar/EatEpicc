import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '../components/Animations'
import { useToast } from '../components/ToastProvider'
import { IconMail, IconPhone, IconMapPin, IconClock, IconArrowRight, IconSend, IconLinkedIn, IconTwitter, IconInstagram } from '../components/Icons'
import { submitToGoogleSheet } from '../utils/googleSheets'

const contactInfo = [
  { Icon: IconMail, label: 'Email', value: 'kaleavishkar500@gmail.com', href: 'mailto:kaleavishkar500@gmail.com' },
  { Icon: IconPhone, label: 'Phone', value: '+91 93568 91389', href: 'tel:+919356891389' },
  { Icon: IconMapPin, label: 'Location', value: 'Mumbai, Maharashtra', href: null },
  { Icon: IconClock, label: 'Hours', value: 'Monday – Saturday, 9am – 7pm IST', href: null },
]

const contactTypes = [
  { label: 'Customer Support', Icon: IconMail, email: 'help@eatepic.in', desc: 'Questions about subscription, delivery, or meals.' },
  { label: 'Chef Partnership', Icon: IconArrowRight, email: 'chefs@eatepic.in', desc: 'Register as a chef partner or get onboarding support.' },
  { label: 'Investor & Press', Icon: IconSend, email: 'press@eatepic.in', desc: 'Investor inquiries, press kits, and media pitches.' },
]

const socials = [
  {
    Icon: IconInstagram, label: 'Instagram', handle: '@eatepic.in', href: '#',
    /* Instagram gradient */
    iconBg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    iconColor: '#fff',
  },
  {
    Icon: IconTwitter, label: 'Twitter', handle: '@eatepic', href: '#',
    /* X / Twitter black */
    iconBg: '#000000',
    iconColor: '#ffffff',
  },
  {
    Icon: IconLinkedIn, label: 'LinkedIn', handle: 'EatEpic', href: '#',
    /* LinkedIn blue */
    iconBg: '#0A66C2',
    iconColor: '#ffffff',
  },
]

const topics = [
  'General Enquiry',
  'Customer Support',
  'Chef Partnership',
  'Investor Relations',
  'Media & Press',
  'Corporate Meal Solutions',
]

export default function Contact() {
  const toast = useToast()
  const location = useLocation()
  const defaultTopic = location.state?.topic || ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const phone = e.target[2].value
    const subject = e.target[3].value
    const message = e.target[4].value
    
    await submitToGoogleSheet({ type: 'Contact', name, email, phone, subject, message })
    
    toast('Message received. We will respond within 24 hours on business days.')
    e.target.reset()
  }

  return (
    <PageTransition>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(150deg, var(--secondary) 0%, #252540 60%, #1a1a2e 100%)',
        paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 88,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 500px at 65% 50%, rgba(232,101,10,0.14) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ background: 'rgba(255,255,255,0.25)' }} />
              Get in Touch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.75 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--white)', marginTop: 20, letterSpacing: '-0.025em', lineHeight: 1.08 }}
          >
            Let's Start a<br /><span style={{ color: 'var(--accent)' }}>Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', maxWidth: 520, marginTop: 18, lineHeight: 1.8 }}
          >
            Whether you're a potential customer, a home chef ready to partner, an investor who sees the opportunity, or a journalist covering the space — we're happy to talk.
          </motion.p>
          {/* Quick contact chips */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {[
              { Icon: IconMail, text: 'kaleavishkar500@gmail.com', href: 'mailto:kaleavishkar500@gmail.com' },
              { Icon: IconPhone, text: '+91 93568 91389', href: 'tel:+919356891389' },
            ].map(c => (
              <a key={c.text} href={c.href}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, color: 'rgba(255,255,255,0.75)', fontSize: '0.87rem', fontWeight: 500 }}>
                <div style={{ width: 14, height: 14 }}><c.Icon /></div>
                {c.text}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FORM + INFO ───────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="two-col-grid" style={{ alignItems: 'flex-start' }}>
            {/* Form */}
            <FadeIn direction="left">
              <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-flex' }}>Send a Message</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 8, marginTop: 14 }}>We Read Every Message</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.92rem' }}>Average response time: under 4 hours on business days.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flexWrap: 'wrap' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" className="form-control" placeholder="Priya Sharma" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" className="form-control" placeholder="priya@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone (Optional)</label>
                  <input type="tel" className="form-control" placeholder="+91 93568 91389" />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select className="form-control" required defaultValue={defaultTopic}>
                    <option value="" disabled>Select a topic</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea className="form-control" placeholder="Tell us what's on your mind. The more detail, the better we can help." required />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message <IconSend />
                </button>
              </form>
            </FadeIn>

            {/* Info Column */}
            <FadeIn direction="right">
              <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-flex' }}>Contact Details</span>
              <h2 style={{ fontSize: '1.7rem', marginBottom: 8, marginTop: 14 }}>Find Us</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.92rem' }}>Our team is remote-first, with our founding base in Mumbai.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <motion.div key={label}
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 18, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-light)' }}
                    whileHover={{ borderColor: 'var(--primary)', x: 3 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(232,101,10,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, color: 'var(--primary)' }}><Icon /></div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem', wordBreak: 'break-all' }}>{value}</a>
                      ) : (
                        <span style={{ color: 'var(--secondary)', fontWeight: 500, fontSize: '0.9rem' }}>{value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Embedded Mumbai Map */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                style={{ height: 260, borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              >
                <iframe
                  title="EatEpic Headquarters - Mumbai"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Mumbai,+Maharashtra&t=&z=12&ie=UTF8&iwloc=&output=embed"
                />
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CONTACT TYPE CARDS ─────────────────────────── */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Reach the Right Team</span>
              <h2 style={{ marginTop: 14 }}>Who Should You Contact?</h2>
              <div className="divider center" />
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 22 }}>
            {contactTypes.map(({ label, Icon, email, desc }) => (
              <StaggerItem key={label}>
                <motion.div className="card" style={{ textAlign: 'center' }}
                  whileHover={{ y: -6, borderColor: 'var(--primary)', boxShadow: 'var(--shadow-md)' }}>
                  <div className="icon-box icon-box-orange" style={{ margin: '0 auto 18px' }}>
                    <div style={{ color: 'var(--primary)' }}><Icon /></div>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{label}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 18, fontSize: '0.87rem', lineHeight: 1.65 }}>{desc}</p>
                  <motion.a href={`mailto:${email}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', padding: '8px 18px', background: 'rgba(232,101,10,0.08)', borderRadius: 100, border: '1px solid rgba(232,101,10,0.2)' }}
                    whileHover={{ background: 'rgba(232,101,10,0.15)' }}>
                    {email}
                  </motion.a>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SOCIAL STRIP ───────────────────────────────── */}
      <section style={{ padding: '56px 0', background: 'var(--secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: 10 }}>Follow the Build</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontSize: '0.92rem' }}>Daily updates from the founding team on building in public.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              {socials.map(({ Icon, label, handle, href, iconBg, iconColor }) => (
                <motion.a key={label} href={href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14, color: 'var(--white)',
                    textDecoration: 'none',
                  }}
                  whileHover={{ y: -4, background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.22)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Coloured brand icon box */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
                  }}>
                    <div style={{ width: 18, height: 18, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon />
                    </div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>{label}</div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
