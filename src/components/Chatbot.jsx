import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitToGoogleSheet } from '../utils/googleSheets'

/* ── Icons ──────────────────────────────────────────────────── */
const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

/* ── Intent parsing ─────────────────────────────────────────── */
function analyzeIntent(text) {
  const t = text.toLowerCase()
  if (t.match(/(chef|cook|partner|register|join)/))
    return "To become a Chef Partner, click 'Register as Chef' in our footer or visit the Contact page. We're onboarding 500 founding chefs with 0% commission for the first 6 months!"
  if (t.match(/(launch|start|when|live|date)/))
    return "We're currently building in public and aim to launch our beta platform in late 2026. Join the waitlist to get early access!"
  if (t.match(/(invest|fund|deck|pitch)/))
    return "For investor relations, please email our Founder & CEO Avishkar Kale at kaleavishkar500@gmail.com."
  if (t.match(/(city|location|where|mumbai|pune|delhi)/))
    return "Our initial launch will cover Mumbai, Maharashtra. We plan to expand to other major Indian cities shortly after."
  if (t.match(/(what|about|company|eatepic|mission)/))
    return "EatEpic is a food-tech platform digitizing India's home tiffin economy — connecting talented home cooks with food lovers across India."
  if (t.match(/(price|cost|commission|fee)/))
    return "For consumers, meals are highly affordable. For Chef Partners, we offer 0% commission for 6 months and an industry-low rate after that."
  return null
}

const INITIAL_MESSAGES = [
  {
    id: 1, sender: 'bot',
    text: "Hi there! I'm the EatEpic assistant. How can I help you today?",
    options: ['When do you launch?', 'Become a Chef?', 'Are you in my city?', 'Contact Team'],
  },
]

