import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn } from '../components/Animations'

export default function Legal({ type }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [type])

  const content = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'April 2025',
      sections: [
        { title: 'Data Collection', text: 'We only collect data necessary to provide you with the best possible home-cooked meals and to improve our platform experience.' },
        { title: 'Data Usage', text: 'Your data will never be sold to third-party advertisers. We use it solely for operations, chef matching, and platform logistics.' },
        { title: 'Security', text: 'EatEpic uses enterprise-grade encryption to ensure your personal and payment information is completely safe.' },
      ]
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'April 2025',
      sections: [
        { title: 'Agreement', text: 'By using the EatEpic platform, you agree to treat our community of home chefs with respect and abide by our cancellation policies.' },
        { title: 'Chef Partners', text: 'Chef partners operate as independent businesses on our platform and maintain the rights to their own menus and intellectual property.' },
        { title: 'Liability', text: 'While we strictly vet all kitchens for hygiene and quality, EatEpic serves as an infrastructure layer and marketplace connecting users with independent cooks.' },
      ]
    }
  }

  const data = content[type]

  return (
    <PageTransition>
      <section style={{ paddingTop: 'calc(var(--nav-h) + 60px)', paddingBottom: 100, minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <FadeIn>
            <h1 className="hero-heading" style={{ fontSize: '3rem', marginBottom: 16 }}>{data.title}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 60 }}>Last Updated: {data.lastUpdated}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {data.sections.map((sec, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: 16, color: 'var(--secondary)' }}>{i + 1}. {sec.title}</h3>
                  <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '1.05rem', opacity: 0.9 }}>
                    {sec.text}
                  </p>
                </div>
              ))}
              
              <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Questions?</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  If you have any questions about these terms, please contact us at <a href="mailto:kaleavishkar500@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>kaleavishkar500@gmail.com</a>.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
