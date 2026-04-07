import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* Responsive hook — drives inline-style grids that CSS can't reach */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  )
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= breakpoint)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [breakpoint])
  return isMobile
}
import { FadeIn, StaggerContainer, StaggerItem, PageTransition, CountUp } from '../components/Animations'
import { useToast } from '../components/ToastProvider'
import { submitToGoogleSheet } from '../utils/googleSheets'
import {
  IconArrowRight, IconCheck, IconZap, IconShield, IconHeart,
  IconUsers, IconTrendingUp, IconBarChart, IconBox, IconCreditCard,
  IconTag, IconMonitor, IconGlobe, IconStar
} from '../components/Icons'

/* Market data — honest pre-launch numbers */
const marketStats = [
  { value: '72%', label: 'Urban professionals miss home-cooked food daily', note: 'Our research' },
  { value: '40M+', label: 'Home cooks in India with no digital income tools', note: 'Market data' },
  { value: '₹12K Cr', label: 'Unorganized tiffin market size — underserved', note: 'Industry estimate' },
  { value: 'Q3 2026', label: 'Target launch quarter — building fast', note: 'Our roadmap' },
]

const steps = [
  {
    num: '01',
    title: 'Browse & Subscribe',
    desc: 'Discover verified home chefs near you. Filter by cuisine, diet, and schedule. Subscribe to weekly or monthly tiffin plans.',
    color: 'var(--primary)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    detail: 'Pick from 200+ menu options · Set dietary filters · Choose delivery frequency',
  },
  {
    num: '02',
    title: 'Chef Cooks Fresh',
    desc: 'Your chef batch-prepares fresh every morning. No frozen food, no preservatives, no shortcuts. Just honest home cooking.',
    color: '#6366f1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    detail: 'Morning-fresh meals · Verified home kitchen · No cold chain shortcuts',
  },
  {
    num: '03',
    title: 'Delivered to You',
    desc: 'Trained delivery partners bring your tiffin hot and on time. Real-time tracking from kitchen door to yours.',
    color: '#10b981',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    detail: 'Live GPS tracking · Hot tiffin guaranteed · On-time or we make it right',
  },
]

const faqData = [
  {
    q: 'What is EatEpic?',
    a: 'EatEpic is a platform that connects working professionals with verified home chefs in their neighbourhood. We digitize India\'s ₹12,000 crore home-tiffin economy — so you eat genuine home food every day, and home cooks earn a real income.',
  },
  {
    q: 'When will EatEpic launch?',
    a: 'We are currently pre-launch and building. Our target MVP goes live in Q3 2026, starting in Pune, Bangalore, and Hyderabad. Join the waitlist and you will be the first to know — and get founding-member perks.',
  },
  {
    q: 'How do I subscribe to a tiffin plan?',
    a: 'Once we launch, you open the EatEpic app, browse chefs near you, choose a plan (daily, weekly, or monthly), set your dietary preferences, and pay. The chef handles everything else — you just enjoy your meal.',
  },
  {
    q: 'Can I pause or cancel my subscription?',
    a: 'Absolutely. EatEpic is built around flexibility. You can pause, skip a day, or cancel at any time from the app — no phone calls, no penalties. We respect your schedule.',
  },
  {
    q: 'How are home chefs verified?',
    a: 'Every home kitchen on EatEpic goes through our three-step verification: FSSAI registration check, in-person kitchen hygiene audit, and a 30-day trial period with monitored customer ratings before full onboarding.',
  },
  {
    q: 'I am a home cook. How do I join as a Chef Partner?',
    a: 'We are currently onboarding our founding chef cohort. Click \'Register as Chef Partner\' anywhere on this page. You will get 0% commission for the first 6 months, a digital storefront, and weekly payouts.',
  },
  {
    q: 'Is EatEpic available in my city?',
    a: 'We are launching first in Pune, Bangalore, and Hyderabad. More cities follow every quarter. Enter your email in the waitlist — we\'ll notify you the moment we go live in your city.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'We will support UPI, all major debit/credit cards, net banking, and wallet payments at launch. Subscriptions can be prepaid monthly or pay-per-delivery depending on the plan.',
  },
]

const customerFeatures = [
  { Icon: IconHeart, title: 'Home-Style Nutrition', desc: 'Zero preservatives, zero artificial colors. Balanced, wholesome meals made exactly like they are at home.' },
  { Icon: IconGlobe, title: 'Flexible Subscriptions', desc: 'Daily, weekly, or monthly. Pause, skip, or cancel without calls or penalties — complete control in the app.' },
  { Icon: IconZap, title: 'Real-Time Tracking', desc: 'Follow your tiffin from kitchen to doorstep. Live status updates and accurate ETA, always.' },
  { Icon: IconStar, title: 'Fully Customizable', desc: 'Set your spice level, dietary requirements, and allergen filters. Your tiffin, your way, every day.' },
]

