import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '../components/Animations'
import { useToast } from '../components/ToastProvider'
import { IconArrowRight } from '../components/Icons'
import { submitToGoogleSheet } from '../utils/googleSheets'
import { supabase } from '../utils/supabase'

const categories = ['All', 'Founder Vision', 'Research', 'Product', 'Food Culture']

const catColor = { 'Founder Vision': 'var(--primary)', Research: '#6366f1', Product: '#10b981', 'Food Culture': '#8b5cf6', All: 'var(--secondary)' }

export default function Blog() {
  const [allPosts, setAllPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [active, setActive] = useState('All')
  const toast = useToast()

  useEffect(() => {
    supabase.from('epic_journal').select('*').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setAllPosts(data || [])
        setLoadingPosts(false)
      })
  }, [])

  const featured = allPosts.length > 0 ? allPosts[0] : null
  const posts = allPosts.length > 1 ? allPosts.slice(1) : []
  const filtered = posts.filter(p => active === 'All' || p.category === active)

  return (
    <PageTransition>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(150deg, var(--secondary) 0%, #252540 60%, #1a1a2e 100%)',
        paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 88,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 400px at 30% 60%, rgba(245,200,66,0.08) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ background: 'rgba(255,255,255,0.25)' }} />
              The EatEpic Journal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.75 }}
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', color: 'var(--white)', marginTop: 20, letterSpacing: '-0.025em', lineHeight: 1.08, maxWidth: 680 }}
          >
            Research, Vision, and<br />
            <span style={{ color: 'var(--accent)' }}>Building in Public</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', maxWidth: 500, marginTop: 18, lineHeight: 1.8 }}
          >
            Founder perspectives, market research, product thinking, and the honest story of building a startup from idea to launch.
          </motion.p>
        </div>
      </section>

      {/* ─── FEATURED POST ─────────────────────────────── */}
      {featured && (
        <section style={{ padding: '72px 0 40px', background: 'var(--bg)' }}>
          <div className="container">
            <FadeIn>
              <div className="two-col-grid" style={{ alignItems: 'center' }}>
                {/* Visual */}
                <motion.div
                  className={`grad-box ${featured.grad}`}
                  style={{ height: 380, borderRadius: 'var(--radius-lg)', position: 'relative' }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', borderRadius: 'inherit' }} />
                  <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '5px 14px', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
                      Featured
                    </div>
                  </div>
                  {/* Abstract pattern */}
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 400 380">
                    <circle cx="300" cy="80" r="120" fill="rgba(255,255,255,0.3)" />
                    <circle cx="80" cy="300" r="80" fill="rgba(255,255,255,0.2)" />
                  <circle cx="200" cy="180" r="40" fill="rgba(255,255,255,0.15)" />
                </svg>
              </motion.div>
              {/* Content */}
              <div>
                <span style={{ display: 'inline-flex', fontSize: '0.72rem', fontWeight: 700, color: catColor[featured.category], background: `${catColor[featured.category]}15`, padding: '4px 12px', borderRadius: 100, letterSpacing: '0.05em', marginBottom: 18 }}>
                  {featured.category}
                </span>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)', lineHeight: 1.25, marginBottom: 16 }}>{featured.title}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.87rem' }}>{featured.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{featured.date} · {featured.readTime}</div>
                  </div>
                </div>
                <motion.a href="#" onClick={(e) => { e.preventDefault(); toast('Full article coming soon. Subscribe to the newsletter for updates.'); }} className="btn btn-primary" whileHover={{ scale: 1.04 }}>
                  Read Article <IconArrowRight />
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* ─── ALL POSTS ─────────────────────────────────── */}
      <section style={{ padding: '32px 0 88px', background: 'var(--bg)' }}>
        <div className="container">
          {/* Filters */}
          <FadeIn>
            <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
              {categories.map(cat => (
                <motion.button key={cat} onClick={() => setActive(cat)}
                  style={{
                    padding: '7px 18px', borderRadius: 100,
                    border: `1.5px solid ${active === cat ? catColor[cat] || 'var(--primary)' : 'var(--border)'}`,
                    background: active === cat ? catColor[cat] || 'var(--primary)' : 'transparent',
                    color: active === cat ? 'var(--white)' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  {cat}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="popLayout">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {loadingPosts ? (
                <p style={{ color: 'var(--text-muted)' }}>Retrieving latest journal entries...</p>
              ) : filtered.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No journal articles found in this category.</p>
              ) : (
                filtered.map((post, i) => (
                  <motion.article key={post.id || i}
                    layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}>
                  <motion.div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                    whileHover={{ y: -7, boxShadow: 'var(--shadow-lg)' }}>
                    {/* Image */}
                    <div className={`grad-box ${post.grad}`} style={{ height: 180, borderRadius: 0, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} viewBox="0 0 320 180">
                        <circle cx="260" cy="40" r="80" fill="rgba(255,255,255,0.4)" />
                        <circle cx="60" cy="150" r="50" fill="rgba(255,255,255,0.3)" />
                      </svg>
                    </div>
                    <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: catColor[post.category] || 'var(--primary)', background: `${catColor[post.category] || 'var(--primary)'}12`, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.04em' }}>
                          {post.category}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1rem', lineHeight: 1.4, marginBottom: 10, fontFamily: 'var(--font-heading)', flex: 1 }}>{post.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.65, marginBottom: 18 }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 14 }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)' }}>{post.author}</div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{post.date} · {post.readtime || post.readTime}</div>
                        </div>
                        <motion.a href="#" onClick={(e) => { e.preventDefault(); toast('Full article coming soon. Subscribe to the newsletter for updates.'); }}
                          style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, padding: '5px 12px', background: 'rgba(232,101,10,0.07)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 4 }}
                          whileHover={{ background: 'rgba(232,101,10,0.14)' }}>
                          Read <IconArrowRight />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              )))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── NEWSLETTER ─────────────────────────────────── */}
      <NewsletterSection toast={toast} />
    </PageTransition>
  )
}

function NewsletterSection({ toast }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.querySelector('input').value
    await submitToGoogleSheet({ type: 'Newsletter', email })
    toast('Subscribed. Weekly research and product updates every Monday.')
    e.target.reset()
  }
  return (
    <div className="newsletter-strip">
      <div className="container">
        <FadeIn>
          <h2>Get the Weekly Dispatch</h2>
          <p>Market research, product learnings, and honest founder updates — every Monday morning.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" className="btn btn-white" style={{ flexShrink: 0 }}>Subscribe</button>
          </form>
          <p style={{ fontSize: '0.75rem', marginTop: 14, color: 'rgba(255,255,255,0.35)' }}>
            No spam. No promotions. Unsubscribe any time.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
