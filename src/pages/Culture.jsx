import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '../components/Animations'
import { IconArrowRight, IconLinkedIn, IconHeart, IconShield, IconUsers, IconTrendingUp, IconGlobe, IconZap } from '../components/Icons'

const mission = {
  title: 'Our Mission',
  body: 'To build the infrastructure that makes home-cooked food accessible to every Indian professional — and transforms every talented home cook into a recognized entrepreneur.',
}

const vision = {
  title: 'Our Vision',
  body: 'A future where India\'s home kitchen economy is fully digitized. Where "Meena\'s Kitchen" is a known and trusted brand. Where delivering quality home food is as seamless as any other digital service.',
}

const values = [
  { Icon: IconHeart, title: 'Real Food, Real People', desc: 'We are building for home cooks and food lovers — not abstractions. Every decision is grounded in empathy for the people we serve.' },
  { Icon: IconShield, title: 'Radical Transparency', desc: 'We build in public, share our learnings openly, and communicate with honesty — with each other, our users, and the market.' },
  { Icon: IconUsers, title: 'Community Over Everything', desc: 'The community of home chefs and subscribers is the product. We exist to serve them, empower them, and grow with them.' },
  { Icon: IconTrendingUp, title: 'Long-Term Thinking', desc: 'We\'re not optimizing for a quick exit. We\'re building infrastructure for India\'s home food economy — for decades.' },
  { Icon: IconGlobe, title: 'Local by Design', desc: 'Every feature, every decision, every product choice is made with the Indian context in mind. This is not a Western product adapted for India.' },
  { Icon: IconZap, title: 'Bias for Action', desc: 'We move fast, make decisions with incomplete information, learn quickly, and iterate. Speed and quality are not opposites here.' },
]

const timeline = [
  { period: '2024', title: 'The Insight', desc: 'Co-founders Arjun and Divya, frustrated with food delivery, get a home-cooked tiffin from their neighbor. The food is extraordinary. The realization is immediate: this model can scale — with the right technology behind it.', accent: 'var(--primary)' },
  { period: 'Early 2025', title: 'Deep Research', desc: 'We conduct 40+ structured interviews with home cooks and 100+ with working professionals across Bangalore and Pune. The pain points are universal. The opportunity is massive. We decide to commit fully.', accent: '#6366f1' },
  { period: 'Q3 2025', title: 'Concept Validated', desc: 'Initial concept testing with 12 home cooks and 50 potential subscribers confirms strong demand and willingness to pay. We define the core product, establish the waitlist, and begin building.', accent: '#10b981' },
  { period: 'Q4 2025 – Q1 2026', title: 'Building the MVP', desc: 'Engineering underway on the chef onboarding flow, subscription management, and real-time delivery tracking. The waitlist opens. The founding team expands to 5 people.', accent: '#8b5cf6' },
  { period: 'Q2 2026', title: 'Beta Testing', desc: 'Closed beta with 50 home chefs and 200 subscribers across Pune and Bangalore. Rapid iteration based on real feedback. Logistics systems stress-tested at scale.', accent: '#f59e0b' },
  { period: 'Q3 2026', title: 'Public Launch', desc: 'EatEpic goes live in Pune, Bangalore, and Hyderabad. Full subscription platform, live GPS tracking, weekly chef payouts, and instant customer support.', accent: '#10b981' },
  { period: '2026', title: 'Target Launch', desc: 'Planned launch in Mumbai, Maharashtra with 20 founding chef partners and 500 founding members. Phase 2 expansion to Pune, Hyderabad, and Bangalore follows within 6 months.', accent: 'var(--accent-dark)' },
]

