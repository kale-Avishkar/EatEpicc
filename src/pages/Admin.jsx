import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '../components/Animations'
import { useToast } from '../components/ToastProvider'
import { IconCheck, IconX, IconArrowRight } from '../components/Icons'
import { supabase } from '../utils/supabase'

const ADMIN_PASS = 'kaleeatepic2026'

// Default seed data identical to the original careers page
const defaultRoles = [
  {
    id: 1,
    title: 'Founding Product Manager',
    location: 'Bangalore',
    type: 'Full-time',
    badge: 'Founding',
    badgeClass: 'badge-orange',
    tag: 'Product',
    color: '#E8650A',
    desc: 'Own the product roadmap from day zero. Work directly with the founders to define, build, and ship the core chef and customer experience. Founding role — significant equity, significant impact.',
    reqs: ['2+ years PM experience', 'Startup or 0-to-1 experience preferred', 'Passionate about food and Indian markets'],
  },
  {
    id: 2,
    title: 'Founding React Developer',
    location: 'Remote',
    type: 'Full-time',
    badge: 'Founding',
    badgeClass: 'badge-blue',
    tag: 'Engineering',
    color: '#6366f1',
    desc: 'Build the EatEpic web and app experience from scratch. Creative freedom, architectural ownership, and features that real home chefs will use daily.',
    reqs: ['React / Next.js proficient', '2+ years frontend experience', 'Strong instinct for clean, fast UI'],
  },
  {
    id: 3,
    title: 'Growth & Community Lead',
    location: 'Mumbai / Remote',
    type: 'Full-time',
    badge: 'Founding',
    badgeClass: 'badge-green',
    tag: 'Marketing',
    color: '#10b981',
    desc: 'Build our early community from zero. Own the waitlist, social presence, chef outreach, and the first 1,000 customer relationships. A rare chance to build a brand identity from scratch.',
    reqs: ['2+ years growth or community experience', 'Strong content and storytelling instinct', 'Regional language fluency a significant advantage'],
  },
  {
    id: 4,
    title: 'Chef Onboarding & Operations',
    location: 'Bangalore / Pune',
    type: 'Full-time',
    badge: 'Field',
    badgeClass: 'badge-purple',
    tag: 'Operations',
    color: '#8b5cf6',
    desc: 'You will be the first face of EatEpic for our home chef partners. Meet them, onboard them, understand their challenges, and shape the onboarding experience for scale.',
    reqs: ['Comfortable with field work and direct outreach', 'Fluent in Kannada, Marathi, or Hindi', 'Empathy-first approach to relationship building'],
  },
  {
    id: 5,
    title: 'Founding UX Designer',
    location: 'Remote',
    type: 'Contract — Full-time',
    badge: 'Design',
    badgeClass: 'badge-navy',
    tag: 'Design',
    color: '#D4A915',
    desc: 'Design EatEpic from first principles. Shape the visual identity, user flows, and design system for both chefs and customers. Work that will define a product used by millions.',
    reqs: ['Figma proficient, pixel-perfect portfolio', 'Mobile-first design philosophy', 'Interest in designing for diverse Indian users'],
  },
]

// Removing duplicate block

export const defaultJournal = [
  {
    id: 1,
    category: 'Founder Vision',
    title: "Why We're Betting on India's Home Kitchen Economy — A ₹12,000 Crore Opportunity No One Has Digitized",
    excerpt: 'The tiffin industry is one of India\'s most resilient, beloved, and completely underserved markets. Here is the research, the data, and the story that convinced us to quit our jobs and build EatEpic.',
    author: 'Avishkar N Kale, Founder',
    date: 'March 2026',
    readTime: '8 min read',
    grad: 'grad-1',
  },
  {
    id: 2,
    category: 'Research',
    title: 'What 100 Working Professionals Told Us About Their Daily Meals',
    excerpt: '72% miss home-cooked food. 68% order delivery more than 3x a week. Only 12% are satisfied with what they eat. The research behind EatEpic.',
    author: 'Avishkar N Kale',
    date: 'March 2026',
    readTime: '6 min read',
    grad: 'grad-2',
  },
  {
    id: 3,
    category: 'Product',
    title: 'Designing the Tiffin Subscription Experience From First Principles',
    excerpt: 'Our UX process for building a product that works for home chefs in Tier 3 cities and busy urban professionals simultaneously.',
    author: 'Divya Rao',
    date: 'Feb 2026',
    readTime: '7 min read',
    grad: 'grad-4',
  }
]

export const getRoles = () => {
  const stored = localStorage.getItem('epic_jobs')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('epic_jobs', JSON.stringify(defaultRoles))
  return defaultRoles
}

