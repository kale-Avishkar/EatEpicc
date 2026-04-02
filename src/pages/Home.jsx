import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
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
  { value: '2026', label: 'Target launch year — building now', note: 'Our roadmap' },
]

const steps = [
  { num: '01', title: 'Browse & Subscribe', desc: 'Discover verified home chefs near you. Filter by cuisine, diet, and schedule. Subscribe to weekly or monthly tiffin plans.', color: 'var(--primary)' },
  { num: '02', title: 'Chef Cooks Fresh', desc: 'Your chef batch-prepares fresh every morning. No frozen food, no preservatives, no shortcuts. Just honest home cooking.', color: '#6366f1' },
  { num: '03', title: 'Delivered to You', desc: 'Trained delivery partners bring your tiffin hot and on time. Real-time tracking from kitchen door to yours.', color: '#10b981' },
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const toast = useToast()

  return (
    <PageTransition>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-h)',
        background: 'var(--bg)',
      }}>
        {/* Parallax BG layer */}
        <motion.div style={{
          position: 'absolute', inset: 0, y: heroY,
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

        <motion.div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', opacity: heroOpacity }}>
          {/* Status pill */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', border: '1px solid var(--border)', borderRadius: 100, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
              <motion.span style={{ width: 7, height: 7, background: '#34d399', borderRadius: '50%', display: 'block' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
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
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <button 
                onClick={() => toast('Chef Partner onboarding begins next month. Please join the waitlist to get notified.')} 
                className="btn btn-outline btn-lg"
              >
                Register as Chef Partner
              </button>
            </motion.div>
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

      {/* ─── HOW IT WILL WORK ─────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Product Vision</span>
              <h2>How EatEpic Will Work</h2>
              <div className="divider center" />
              <p>A seamless subscription experience — from chef discovery to your doorstep, in three steps.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, position: 'relative' }}>
            {/* Connector */}
            <div style={{ position: 'absolute', top: 56, left: '18%', right: '18%', height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)', zIndex: 0 }} />
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <motion.div className="card" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: step.color, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, boxShadow: `0 8px 20px ${step.color}35` }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 36 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 24 }}>
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
                { line1: 'In Development', line2: 'MVP Q4 2025', top: '8%', right: -32 },
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
              <motion.button type="submit" className="btn btn-white" style={{ flexShrink: 0 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Subscribe</motion.button>
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