/* ═══════════════════════════════════════════════════════════════
   Chatbot
═══════════════════════════════════════════════════════════════ */
export default function Chatbot() {
  const [isOpen,             setIsOpen]             = useState(false)
  const [messages,           setMessages]           = useState(INITIAL_MESSAGES)
  const [inputValue,         setInputValue]         = useState('')
  const [isTyping,           setIsTyping]           = useState(false)
  const [awaitingEmail,      setAwaitingEmail]      = useState(false)
  const [pendingUserMessage, setPendingUserMessage] = useState('')
  const messagesEndRef = useRef(null)

  /* Auto-scroll to latest message */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60)
    }
  }, [messages, isOpen, isTyping])

  /* Lock body scroll when open on mobile */
  useEffect(() => {
    if (isOpen && window.innerWidth <= 600) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const open  = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  /* Handle send — both from form submit and quick-option click */
  const handleSend = async (e, overrideText = null) => {
    e?.preventDefault()
    const raw = overrideText !== null ? overrideText : inputValue
    if (!raw.trim()) return

    const userMsg = raw.trim()
    setInputValue('')

    /* Collapse previous options */
    setMessages(prev => {
      const list = [...prev]
      const last = list[list.length - 1]
      if (last?.options?.length) list[list.length - 1] = { ...last, options: [] }
      return [...list, { id: Date.now(), sender: 'user', text: userMsg }]
    })

    setIsTyping(true)

    /* Email-capture flow */
    if (awaitingEmail) {
      try {
        await submitToGoogleSheet({ type: 'Chatbot', email: userMsg, message: pendingUserMessage })
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(), sender: 'bot',
            text: 'Thank you! Your message has been forwarded to our founding team. We\'ll reach out soon.',
          }])
          setIsTyping(false)
        }, 1000)
      } catch {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(), sender: 'bot',
            text: 'There was an issue. Please use our Contact page to reach us directly.',
          }])
          setIsTyping(false)
        }, 1000)
      }
      setAwaitingEmail(false)
      setPendingUserMessage('')
      return
    }

    /* Intent routing */
    setTimeout(() => {
      if (userMsg === 'Contact Team') {
        setPendingUserMessage('General Inquiry via Quick Option')
        setAwaitingEmail(true)
        setMessages(prev => [...prev, {
          id: Date.now(), sender: 'bot',
          text: 'I can connect you with our founding team. Could you share your email address?',
        }])
      } else {
        const reply = analyzeIntent(userMsg)
        if (reply) {
          setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: reply }])
        } else {
          setPendingUserMessage(userMsg)
          setAwaitingEmail(true)
          setMessages(prev => [...prev, {
            id: Date.now(), sender: 'bot',
            text: "I don't have an exact answer for that yet. Share your email and our team will reach out directly!",
          }])
        }
      }
      setIsTyping(false)
    }, 1400)
  }

  return (
    <>
      {/*
        ── Layout strategy ──────────────────────────────────────
        We use a FIXED wrapper at bottom-right for the toggle button.
        The chat PANEL is absolutely positioned ABOVE the button,
        pinned to bottom of the fixed anchor — never extends past the
        right or left edge of the viewport.
      */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 20,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
        /* Ensure the whole group doesn't overflow left on tiny screens */
        maxWidth: 'calc(100vw - 24px)',
        pointerEvents: 'none', /* children opt-in individually */
      }}>

        {/* ════════ CHAT PANEL ════════════════════════════════ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="chatbot-container"
              key="chatbot-panel"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{   opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                /* Width: 360px on desktop, shrinks to fill viewport on small screens */
                width: 'min(360px, calc(100vw - 24px))',
                /* Height: 460px on desktop, shorter on small screens */
                height: 'clamp(400px, 60vh, 500px)',
                background: 'var(--bg)',
                borderRadius: 20,
                boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'all',
              }}
            >
              {/* ── HEADER ───────────────────────────────────── */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                color: 'white',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800, fontSize: '0.75rem',
                    letterSpacing: '0.02em', flexShrink: 0,
                  }}>
                    EE
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.2 }}>
                      EatEpic Assistant
                    </div>
                    <div style={{
                      fontSize: '0.72rem', color: 'rgba(255,255,255,0.82)',
                      display: 'flex', alignItems: 'center', gap: 5, marginTop: 2,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#34d399', display: 'block', flexShrink: 0,
                      }} />
                      Online · Replies instantly
                    </div>
                  </div>
                </div>

                {/* Close button — only one, in the header */}
                <button
                  onClick={close}
                  aria-label="Close chat"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none', color: 'white',
                    width: 32, height: 32, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseOut={e  => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  <IconX />
                </button>
              </div>

              {/* ── MESSAGES ─────────────────────────────────── */}
              <div style={{
                flex: 1, overflowY: 'auto',
                padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 12,
                background: 'var(--bg-alt)',
                /* Smooth momentum scrolling on iOS */
                WebkitOverflowScrolling: 'touch',
              }}>
                {messages.map(m => (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '86%',
                    }}
                  >
                    {/* Bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        background: m.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                        color:      m.sender === 'user' ? 'white'          : 'var(--text)',
                        padding: '10px 13px',
                        borderRadius: 14,
                        borderBottomRightRadius: m.sender === 'user' ? 3 : 14,
                        borderBottomLeftRadius:  m.sender === 'bot'  ? 3 : 14,
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        boxShadow: m.sender === 'bot'
                          ? '0 2px 8px rgba(0,0,0,0.05)'
                          : '0 2px 8px rgba(232,101,10,0.2)',
                        border: m.sender === 'bot'
                          ? '1px solid var(--border-light)'
                          : 'none',
                        wordBreak: 'break-word',
                      }}
                    >
                      {m.text}
                    </motion.div>

                    {/* Quick-reply chips */}
                    {m.options?.length > 0 && !awaitingEmail && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginTop: 2,
                        }}
                      >
                        {m.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(null, opt)}
                            style={{
                              padding: '6px 12px',
                              background: 'var(--bg-card)',
                              border: '1.5px solid var(--border)',
                              borderRadius: 100,
                              color: 'var(--text)',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              /* Make tappable on touchscreen */
                              minHeight: 34,
                              whiteSpace: 'nowrap',
                            }}
                            onMouseOver={e => {
                              e.currentTarget.style.background = 'var(--primary)'
                              e.currentTarget.style.color = 'white'
                              e.currentTarget.style.borderColor = 'var(--primary)'
                            }}
                            onMouseOut={e => {
                              e.currentTarget.style.background = 'var(--bg-card)'
                              e.currentTarget.style.color = 'var(--text)'
                              e.currentTarget.style.borderColor = 'var(--border)'
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      alignSelf: 'flex-start',
                      background: 'var(--bg-card)',
                      padding: '10px 16px',
                      borderRadius: 14, borderBottomLeftRadius: 3,
                      border: '1px solid var(--border-light)',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    {[0, 0.18, 0.36].map((delay, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay }}
                        style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: 'var(--text-light)', display: 'block',
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── INPUT ────────────────────────────────────── */}
              <div style={{
                padding: '12px 14px',
                background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
                flexShrink: 0,
              }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type={awaitingEmail ? 'email' : 'text'}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={awaitingEmail ? 'Enter your email…' : 'Ask a question…'}
                    autoComplete={awaitingEmail ? 'email' : 'off'}
                    style={{
                      flex: 1, minWidth: 0,
                      border: '1.5px solid var(--border)',
                      outline: 'none',
                      background: 'var(--bg-alt)',
                      padding: '9px 14px',
                      borderRadius: 100,
                      fontSize: '0.875rem',
                      color: 'var(--text)',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e  => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e   => e.target.style.borderColor = 'var(--border)'}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label="Send message"
                    style={{
                      background: inputValue.trim() ? 'var(--primary)' : 'var(--bg-alt)',
                      color: inputValue.trim() ? 'white' : 'var(--text-light)',
                      border: 'none',
                      width: 38, height: 38, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                    }}
                  >
                    <IconSend />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ TOGGLE BUTTON ═════════════════════════════ */}
        {/*
          Shows ONLY the chat icon — never an X (header has that).
          Presence of the open panel visually communicates it's open.
        */}
        <motion.button
          onClick={isOpen ? close : open}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? 'Close chat' : 'Open chat with EatEpic assistant'}
          style={{
            width: 56, height: 56,
            borderRadius: '50%',
            background: isOpen
              ? 'var(--secondary)'
              : 'var(--primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isOpen
              ? '0 8px 24px rgba(26,26,46,0.3)'
              : '0 8px 28px rgba(232,101,10,0.38)',
            zIndex: 9999,
            pointerEvents: 'all',
            flexShrink: 0,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IconX />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                exit={{   scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IconChat />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