const chefFeatures = [
  { Icon: IconMonitor, title: 'Digital Storefront', desc: 'A dedicated profile page, menu editor, and customer review system — your kitchen goes online.' },
  { Icon: IconBox, title: 'Smart Order Tools', desc: 'Batch planning dashboard shows exactly how many to prepare each day. Zero guesswork, zero waste.' },
  { Icon: IconCreditCard, title: 'Weekly Payouts', desc: 'Earnings land in your bank every week. Full transparency on income, deductions, and invoices.' },
  { Icon: IconTag, title: 'Brand Building', desc: 'Custom packaging inserts, profile SEO, and branded stickers. We help your kitchen become a recognized brand.' },
]

const visionPoints = [
  { Icon: IconTrendingUp, title: 'The Problem', desc: 'Working professionals across India survive on unhealthy delivery food because home cooking isn\'t yet accessible at model. We\'re changing that.', accent: 'var(--primary)' },
  { Icon: IconUsers, title: 'The Opportunity', desc: 'Millions of extraordinary home cooks — mostly women — run informal tiffin services with zero technology. They deserve infrastructure.', accent: '#6366f1' },
  { Icon: IconBarChart, title: 'The Plan', desc: 'EatEpic is the technology layer: subscriptions, logistics, payments, and discovery — purpose-built for the home kitchen economy.', accent: '#10b981' },
]

const chefPromises = [
  { val: '0%', label: 'Commission at launch', sub: 'First 6 months free' },
  { val: '48h', label: 'Onboarding time', sub: 'From signup to live' },
  { val: '100%', label: 'Chef-owned menus', sub: 'You set the prices' },
]

const foundingPerks = [
  '3 months free subscription when we launch',
  'Founding Member recognition on your profile',
  'Direct access to co-founders for feedback',
  'Lowest pricing tier — locked for life',
]

