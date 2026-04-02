import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitToGoogleSheet } from '../utils/googleSheets'

// Simple Icons
const IconChat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
)

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hi there! I'm the EatEpic assistant. How can I help you today?", options: ['When do you launch?', 'How to become a Chef?', 'Are you in my city?', 'Contact Team'] }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [awaitingEmail, setAwaitingEmail] = useState(false)
  const [pendingUserMessage, setPendingUserMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, isTyping])

  const analyzeIntent = (text) => {
    const lower = text.toLowerCase()
    if (lower.match(/(chef|cook|partner|register|join)/)) {
      return "To become a Chef Partner, you can click 'Register as Chef' in our footer or visit our Contact page. We are onboarding 500 founding chefs with 0% commission for the first 6 months!"
    }
    if (lower.match(/(launch|start|when|live|date)/)) {
      return "We are currently building in public and aim to launch our beta platform in late 2026."
    }
    if (lower.match(/(invest|fund|deck|pitch)/)) {
      return "For investor relations, please email our Founder & CEO, Avishkar Kale, directly at kaleavishkar500@gmail.com."
    }
    if (lower.match(/(city|location|where|mumbai|pune|delhi)/)) {
      return "Our initial launch will exclusively cover Mumbai, Maharashtra. We plan to expand to other major Indian cities shortly after."
    }
    if (lower.match(/(what|about|company|eatepic|mission)/)) {
      return "EatEpic is a food-tech platform digitizing India's home tiffin economy. We connect talented home cooks with food lovers, giving cooks the infrastructure to scale and earn consistently."
    }
    if (lower.match(/(price|cost|commission|fee)/)) {
      return "For consumers, meal mapping will be highly affordable. For our early Chef Partners, we offer 0% commission for the first 6 months, and an industry-low rate after that."
    }
    return null
  }

  const handleSend = async (e, overrideText = null) => {
    e?.preventDefault()
    const rawText = overrideText !== null ? overrideText : inputValue
    if (!rawText.trim()) return

    const userMsg = rawText.trim()
    setInputValue('')
    
    setMessages(prev => {
      const newMsgs = [...prev]
      const last = newMsgs[newMsgs.length - 1]
      if (last && last.options) newMsgs[newMsgs.length - 1] = { ...last, options: [] }
      return [...newMsgs, { id: Date.now(), sender: 'user', text: userMsg }]
    })
    
    setIsTyping(true)

    // Handle Email submission state for unknown queries
    if (awaitingEmail) {
      setTimeout(async () => {
        try {
          await submitToGoogleSheet({ 
            type: 'Chatbot', 
            email: userMsg, 
            message: pendingUserMessage 
          })
          setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Thank you! I have forwarded your message directly to the founding team. They will review it on the dashboard shortly.' }])
        } catch (error) {
          setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Oh no, there was an issue sending that to the server. Please use our Contact page instead.' }])
        }
        setAwaitingEmail(false)
        setPendingUserMessage('')
        setIsTyping(false)
      }, 1200)
      return
    }

    // Normal intent parsing
    setTimeout(() => {
      if (userMsg === 'Contact Team') {
        setPendingUserMessage('General Inquiry via Quick Option')
        setAwaitingEmail(true)
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: "I can connect you directly with the founding team. Could you provide your email address first?" }])
      } else {
        const botReply = analyzeIntent(userMsg)
        if (botReply) {
          setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: botReply }])
        } else {
          setPendingUserMessage(userMsg)
          setAwaitingEmail(true)
          setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: "I don't have the exact answer for that yet. Would you mind providing your email address so our founding team can reach out to you directly?" }])
        }
      }
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="chatbot-container"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                width: 340, height: 480,
                background: 'var(--bg)', borderRadius: 20,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '1px solid var(--border)',
                marginBottom: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden'
              }}
            >
              {/* HEADER */}
              <div style={{ background: 'var(--primary)', color: 'white', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                    EE
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>EatEpic Assistant</h4>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'block' }}></span>
                      Online
                    </span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }} aria-label="Close Chat">
                  <IconX />
                </button>
              </div>

              {/* MESSAGES */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg-alt)' }}>
                {messages.map((m) => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        background: m.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                        color: m.sender === 'user' ? 'white' : 'var(--text)',
                        padding: '10px 14px', borderRadius: 16,
                        borderBottomRightRadius: m.sender === 'user' ? 4 : 16,
                        borderBottomLeftRadius: m.sender === 'bot' ? 4 : 16,
                        fontSize: '0.9rem', lineHeight: 1.5,
                        boxShadow: m.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                        border: m.sender === 'bot' ? '1px solid var(--border-light)' : 'none'
                      }}
                    >
                      {m.text}
                    </motion.div>
                    
                    {/* Quick Options Rendering */}
                    {m.options && m.options.length > 0 && !awaitingEmail && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}
                      >
                        {m.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(null, opt)}
                            style={{
                              padding: '5px 12px', background: 'var(--bg-card)',
                              border: '1px solid var(--border)', borderRadius: 100,
                              color: 'var(--text)', fontSize: '0.75rem',
                              cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                            }}
                            onMouseOver={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; e.target.style.borderColor = 'var(--primary)' }}
                            onMouseOut={(e) => { e.target.style.background = 'var(--bg-card)'; e.target.style.color = 'var(--text)'; e.target.style.borderColor = 'var(--border)' }}
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{
                      alignSelf: 'flex-start', background: 'var(--bg-card)', color: 'var(--text-muted)',
                      padding: '10px 16px', borderRadius: 16, borderBottomLeftRadius: 4,
                      fontSize: '0.9rem', border: '1px solid var(--border-light)', display: 'flex', gap: 4
                    }}
                  >
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} style={{ width: 5, height: 5, background: 'var(--text-muted)', borderRadius: '50%' }} />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 5, height: 5, background: 'var(--text-muted)', borderRadius: '50%' }} />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 5, height: 5, background: 'var(--text-muted)', borderRadius: '50%' }} />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT FORM */}
              <div style={{ padding: '14px 16px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
                  <input
                    type={awaitingEmail ? "email" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={awaitingEmail ? "Enter your email..." : "Ask a question..."}
                    style={{
                      flex: 1, border: 'none', outline: 'none', background: 'var(--bg-alt)',
                      padding: '10px 14px', borderRadius: 100, fontSize: '0.9rem', color: 'var(--text)'
                    }}
                    required
                  />
                  <button type="submit" disabled={!inputValue.trim()}
                    style={{
                      background: 'var(--primary)', color: 'white', border: 'none', width: 40, height: 40,
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: inputValue.trim() ? 'pointer' : 'not-allowed', opacity: inputValue.trim() ? 1 : 0.5,
                      transition: 'all 0.2s'
                    }}
                  >
                    <IconSend />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 60, height: 60, borderRadius: '50%', background: 'var(--primary)',
            color: 'white', border: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(232,101,10,0.3)',
            zIndex: 9999
          }}
          aria-label="Open Chatbot"
        >
          {isOpen ? <IconX /> : <IconChat />}
        </motion.button>
      </div>
      
      {/* Responsive adjustments if on tiny screen */}
      <style>{`
        @media (max-width: 480px) {
          .chatbot-container {
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
