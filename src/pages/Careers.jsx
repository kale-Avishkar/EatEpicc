import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '../components/Animations'
import { useToast } from '../components/ToastProvider'
import { IconArrowRight, IconX, IconLinkedIn, IconCheck } from '../components/Icons'
import { submitToGoogleSheet } from '../utils/googleSheets'
import { supabase } from '../utils/supabase'

const tagColors = { Product: '#E8650A', Engineering: '#6366f1', Marketing: '#10b981', Operations: '#8b5cf6', Design: '#D4A915', All: 'var(--secondary)' }
const tags = ['All', 'Product', 'Engineering', 'Marketing', 'Operations', 'Design']

const values = [
  { title: 'Mission First', desc: 'We\'re solving a real problem for real people. Every decision starts with the home cook and the hungry professional, not the metrics.' },
  { title: 'Radical Transparency', desc: 'We build in public, share our learnings openly, and communicate with complete honesty — with each other and with users.' },
  { title: 'Ownership', desc: 'Every person on this team owns their domain completely. No bureaucracy, no waiting for approval. You build, you ship.' },
  { title: 'Long-Term Thinking', desc: 'We\'re not optimizing for a quick exit. We\'re building infrastructure for India\'s home food economy — for decades.' },
]

export default function Careers() {
  const [roles, setRoles] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [activeTag, setActiveTag] = useState('All')
  const [activeRole, setActiveRole] = useState(null)
  const toast = useToast()

  useEffect(() => {
    supabase.from('epic_jobs').select('*').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setRoles(data || [])
        setLoadingJobs(false)
      })
  }, [])

  const filteredRoles = activeTag === 'All' ? roles : (roles || []).filter(r => r.tag === activeTag)

  const handleApply = async (e, role) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const linkedin = e.target[2].value
    const why = e.target[3].value
    
    await submitToGoogleSheet({ 
      type: 'Career Application', 
      role: role.title, 
      name, 
      email, 
      linkedin, 
      why 
    })
    
    toast(`Application received for ${role.title}. We will be in touch within 5 business days.`)
    setActiveRole(null)
  }

  return (
    <>
    <PageTransition>
      {/* ─── HERO ───────────────────────────────────────── */}
      <section style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(150deg, var(--secondary) 0%, #252540 60%, #1a1a2e 100%)',
        paddingTop: 'calc(var(--nav-h) + 60px)', paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 500px at 70% 50%, rgba(232,101,10,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ background: 'rgba(255,255,255,0.25)' }} />
              Join the Team
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.75 }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--white)', marginTop: 18, letterSpacing: '-0.025em', lineHeight: 1.08 }}
          >
            Join the<br /><span style={{ color: 'var(--accent)' }}>Founding Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginTop: 18, lineHeight: 1.8, maxWidth: 540 }}
          >
            We are a small founding team at idea stage — scrappy, deliberate, and building something we believe will transform how India eats. Every role here is foundational. You will not be employee 347. You will help shape everything.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
            style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {['Pre-Launch Stage', 'Founding Equity Available', 'Remote-Friendly'].map(t => (
              <div key={t} style={{ padding: '9px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, color: 'rgba(255,255,255,0.75)', fontSize: '0.84rem', fontWeight: 500 }}>{t}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─────────────────────────────────────── */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">How We Work</span>
              <h2 style={{ marginTop: 14 }}>What We Value</h2>
              <div className="divider center" />
            </div>
          </FadeIn>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 22 }}>
            {values.map(v => (
              <StaggerItem key={v.title}>
                <motion.div className="card" whileHover={{ y: -5, borderColor: 'var(--primary)' }}>
                  <div className="divider" style={{ marginBottom: 18 }} />
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.65 }}>{v.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── ROLES ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="eyebrow">Open Positions</span>
              <h2 style={{ marginTop: 14 }}>{roles.length} Roles Open Now</h2>
              <div className="divider center" />
              <p>Each role has founding-level scope. Pick the one where you'll have the most impact.</p>
            </div>
          </FadeIn>

          {/* Tag filters */}
          <FadeIn>
            <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
              {tags.map(tag => (
                <motion.button key={tag} onClick={() => setActiveTag(tag)}
                  style={{
                    padding: '7px 18px', borderRadius: 100, border: `1.5px solid ${activeTag === tag ? tagColors[tag] : 'var(--border)'}`,
                    background: activeTag === tag ? tagColors[tag] : 'var(--bg-card)',
                    color: activeTag === tag ? 'var(--white)' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  {tag}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="popLayout">
            <div className="three-col-grid" style={{ marginBottom: 40 }}>
            {loadingJobs ? (
              <p style={{ color: 'var(--text-muted)' }}>Syncing jobs matrix...</p>
            ) : filteredRoles.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No open roles match your criteria.</p>
            ) : (
              filteredRoles.map((role, i) => (
                <FadeIn key={role.id || i} delay={i * 0.1}>
                  <motion.div
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05 }}>
                  <motion.div className="card" style={{ padding: '28px 32px', cursor: 'pointer' }}
                    whileHover={{ y: -3, borderColor: role.color, boxShadow: `0 8px 32px ${role.color}18` }}
                    onClick={() => setActiveRole(role)}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                          <span className={`badge ${role.badgeclass}`}>{role.badge}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{role.tag}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>—</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{role.location}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>—</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{role.type}</span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>{role.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.6, maxWidth: 640 }}>{role.desc}</p>
                      </div>
                      <motion.button
                        className="btn btn-outline btn-sm"
                        style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                        whileHover={{ background: role.color, color: 'white', borderColor: role.color }}
                        onClick={e => { e.stopPropagation(); setActiveRole(role) }}
                      >
                        Apply <IconArrowRight />
                      </motion.button>
                    </div>
                  </motion.div>
                  </motion.div>
                </FadeIn>
              ))
            )}
            </div>
          </AnimatePresence>

          <FadeIn>
            <div style={{ marginTop: 48, padding: 32, background: 'var(--bg-alt)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Don't see your role listed?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>We're building the team from scratch. If you believe deeply in the mission and have skills that can move us forward, reach out directly.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setActiveRole({ 
                  title: 'Open Application', 
                  tag: 'General',
                  desc: 'Tell us how you can contribute to EatEpic from day one.', 
                  location: 'Anywhere', 
                  type: 'Flexible', 
                  badge: 'General', 
                  badgeClass: 'badge-blue', 
                  color: 'var(--primary)',
                  reqs: [],
                })}
              >
                Send an Open Application
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
        </PageTransition>


      {/* ─── APPLY MODAL — outside PageTransition to avoid transform context breaking position:fixed ─ */}
      <AnimatePresence>
        {activeRole && (
          <motion.div
            className="modal-overlay"
            data-lenis-prevent
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setActiveRole(null)}
          >
            <motion.div
              className="modal-box"
              style={{ width: '100%', maxWidth: 540, margin: 'auto' }}
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            >
              <button className="modal-close-btn" onClick={() => setActiveRole(null)}><IconX /></button>
              <div style={{ marginBottom: 24 }}>
                <span className={`badge ${activeRole.badgeClass}`} style={{ marginBottom: 12, display: 'inline-flex' }}>{activeRole.tag || activeRole.badge}</span>
                <h2 style={{ fontSize: '1.4rem' }}>{activeRole.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', marginTop: 6 }}>{activeRole.location} · {activeRole.type}</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: 10 }}>Requirements</p>
                {(Array.isArray(activeRole.reqs) ? activeRole.reqs : []).map(r => (
                  <div key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7, fontSize: '0.87rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 14, height: 14, color: 'var(--primary)', flexShrink: 0, marginTop: 1 }}><IconCheck /></div>
                    {r}
                  </div>
                ))}
              </div>
              <form onSubmit={e => handleApply(e, activeRole)}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label>LinkedIn or Portfolio</label>
                  <input type="text" className="form-control" placeholder="linkedin.com/in/..." />
                </div>
                <div className="form-group">
                  <label>Why EatEpic?</label>
                  <textarea className="form-control" placeholder="Tell us why this mission resonates with you, and what you'd bring to this role..." required style={{ minHeight: 100 }} />
                </div>
                <motion.button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Submit Application <IconArrowRight />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