export default function Home() {
  const heroRef = useRef(null)
  const isMobile = useIsMobile()
  const toast = useToast()

  return (
    <PageTransition>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-h)',
        background: 'var(--bg)',
      }}>
        {/* Static gradient BG layer — replaced JS parallax with CSS for performance */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 900px 700px at 60% 40%, rgba(232,101,10,0.06) 0%, transparent 70%), radial-gradient(ellipse 600px 500px at 20% 80%, rgba(245,200,66,0.05) 0%, transparent 60%)',
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(228,221,211,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(228,221,211,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />

        <motion.div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Status pill */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: '1px solid var(--border)', borderRadius: 100, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
              <motion.span style={{ width: 7, height: 7, background: '#34d399', borderRadius: '50%', display: 'block' }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                Pre-Launch · Building India's Home Kitchen Network
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.6rem)', marginTop: 28, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--secondary)' }}
          >
            Real Home Cooking.
            <br />
            <span style={{ color: 'var(--primary)', position: 'relative', display: 'inline-block' }}>
              Delivered to Your Door.
              {/* Animated underline */}
              <svg style={{ position: 'absolute', bottom: -6, left: 0, right: 0, width: '100%', overflow: 'visible' }}
                viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <motion.path d="M 0 8 Q 200 0 400 8" stroke="var(--accent)" strokeWidth="3"
                  strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.9 }} />
              </svg>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', maxWidth: 560, margin: '28px auto', lineHeight: 1.75 }}
          >
            We're building a platform to digitize India's ₹12,000 crore home tiffin economy — making genuine home-cooked food accessible to every working professional, and turning home kitchens into real businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
                href="#waitlist"
                className="btn btn-primary btn-lg"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Join the Waitlist <IconArrowRight />
              </a>
            <button
                onClick={() => toast('Chef Partner onboarding begins next month. Please join the waitlist to get notified.')}
                className="btn btn-outline btn-lg"
              >
                Register as Chef Partner
              </button>
          </motion.div>

          {/* Trust chips — honest, non-fake */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}
          >
            {[
              { Icon: IconShield, text: 'Founding Member Perks' },
              { Icon: IconCheck, text: 'Zero Commission at Launch' },
              { Icon: IconHeart, text: 'No Preservatives Commitment' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.83rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border)' }}>
                <div style={{ width: 14, height: 14, color: 'var(--primary)' }}><Icon /></div>
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <div style={{ width: 26, height: 42, border: '1.5px solid rgba(26,26,46,0.2)', borderRadius: 14, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}
              style={{ width: 3, height: 7, background: 'var(--primary)', borderRadius: 2 }} />
          </div>
        </motion.div>
      </section>

      {/* ─── MARKET OPPORTUNITY BAR ───────────────────── */}
      <div className="stats-bar">
        <div className="container">
          <StaggerContainer className="stats-grid">
            {marketStats.map((s, i) => (
              <StaggerItem key={s.label}>
                <div className="stat-item" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '4px 28px' }}>
                  <div className="stat-prefix">{s.note}</div>
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn>
            <p style={{ textAlign: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em' }}>
              These are market signals — not our current metrics. We are pre-launch.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ─── HOW IT WORKS ──────────────────────────────── */}
      <section id="how-it-works" className="section" style={{ background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}>
        {/* Subtle background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,101,10,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">How It Works</span>
              <h2>Simple Steps to Your Home Meal</h2>
              <div className="divider center" />
              <p>From discovering your perfect home chef to hot food at your doorstep — in three effortless steps.</p>
            </div>
          </FadeIn>

          {/* Step cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 0, position: 'relative', maxWidth: isMobile ? 480 : 'none', margin: isMobile ? '0 auto' : undefined }}>
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15}>
                <div style={{ position: 'relative', padding: isMobile ? '0' : '0 20px', textAlign: 'center' }}>
                  {/* Connector arrow between steps — hidden on mobile */}
                  {i < steps.length - 1 && !isMobile && (
                    <div style={{
                      position: 'absolute', top: 40, right: -4, zIndex: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                        <path d="M0 8 H20 M14 2 L22 8 L14 14" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  <motion.div
                    className="card"
                    style={{ textAlign: 'center', position: 'relative', zIndex: 1, height: '100%', padding: '36px 24px' }}
                    whileHover={{ y: -10, boxShadow: `0 24px 56px ${step.color}18` }}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Step badge */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 100,
                      background: `${step.color}15`,
                      marginBottom: 20,
                      fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em',
                      color: step.color, textTransform: 'uppercase',
                    }}>
                      STEP {step.num}
                    </div>

                    {/* Icon circle */}
                    <motion.div
                      style={{
                        width: 80, height: 80,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                        border: `2px solid ${step.color}25`,
                        margin: '0 auto 24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: step.color,
                        boxShadow: `0 8px 24px ${step.color}18`,
                      }}
                      whileHover={{ scale: 1.08, rotate: 5 }}
                    >
                      {step.icon}
                    </motion.div>

                    <h3 style={{ fontSize: '1.15rem', marginBottom: 12, color: 'var(--secondary)' }}>{step.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 20 }}>{step.desc}</p>

                    {/* Detail pills */}
                    <div style={{
                      fontSize: '0.75rem', color: step.color,
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}20`,
                      borderRadius: 8, padding: '10px 14px',
                      lineHeight: 1.7, textAlign: 'left',
                    }}>
                      {step.detail.split(' · ').map((d, di) => (
                        <div key={di} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: di < 2 ? 4 : 0 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: step.color, flexShrink: 0 }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom CTA nudge */}
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                Ready to experience real home cooking? Join thousands on our waitlist.
              </p>
              <motion.a
                href="#waitlist-section"
                className="btn btn-primary btn-lg"
                onClick={e => { e.preventDefault(); document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              >
                Join the Waitlist <IconArrowRight />
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOR CUSTOMERS ────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">For Food Lovers</span>
              <h2>Eat Like You're Home</h2>
              <div className="divider center" />
              <p>Everything we're designing to make your daily meal routine effortless, healthy, and genuinely satisfying.</p>
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
            {customerFeatures.map(({ Icon, title, desc }) => (
              <StaggerItem key={title}>
                <motion.div className="card" style={{ height: '100%' }}
                  whileHover={{ y: -7, boxShadow: '0 16px 48px rgba(0,0,0,0.09)', borderColor: 'var(--primary)' }}>
                  <div className="icon-box icon-box-orange" style={{ marginBottom: 18 }}>
                    <div style={{ color: 'var(--primary)' }}><Icon /></div>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── FOR HOME CHEFS ───────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="two-col-grid" style={{ alignItems: 'center' }}>
            <FadeIn direction="left">
              <span className="eyebrow">For Home Chefs</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)', marginTop: 18, lineHeight: 1.15 }}>
                Turn Your Kitchen Into a Business
              </h2>
              <div className="divider" style={{ marginTop: 18 }} />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 16, marginBottom: 28 }}>
                Millions of extraordinary home cooks — predominantly women — run thriving informal tiffin businesses with zero technology support. EatEpic gives them the infrastructure to scale, earn consistently, and build a brand.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <button onClick={() => toast('Chef Partner onboarding begins next month. Please join the waitlist to get notified.')} className="btn btn-primary">Register as Chef Partner</button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/culture" className="btn btn-outline">Our Mission</Link>
                </motion.div>
              </div>
              {/* Launch promises */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14, marginTop: 36 }}>
                {chefPromises.map(p => (
                  <div key={p.val} style={{ padding: '16px', background: 'var(--bg-alt)', borderRadius: 12, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)', letterSpacing: '-0.02em' }}>{p.val}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)', marginTop: 4 }}>{p.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{p.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                {chefFeatures.map(({ Icon, title, desc }, i) => (
                  <motion.div key={title} className="card" style={{ padding: 22 }}
                    whileHover={{ y: -5, borderColor: 'var(--primary)', boxShadow: '0 10px 36px rgba(232,101,10,0.1)' }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}>
                    <div className="icon-box icon-box-dark" style={{ marginBottom: 14 }}>
                      <div style={{ color: 'var(--secondary)' }}><Icon /></div>
                    </div>
                    <h4 style={{ fontSize: '0.93rem', marginBottom: 6, fontFamily: 'var(--font-heading)' }}>{title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── WHY WE'RE BUILDING THIS ──────────────────── */}
      <section className="section" style={{ background: 'var(--secondary)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 800px 600px at 30% 50%, rgba(232,101,10,0.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)' }} />
                Our Thesis
              </span>
              <h2 style={{ color: 'var(--white)', marginTop: 14 }}>The Problem. The Vision. The Plan.</h2>
              <div className="divider center" />
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '14px auto 0' }}>
                We're not here to compete with food delivery. We're building infrastructure for an economy that's been invisible for decades.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 200 : 300}px,1fr))`, gap: 24 }}>
            {visionPoints.map(({ Icon, title, desc, accent }) => (
              <StaggerItem key={title}>
                <motion.div
                  style={{ padding: 32, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ y: -6, background: 'rgba(255,255,255,0.07)', borderColor: `${accent}50` }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <div style={{ width: 24, height: 24, color: accent }}><Icon /></div>
                  </div>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: 12 }}>{title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.9rem' }}>{desc}</p>
                  <div style={{ marginTop: 20, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: 2 }} />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Founder quote — premium editorial block */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 72, maxWidth: 820, margin: '72px auto 0', position: 'relative' }}>
              {/* Decorative top line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12))' }} />
                <div style={{ display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: i === 1 ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }} />
                  ))}
                </div>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }} />
              </div>

              {/* Large typographic quote mark */}
              <div style={{ position: 'absolute', top: 40, left: -12, fontFamily: 'Georgia, serif', fontSize: '8rem', lineHeight: 1, color: 'var(--primary)', opacity: 0.2, fontWeight: 900, userSelect: 'none', pointerEvents: 'none' }}>"</div>

              <div style={{ padding: '0 48px', textAlign: 'center' }}>
                {/* The quote text */}
                <p style={{
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                  lineHeight: 1.9,
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  margin: 0,
                }}>
                  The best food in India is being made in people's homes right now — invisible, uncompensated, unscaled. A neighbor's kitchen produces meals that no restaurant can replicate. We are building the infrastructure to change that: so every home cook becomes a recognized entrepreneur, and every working professional has access to food that actually feels like home.
                </p>

                {/* Attribution row */}
                <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
                  {/* Monogram avatar */}
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 3px rgba(232,101,10,0.25)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.02em' }}>AK</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--white)', fontSize: '1rem', letterSpacing: '-0.01em' }}>
                      Avishkar N Kale
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Founder & CEO, EatEpic</span>
                      <span style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'inline-block' }} />
                      <span>Building since 2025</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom decorative line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40, justifyContent: 'center' }}>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <FAQSection />

      {/* ─── APP DOWNLOAD CTA ─────────────────────────────── */}
      <AppDownloadSection />

      {/* ─── FOUNDING MEMBER WAITLIST ──────────────────── */}
      <WaitlistSection toast={toast} />

      {/* ─── NEWSLETTER ───────────────────────────────── */}
      <NewsletterSection toast={toast} />
    </PageTransition>
  )
}