export const getJournal = () => {
  const stored = localStorage.getItem('epic_journal')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('epic_journal', JSON.stringify(defaultJournal))
  return defaultJournal
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [roles, setRoles] = useState([])
  const [journal, setJournal] = useState([])
  const [activeTab, setActiveTab] = useState('jobs')
  const toast = useToast()

  // New Job Form State
  const [isAdding, setIsAdding] = useState(false)
  const [newJob, setNewJob] = useState({ title: '', location: '', type: 'Full-time', badge: 'New', tag: 'Engineering', desc: '', reqs: '' })
  
  // New Journal State
  const [isAddingJournal, setIsAddingJournal] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', category: 'Founder Vision', author: 'Avishkar N Kale', excerpt: '', date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`, readTime: '5 min read' })

  const fetchData = async () => {
    const { data: jobs } = await supabase.from('epic_jobs').select('*').order('created_at', { ascending: false })
    if (jobs) setRoles(jobs)
    const { data: posts } = await supabase.from('epic_journal').select('*').order('created_at', { ascending: false })
    if (posts) setJournal(posts)
  }

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      localStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      fetchData()
      toast('Welcome back. Syncing live database...')
    } else {
      toast('Invalid credentials.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing permanently?")) {
      await supabase.from('epic_jobs').delete().eq('id', id)
      setRoles(roles.filter(r => r.id !== id))
      toast('Listing securely deleted from cloud.')
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    const colorMap = { 'Product': '#E8650A', 'Engineering': '#6366f1', 'Marketing': '#10b981', 'Operations': '#8b5cf6', 'Design': '#D4A915' }
    const classMap = { 'Product': 'badge-orange', 'Engineering': 'badge-blue', 'Marketing': 'badge-green', 'Operations': 'badge-purple', 'Design': 'badge-navy' }

    const formattedJob = {
      title: newJob.title,
      location: newJob.location,
      type: newJob.type,
      badge: newJob.badge,
      badgeclass: classMap[newJob.tag] || 'badge-navy',
      tag: newJob.tag,
      color: colorMap[newJob.tag] || '#D4A915',
      desc: newJob.desc,
      reqs: newJob.reqs.split('\n').filter(r => r.trim() !== '')
    }

    const { data, error } = await supabase.from('epic_jobs').insert([formattedJob]).select()
    if (!error && data) {
      setRoles([data[0], ...roles])
      toast('Job listing pushed to live server.')
      setIsAdding(false)
      setNewJob({ title: '', location: '', type: 'Full-time', badge: 'New', tag: 'Engineering', desc: '', reqs: '' })
    } else {
      console.error('Supabase Error:', error)
      toast(`Error: ${error?.message || 'Failed to submit'}`)
    }
  }

  const handleDeleteJournal = async (id) => {
    if (window.confirm("Are you sure you want to delete this journal post permanently?")) {
      await supabase.from('epic_journal').delete().eq('id', id)
      setJournal(journal.filter(r => r.id !== id))
      toast('Journal post successfully deleted.')
    }
  }

  const handleAddJournal = async (e) => {
    e.preventDefault()
    const gradients = ['grad-1', 'grad-2', 'grad-3', 'grad-4', 'grad-5', 'grad-6']
    const randomGrad = gradients[Math.floor(Math.random() * gradients.length)]

    const formattedPost = {
      title: newPost.title,
      category: newPost.category,
      author: newPost.author,
      excerpt: newPost.excerpt,
      date: newPost.date,
      readtime: newPost.readTime,
      grad: randomGrad
    }

    const { data, error } = await supabase.from('epic_journal').insert([formattedPost]).select()
    if (!error && data) {
      setJournal([data[0], ...journal])
      toast('Journal post successfully published live.')
      setIsAddingJournal(false)
      setNewPost({ title: '', category: 'Founder Vision', author: 'Avishkar N Kale', excerpt: '', date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`, readTime: '5 min read' })
    } else {
      console.error('Supabase Error:', error)
      toast(`Error: ${error?.message || 'Failed to submit'}`)
    }
  }

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--secondary), #1a1a2e)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', maxWidth: 400, padding: 40, background: 'var(--bg)', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: 'var(--primary)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>EE</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Founder Portal</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>Secure dashboard to manage the EatEpic platform.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passcode" autoFocus required
                style={{ width: '100%', padding: '14px 20px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', fontSize: '1rem', color: 'var(--text)', outline: 'none' }} />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Authenticate <IconArrowRight /></button>
            </form>
          </motion.div>
        </section>
      </PageTransition>
    )
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, paddingLeft: 12 }}>Admin Panel</div>
        <button onClick={() => setActiveTab('jobs')} style={{ background: activeTab === 'jobs' ? 'var(--primary)' : 'transparent', color: activeTab === 'jobs' ? 'white' : 'var(--text)', padding: '12px 16px', borderRadius: 8, border: 'none', textAlign: 'left', fontWeight: 600, cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center', transition: '0.2s', marginBottom: 4 }}>
          Job Listings
        </button>
        <button onClick={() => setActiveTab('journal')} style={{ background: activeTab === 'journal' ? 'var(--primary)' : 'transparent', color: activeTab === 'journal' ? 'white' : 'var(--text)', padding: '12px 16px', borderRadius: 8, border: 'none', textAlign: 'left', fontWeight: 600, cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center', transition: '0.2s' }}>
          Journal (Blog)
        </button>
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--text-muted)', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-light)', width: '100%', textAlign: 'center', fontWeight: 600, cursor: 'pointer' }}>
            Logout securely
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <FadeIn>
          {activeTab === 'jobs' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: 8 }}>Job Database</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Manage live listings appearing on the EatEpic careers page.</p>
                </div>
                {!isAdding && (
                  <button onClick={() => setIsAdding(true)} className="btn btn-primary">+ Add New Listing</button>
                )}
              </div>

              {isAdding ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 16, border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Create New Listing</h3>
                    <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><IconX /></button>
                  </div>
                  <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="form-group"><label>Job Title</label><input className="form-control" type="text" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} required /></div>
                      <div className="form-group"><label>Location</label><input className="form-control" type="text" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} required /></div>
                      <div className="form-group"><label>Employment Type</label>
                        <select className="form-control" value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}>
                          <option>Full-time</option><option>Part-time</option><option>Contract</option>
                        </select>
                      </div>
                      <div className="form-group"><label>Category Tag</label>
                        <select className="form-control" value={newJob.tag} onChange={e => setNewJob({ ...newJob, tag: e.target.value })}>
                          <option>Product</option><option>Engineering</option><option>Marketing</option><option>Operations</option><option>Design</option>
                        </select>
                      </div>
                      <div className="form-group"><label>Small Badge Icon</label><input className="form-control" type="text" value={newJob.badge} onChange={e => setNewJob({ ...newJob, badge: e.target.value })} placeholder="e.g. Founding, Core, Field" required /></div>
                    </div>
                    <div className="form-group"><label>Job Description</label><textarea className="form-control" rows="4" value={newJob.desc} onChange={e => setNewJob({ ...newJob, desc: e.target.value })} required /></div>
                    <div className="form-group"><label>Requirements (One per line)</label><textarea className="form-control" rows="4" value={newJob.reqs} onChange={e => setNewJob({ ...newJob, reqs: e.target.value })} placeholder="Fluent in Hindi&#10;3+ years experience&#10;Degree in CS..." required /></div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', width: 200, justifyContent: 'center' }}>Publish Live <IconCheck /></button>
                  </form>
                </motion.div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                  {roles.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No job listings available.</p>}
                  {roles.map(r => (
                    <div key={r.id} style={{ background: 'var(--bg-card)', padding: '24px 30px', borderRadius: 16, border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{r.title}</h3>
                          <span className={`badge ${r.badgeclass || r.badgeClass}`}>{r.badge}</span>
                          <span style={{ fontSize: '0.8rem', color: r.color, fontWeight: 700, background: `${r.color}15`, padding: '4px 10px', borderRadius: 100 }}>{r.tag}</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: 16 }}>
                          <span>📍 {r.location}</span>
                          <span>⏱️ {r.type}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(r.id)} style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: '0.2s' }}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'journal' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: 8 }}>Journal Editor</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Write and publish new articles to the public blog.</p>
                </div>
                {!isAddingJournal && (
                  <button onClick={() => setIsAddingJournal(true)} className="btn btn-primary">+ Write New Post</button>
                )}
              </div>

              {isAddingJournal ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 16, border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Write New Post</h3>
                    <button onClick={() => setIsAddingJournal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><IconX /></button>
                  </div>
                  <form onSubmit={handleAddJournal} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>Post Title</label><input className="form-control" type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required /></div>
                      
                      <div className="form-group"><label>Category</label>
                        <select className="form-control" value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })}>
                          <option>Founder Vision</option><option>Research</option><option>Product</option><option>Food Culture</option>
                        </select>
                      </div>
                      <div className="form-group"><label>Author Name</label><input className="form-control" type="text" value={newPost.author} onChange={e => setNewPost({ ...newPost, author: e.target.value })} required /></div>
                      
                      <div className="form-group"><label>Read Time</label><input className="form-control" type="text" value={newPost.readTime} onChange={e => setNewPost({ ...newPost, readTime: e.target.value })} required /></div>
                      <div className="form-group"><label>Publish Date</label><input className="form-control" type="text" value={newPost.date} onChange={e => setNewPost({ ...newPost, date: e.target.value })} required /></div>
                    </div>
                    
                    <div className="form-group"><label>Excerpt / Content Body</label><textarea className="form-control" rows="5" value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} placeholder="Write the core thesis of your post..." required /></div>
                    
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', width: 220, justifyContent: 'center' }}>Publish Article <IconCheck /></button>
                  </form>
                </motion.div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                  {journal.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No journal posts available.</p>}
                  {journal.map(p => (
                    <div key={p.id} style={{ background: 'var(--bg-card)', padding: '24px 30px', borderRadius: 16, border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <div className={p.grad} style={{ width: 80, height: 80, borderRadius: 12, flexShrink: 0 }}></div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>{p.title}</h3>
                          </div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', gap: 16 }}>
                            <span>📁 {p.category}</span>
                            <span>✍️ {p.author}</span>
                            <span>📅 {p.date}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteJournal(p.id)} style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: '0.2s', alignSelf: 'flex-start' }}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