const team = [
  { name: 'Avishkar N Kale', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/avishkar-narendra-kale-b06181235', bio: 'Two years of experience building tech and consumer products. Building EatEpic after seeing the massive opportunity up close. Deeply passionate about food systems and building for Bharat.', color: 'var(--primary)' },
  { name: 'Divya Rao', role: 'Co-Founder & CTO', bio: 'Full-stack engineer with a background in building consumer apps at scale. Believes technology should be invisible — and that every home cook deserves infrastructure.', color: '#6366f1' },
  { name: 'Kiran Patel', role: 'Chef Community Lead', bio: 'Eight years training and empowering home cooks across India. The bridge between EatEpic\'s platform and the extraordinary chefs at the heart of everything we do.', color: '#10b981' },
  { name: 'Rahul Nair', role: 'Growth & Brand', bio: 'Storyteller and growth strategist. Has built brand identity for three Indian consumer startups from zero. Believes that authentic human stories are the only brand strategy that lasts.', color: '#8b5cf6' },
]

export default function Culture() {
  return (
    <PageTransition>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(150deg, var(--secondary) 0%, #252540 60%, #1a1a2e 100%)',
        paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 88,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 800px 600px at 60% 60%, rgba(245,200,66,0.07) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ background: 'rgba(255,255,255,0.25)' }} />
              Who We Are
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.75 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--white)', marginTop: 20, letterSpacing: '-0.025em', lineHeight: 1.08, maxWidth: 680 }}
          >
            Built on the Belief That<br />
            <span style={{ color: 'var(--accent)' }}>Home Food Matters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', maxWidth: 540, marginTop: 20, lineHeight: 1.85 }}
          >
            EatEpic started with a simple realization — that the best food in India was being made in people's homes, invisible to the world, uncompensated at scale. We're building to change that.
          </motion.p>
        </div>
      </section>

      {/* ─── MISSION + VISION ──────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="two-col-grid">
            {[mission, vision].map((m, i) => (
              <FadeIn key={m.title} direction={i === 0 ? 'left' : 'right'}>
                <motion.div className="card" style={{ height: '100%', borderTop: `3px solid ${i === 0 ? 'var(--primary)' : 'var(--accent)'}` }}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}>
                  <div className="divider" style={{ background: i === 0 ? 'linear-gradient(90deg, var(--primary), var(--accent))' : 'linear-gradient(90deg, var(--accent), var(--primary))', margin: '0 0 24px' }} />
                  <h2 style={{ fontSize: '1.35rem', marginBottom: 16 }}>{m.title}</h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.97rem' }}>{m.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">What We Stand For</span>
              <h2 style={{ marginTop: 14 }}>Our Values</h2>
              <div className="divider center" />
              <p>The principles that guide every product decision, every hire, and every customer interaction.</p>
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {values.map(({ Icon, title, desc }) => (
              <StaggerItem key={title}>
                <motion.div className="card" style={{ height: '100%' }}
                  whileHover={{ y: -6, borderColor: 'var(--primary)', boxShadow: 'var(--shadow-md)' }}>
                  <div className="icon-box icon-box-orange" style={{ marginBottom: 18 }}>
                    <div style={{ color: 'var(--primary)' }}><Icon /></div>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 10 }}>{title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Our Story So Far</span>
              <h2 style={{ marginTop: 14 }}>The Journey to Launch</h2>
              <div className="divider center" />
              <p>From a neighbor's kitchen to a founding team. Here's how we got here and where we're going.</p>
            </div>
          </FadeIn>
          <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--primary), var(--border))', borderRadius: 2 }} />
            {timeline.map((item, i) => (
              <FadeIn key={item.period} delay={i * 0.08}>
                <motion.div style={{ display: 'flex', gap: 28, marginBottom: 36, position: 'relative' }}
                  whileHover={{ x: 4 }}>
                  {/* Dot */}
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: item.accent, border: '3px solid var(--bg)', boxShadow: `0 0 0 2px ${item.accent}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ width: 12, height: 12, background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }} />
                  </div>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px 24px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.accent, background: `${item.accent}15`, padding: '3px 10px', borderRadius: 100 }}>{item.period}</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">The Founding Team</span>
              <h2 style={{ marginTop: 14 }}>Who's Building This</h2>
              <div className="divider center" />
              <p>A small, deliberate team — each person here because they believe in the mission and have the skills to push it forward.</p>
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <motion.div className="card" style={{ height: '100%' }}
                  whileHover={{ y: -7, boxShadow: 'var(--shadow-lg)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${member.color}18`, border: `2px solid ${member.color}30`, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={member.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 4 }}>{member.name}</h3>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: member.color, marginBottom: 14 }}>{member.role}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.65, flex: 1 }}>{member.bio}</p>
                  <motion.a href={member.linkedin || "https://linkedin.com/"} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ marginTop: 18, background: 'rgba(26,26,46,0.05)', border: '1px solid var(--border)', borderRadius: 8, width: 34, height: 34, padding: 0, color: 'var(--secondary)' }}
                    whileHover={{ background: '#0077B5', color: 'white', border: 'none' }}>
                    <div style={{ width: 14, height: 14 }}><IconLinkedIn /></div>
                  </motion.a>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--secondary)', textAlign: 'center' }}>
        <div className="container">
          <FadeIn>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.75rem,3.5vw,2.8rem)', marginBottom: 14 }}>
              Want to Build This With Us?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 32, fontSize: '1rem', maxWidth: 480, margin: '0 auto 32px' }}>
              We're at idea stage — small, scrappy, and deeply committed. If you believe in the mission and have skills that move us forward, we want to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/careers" className="btn btn-primary btn-lg">
                View Open Roles <IconArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