function WaitlistSection({ toast }) {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('eatepic_waitlist')
    return saved ? JSON.parse(saved).length : 0
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const existing = JSON.parse(localStorage.getItem('eatepic_waitlist') || '[]')
    if (!existing.includes(email)) {
      const updated = [...existing, email]
      localStorage.setItem('eatepic_waitlist', JSON.stringify(updated))
      setCount(updated.length)
    }

    await submitToGoogleSheet({ type: 'Waitlist', email })

    setSubmitted(true)
    toast('You are in. Founding member perks confirmed. We will reach out before anyone else.')
    setTimeout(() => setSubmitted(false), 5000)
    e.target.reset()
  }

  return (
    <section id="waitlist-section" style={{ padding: '96px 0', background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="two-col-grid" style={{ alignItems: 'center' }}>
          <FadeIn direction="left">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 100, marginBottom: 20 }}>
              <motion.span style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%', display: 'block' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', letterSpacing: '0.05em' }}>WAITLIST OPEN · {count} MEMBERS JOINED</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.8rem)', lineHeight: 1.15 }}>
              Be First.<br />
              <span style={{ color: 'var(--primary)' }}>Shape EatEpic</span> From Day Zero.
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.8, fontSize: '0.97rem' }}>
              We are pre-launch and building in public. Founding members get exclusive perks, help shape the product, and are the people who made EatEpic real.
            </p>
            <ul style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {foundingPerks.map(p => (
                <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                  <div style={{ width: 18, height: 18, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, color: 'white' }}><IconCheck /></div>
                  </div>
                  <span style={{ color: 'var(--text)' }}>{p}</span>
                </li>
              ))}
            </ul>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '20px 24px', background: 'rgba(52,211,153,0.1)', border: '1.5px solid rgba(52,211,153,0.35)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, background: '#34d399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, color: 'white' }}><IconCheck /></div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#065f46', fontSize: '0.95rem' }}>You are on the list!</div>
                  <div style={{ fontSize: '0.82rem', color: '#059669', marginTop: 3 }}>We will send you early access details before launch.</div>
                </div>
              </motion.div>
            ) : (
              <>
                <form onSubmit={handleSubmit} style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: 100, border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                  <input name="email" type="email" placeholder="your@email.com" required style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '0.93rem', background: 'transparent', color: 'var(--text)' }} />
                  <motion.button type="submit" className="btn btn-primary" style={{ borderRadius: '0 100px 100px 0', border: 'none', flexShrink: 0 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    Count Me In
                  </motion.button>
                </form>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: 10 }}>
                  No spam. No app yet. Honest updates from <strong>Avishkar N Kale</strong>, Founder, EatEpic.
                </p>
              </>
            )}
          </FadeIn>

          {/* Indian App Mockup */}
          <FadeIn direction="right">
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 240, borderRadius: 44,
                  background: '#F8F4EF',
                  boxShadow: '0 48px 96px rgba(26,26,46,0.28), 0 0 0 10px rgba(26,26,46,0.06)',
                  overflow: 'hidden', position: 'relative',
                }}
              >
                {/* Status bar */}
                <div style={{ background: '#1A1A2E', padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', fontWeight: 700 }}>9:41 AM</span>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <div style={{ width: 14, height: 7, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 2, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: '70%', background: '#34d399', borderRadius: 1 }} />
                    </div>
                  </div>
                </div>

                {/* App header — EatEpic branding */}
                <div style={{ background: 'linear-gradient(135deg, #E8650A 0%, #C4520A 100%)', padding: '16px 18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.06em' }}>DELIVERY TO</div>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        Koramangala, Bangalore
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                    <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.18)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>
                    </div>
                  </div>
                  {/* Search bar */}
                  <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <span style={{ fontSize: '0.65rem', color: '#B5ACA3' }}>Search dal chawal, sabzi, roti...</span>
                  </div>
                </div>

                {/* Category pills */}
                <div style={{ background: 'white', padding: '10px 14px', display: 'flex', gap: 6, overflowX: 'hidden' }}>
                  {[{ label: 'All', active: true }, { label: 'Veg', active: false }, { label: 'Non-Veg', active: false }, { label: 'Jain', active: false }].map(cat => (
                    <div key={cat.label} style={{ padding: '4px 10px', borderRadius: 100, background: cat.active ? '#E8650A' : '#F5EFE7', color: cat.active ? 'white' : '#6B6B6B', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>{cat.label}</div>
                  ))}
                </div>

                {/* Chef cards */}
                <div style={{ padding: '4px 14px 0' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>Top Chefs Near You</div>

                  {[
                    { name: "Sunita's Kitchen", badge: '4.9', cuisine: 'Rajasthani Thali', price: '₹120/meal', color: '#FFF3E8', accent: '#E8650A', tag: 'Bestseller' },
                    { name: "Meena's Homefood", badge: '4.8', cuisine: 'Maharashtrian', price: '₹100/meal', color: '#F0FFF4', accent: '#059669', tag: 'Pure Veg' },
                    { name: "Lalitha's Flavours", badge: '4.7', cuisine: 'South Indian', price: '₹110/meal', color: '#EFF6FF', accent: '#2563eb', tag: 'New' },
                  ].map((chef, i) => (
                    <motion.div key={chef.name}
                      style={{ background: chef.color, borderRadius: 10, padding: '10px 11px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${chef.accent}20` }}
                      animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, delay: i * 0.7, repeat: Infinity }}>
                      {/* Chef avatar */}
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${chef.accent}, ${chef.accent}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#1A1A2E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chef.name}</div>
                        <div style={{ fontSize: '0.56rem', color: '#6B6B6B', marginTop: 1 }}>{chef.cuisine}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                          <span style={{ background: chef.accent, color: 'white', fontSize: '0.5rem', fontWeight: 700, padding: '1px 5px', borderRadius: 4 }}>{chef.badge}</span>
                          <span style={{ fontSize: '0.5rem', color: chef.accent, fontWeight: 700, background: `${chef.accent}15`, padding: '1px 6px', borderRadius: 4 }}>{chef.tag}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: chef.accent, flexShrink: 0 }}>{chef.price}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA button */}
                <div style={{ padding: '8px 14px 10px' }}>
                  <motion.div style={{ width: '100%', height: 38, background: 'linear-gradient(135deg, #E8650A, #C4520A)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>Subscribe to a Tiffin Plan</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </motion.div>
                </div>

                {/* Bottom nav */}
                <div style={{ background: 'white', borderTop: '1px solid #EDE8E1', padding: '8px 0 12px', display: 'flex', justifyContent: 'space-around' }}>
                  {[
                    { label: 'Home', active: true, d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
                    { label: 'Chefs', active: false, d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
                    { label: 'Orders', active: false, d: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' },
                    { label: 'Profile', active: false, d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
                  ].map(nav => (
                    <div key={nav.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={nav.active ? '#E8650A' : '#9A9A9A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {nav.label === 'Home' && <><path d={nav.d} /><polyline points="9 22 9 12 15 12 15 22" /></>}
                        {nav.label !== 'Home' && <><path d={nav.d} /><circle cx="12" cy="7" r="4" /></>}
                      </svg>
                      <span style={{ fontSize: '0.48rem', color: nav.active ? '#E8650A' : '#9A9A9A', fontWeight: nav.active ? 700 : 500 }}>{nav.label}</span>
                      {nav.active && <div style={{ width: 4, height: 4, background: '#E8650A', borderRadius: '50%' }} />}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badges */}
              {[
                { line1: 'In Development', line2: 'Launching Q3 2026', top: '8%', right: -32 },
                { line1: 'Beta Access Soon', line2: 'Join waitlist', bottom: '20%', left: -32 },
              ].map(c => (
                <motion.div key={c.line1}
                  style={{ position: 'absolute', top: c.top, bottom: c.bottom, right: c.right, left: c.left, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap' }}
                  animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: c.top ? 0 : 1.8 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--secondary)' }}>{c.line1}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{c.line2}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function NewsletterSection({ toast }) {
  const [subCount, setSubCount] = useState(() => {
    const saved = localStorage.getItem('eatepic_newsletter')
    return saved ? JSON.parse(saved).length : 0
  })
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.nl_email.value.trim()
    const existing = JSON.parse(localStorage.getItem('eatepic_newsletter') || '[]')
    if (!existing.includes(email)) {
      const updated = [...existing, email]
      localStorage.setItem('eatepic_newsletter', JSON.stringify(updated))
      setSubCount(updated.length)
    }

    await submitToGoogleSheet({ type: 'Newsletter', email })

    setDone(true)
    toast('Subscribed. You will hear from Avishkar every Monday with honest founder updates.')
    setTimeout(() => setDone(false), 5000)
    e.target.reset()
  }

  return (
    <div className="newsletter-strip">
      <div className="container">
        <FadeIn>
          <h2>Follow the Build</h2>
          <p>Weekly founder updates, product previews, and early access news — every Monday.</p>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 16, padding: '14px 24px' }}>
              <div style={{ width: 28, height: 28, background: '#34d399', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 14, height: 14, color: 'white' }}><IconCheck /></div>
              </div>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>You are subscribed. See you Monday!</span>
            </motion.div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input name="nl_email" type="email" placeholder="your@email.com" required />
              <button type="submit" className="btn btn-white" style={{ flexShrink: 0 }}>Subscribe</button>
            </form>
          )}
          <p style={{ fontSize: '0.75rem', marginTop: 14, color: 'rgba(255,255,255,0.35)' }}>
            Written by <strong style={{ color: 'rgba(255,255,255,0.55)' }}>Avishkar N Kale</strong>, Founder, EatEpic. No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────────────────────── */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)
  const isMobile = useIsMobile()

  return (
    <section id="faq" className="section" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background */}
      <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,101,10,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div className="section-header">
            <span className="eyebrow">FAQ's</span>
            <h2>Frequently Asked Questions</h2>
            <div className="divider center" />
            <p>Everything you need to know about EatEpic — honest answers, no fluff.</p>
          </div>
        </FadeIn>

        {/* Two-column layout: FAQ left, illustration right */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'start' }}>
          {/* Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqData.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <motion.div
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${openIdx === i ? 'var(--primary)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: openIdx === i ? '0 8px 30px rgba(232,101,10,0.09)' : 'var(--shadow-xs)',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '18px 22px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    }}
                    id={`faq-btn-${i}`}
                    aria-expanded={openIdx === i}
                  >
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.97rem',
                      fontWeight: 700,
                      color: openIdx === i ? 'var(--primary)' : 'var(--secondary)',
                      lineHeight: 1.4,
                      transition: 'color 0.2s',
                    }}>
                      {item.q}
                    </span>

                    {/* Animated +/- icon */}
                    <motion.div
                      animate={{ rotate: openIdx === i ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{
                        width: 32, height: 32, flexShrink: 0,
                        border: `1.5px solid ${openIdx === i ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: openIdx === i ? 'var(--primary)' : 'transparent',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <line x1="6" y1="1" x2="6" y2="11" stroke={openIdx === i ? 'white' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="1" y1="6" x2="11" y2="6" stroke={openIdx === i ? 'white' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Answer panel */}
                  <AnimatePresence initial={false}>
                    {openIdx === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 22px 20px',
                          borderTop: '1px solid var(--border-light)',
                          paddingTop: 16,
                        }}>
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                            lineHeight: 1.8,
                            margin: 0,
                          }}>
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Right side: Contact/Still have questions card */}
          <FadeIn direction="right">
            <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
              {/* Stats summary card */}
              <motion.div
                className="card"
                style={{ padding: 36, marginBottom: 24, background: 'var(--secondary)', border: 'none' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    Quick Facts
                  </span>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.4rem', marginTop: 10, lineHeight: 1.2 }}>
                    Everything you need to get started
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { icon: '0%', label: 'Commission for first 6 months', sub: 'For joining chef partners' },
                    { icon: '3', label: 'Steps to your first meal', sub: 'Browse → Subscribe → Receive' },
                    { icon: '₹0', label: 'Cost to join waitlist', sub: 'Free, always' },
                  ].map((fact, fi) => (
                    <div key={fi} style={{
                      display: 'flex', gap: 16, alignItems: 'flex-start',
                      padding: '14px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(232,101,10,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem',
                        color: 'var(--primary)',
                      }}>
                        {fact.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.3 }}>{fact.label}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{fact.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Still have questions */}
              <motion.div
                className="card"
                style={{ padding: 28, textAlign: 'center' }}
                whileHover={{ y: -4, borderColor: 'var(--primary)' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'rgba(232,101,10,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Still have questions?</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
                  We read every message personally. Avishkar or a co-founder will reply within 24 hours.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Contact Us <IconArrowRight />
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   APP DOWNLOAD CTA SECTION  (inspired by Pronto footer CTA)
───────────────────────────────────────────────────────────── */
function AppDownloadSection() {
  const isMobile = useIsMobile()
  return (
    <section style={{
      background: 'var(--bg)',
      padding: '96px 0',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--border-light)',
    }}>
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '5%', left: '10%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,101,10,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'center' }}>
          {/* Left: Text + Buttons */}
          <FadeIn direction="left">
            <span className="eyebrow" style={{ marginBottom: 24, display: 'block' }}>Coming Soon</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, marginBottom: 20 }}>
              Get real home food
              <br />
              <span style={{ color: 'var(--primary)' }}>in minutes.</span>
              <br />
              Download EatEpic!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
              Thousands of home chefs are ready. Join the waitlist and be first when the app goes live.
            </p>

            {/* App Store Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
              {/* Google Play */}
              <motion.a
                href="#"
                onClick={e => e.preventDefault()}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--secondary)', color: 'white',
                  padding: '12px 24px', borderRadius: 14,
                  textDecoration: 'none', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(26,26,46,0.2)',
                  minWidth: 180,
                }}
              >
                {/* Play Store icon */}
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D2FF" />
                      <stop offset="100%" stopColor="#3A7BD5" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#11998E" />
                      <stop offset="100%" stopColor="#38EF7D" />
                    </linearGradient>
                    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF416C" />
                      <stop offset="100%" stopColor="#FF4B2B" />
                    </linearGradient>
                    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F7971E" />
                      <stop offset="100%" stopColor="#FFD200" />
                    </linearGradient>
                  </defs>
                  <polygon points="3,1 3,23 14,12" fill="url(#g2)" />
                  <polygon points="14,12 3,1 21,7" fill="url(#g1)" />
                  <polygon points="14,12 3,23 21,17" fill="url(#g3)" />
                  <polygon points="21,7 14,12 21,17" fill="url(#g4)" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>GET IT ON</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
                </div>
              </motion.a>

              {/* App Store */}
              <motion.a
                href="#"
                onClick={e => e.preventDefault()}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--secondary)', color: 'white',
                  padding: '12px 24px', borderRadius: 14,
                  textDecoration: 'none', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(26,26,46,0.2)',
                  minWidth: 180,
                }}
              >
                {/* Apple icon */}
                <svg width="22" height="22" viewBox="0 0 814 1000" fill="white">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.4-57.2-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.1-49 188.6-49 30.3 0 108.2 2.6 168.3 71.2zm-174.5-72.9c-34.6-40.4-82.1-67-136.3-67-4.5 0-10.3 1.9-14.8 1.9-4.5 0 0-45.1 0-45.1 0-9-2.6 0-2.6 0-17.3 0-37.7 2.6-58.3 13-24.3 12.4-43.3 39.5-43.3 76.5 0 37 19.7 59.5 38 77.8 16.8 16.8 51.2 42.8 51.2 42.8s-5.8 1.3-10.3 1.3c-55.5 0-117.7-56.6-117.7-56.6 0 6.5 13 95.8 76.5 152.4 53.3 47.5 100.1 56.6 100.1 56.6l-47.5 1.3c-10.3 0-19 7.7-19 18.1 0 1.9.6 3.9.6 5.8C618.3 479 700.3 344.3 700.3 344.3c9 3.2 13.6 3.2 13.6 3.2-.1-2.6-.1-50.7-100.3-79.5z" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>Download on the</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
                </div>
              </motion.a>
            </div>

            {/* Contact email — like Pronto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>Feel free to reach us at:</span>
              <motion.a
                href="mailto:hello@eatepic.in"
                whileHover={{ x: 4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px',
                  border: '1.5px solid var(--border)',
                  borderRadius: 100,
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-card)',
                  width: 'fit-content',
                  fontWeight: 500,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hello@eatepic.in
              </motion.a>
            </div>
          </FadeIn>

          {/* Right: Floating Phone Mockup Stack */}
          <FadeIn direction="right">
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: isMobile ? 320 : 480 }}>

              {/* Back phone (tilted left) — hidden on mobile */}
              {!isMobile && <motion.div
                animate={{ y: [0, -8, 0], rotate: [-8, -6, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute', left: '5%',
                  width: 180, borderRadius: 36,
                  background: '#F0ECE5',
                  boxShadow: '0 32px 72px rgba(26,26,46,0.18), 0 0 0 8px rgba(26,26,46,0.04)',
                  overflow: 'hidden',
                  transform: 'rotate(-8deg)',
                  zIndex: 1,
                }}
              >
                {/* Mini app screen */}
                <div style={{ background: 'linear-gradient(135deg, #E8650A, #C4520A)', height: 60, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '0.7rem' }}>EatEpic</span>
                </div>
                <div style={{ padding: 12 }}>
                  {['Kitchen prep', 'Dal & Roti'].map((item, i) => (
                    <div key={i} style={{ background: i === 0 ? '#FFF3E8' : '#F0FFF4', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#1A1A2E' }}>{item}</div>
                      <div style={{ fontSize: '0.48rem', color: '#6B6B6B', marginTop: 2 }}>₹{i === 0 ? 120 : 100}/meal</div>
                    </div>
                  ))}
                </div>
              </motion.div>}

              {/* Front phone (center, upright) */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  width: 220, borderRadius: 44,
                  background: '#F8F4EF',
                  boxShadow: '0 48px 96px rgba(26,26,46,0.28), 0 0 0 10px rgba(26,26,46,0.06)',
                  overflow: 'hidden',
                  zIndex: 3,
                }}
              >
                {/* Status bar */}
                <div style={{ background: '#1A1A2E', padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', fontWeight: 700 }}>9:41 AM</span>
                  <div style={{ width: 14, height: 7, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 2, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: '70%', background: '#34d399', borderRadius: 1 }} />
                  </div>
                </div>
                {/* App header */}
                <div style={{ background: 'linear-gradient(135deg, #E8650A, #C4520A)', padding: '14px 16px 16px' }}>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)' }}>TIFFIN SERVICE</div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', marginTop: 2 }}>EatEpic</div>
                  <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 8, padding: '7px 10px', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <span style={{ fontSize: '0.58rem', color: '#B5ACA3' }}>Search home chefs...</span>
                  </div>
                </div>
                {/* Service rows */}
                <div style={{ padding: '10px 14px' }}>
                  {[
                    { name: 'Sunita\'s Thali', price: '₹120', tag: 'ADD', color: '#E8650A' },
                    { name: 'Meena\'s Sabzi', price: '₹100', tag: 'ADD', color: '#059669' },
                  ].map((svc, si) => (
                    <div key={si} style={{ padding: '10px 0', borderBottom: si === 0 ? '1px solid #EDE8E1' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>{svc.name}</div>
                        <div style={{ fontSize: '0.58rem', color: '#6B6B6B', marginTop: 2 }}>{svc.price}/meal · Fresh daily</div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: si * 0.5 }}
                        style={{ background: svc.color, color: 'white', fontSize: '0.52rem', fontWeight: 800, padding: '4px 10px', borderRadius: 6 }}>
                        {svc.tag}
                      </motion.div>
                    </div>
                  ))}
                  <div style={{ fontSize: '0.56rem', color: 'var(--text-muted)', marginTop: 6 }}>Verified home kitchen · Full equipment</div>
                </div>
              </motion.div>

              {/* Back phone (tilted right) — hidden on mobile */}
              {!isMobile && <motion.div
                animate={{ y: [0, -6, 0], rotate: [8, 6, 8] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', right: '5%',
                  width: 180, borderRadius: 36,
                  background: '#F0ECE5',
                  boxShadow: '0 32px 72px rgba(26,26,46,0.15), 0 0 0 8px rgba(26,26,46,0.04)',
                  overflow: 'hidden',
                  transform: 'rotate(8deg)',
                  zIndex: 1,
                }}
              >
                <div style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', height: 60, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '0.7rem' }}>Your Orders</span>
                </div>
                <div style={{ padding: 12 }}>
                  {['On the way', 'Delivered'].map((status, i) => (
                    <div key={i} style={{ background: i === 0 ? '#EFF6FF' : '#F0FFF4', borderRadius: 8, padding: '8px 10px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#2563eb' : '#059669', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: i === 0 ? '#2563eb' : '#059669' }}>{status}</div>
                    </div>
                  ))}
                </div>
              </motion.div>}

              {/* Floating notification badge */}
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  position: 'absolute', top: '8%', right: '2%', zIndex: 4,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, padding: '10px 14px',
                  boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap',
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)' }}>App Coming Soon</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Join waitlist below</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{
                  position: 'absolute', bottom: '12%', left: '2%', zIndex: 4,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, padding: '10px 14px',
                  boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap',
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>Launching Q3 2026</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Building fast</div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
