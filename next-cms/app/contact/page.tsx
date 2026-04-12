'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: wire to Sanity mutation or your preferred form handler
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(240,237,230,0.12)',
    padding: '12px 0',
    color: '#f0ede6',
    fontFamily: 'var(--font-dm-mono)',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-mono)',
    fontSize: 10,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#5a5a52',
    display: 'block',
    marginBottom: 8,
  }

  return (
    <main>
      <section className="min-h-screen pt-40 px-site pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left — headline */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span style={{ width: 32, height: 1, background: '#c8ff00', display: 'inline-block' }} />
              <span
                className="uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#c8ff00' }}
              >
                Let&apos;s Talk
              </span>
            </motion.div>

            {['Start', 'with', 'intent.'].map((word, i) => (
              <div key={word} className="word-wrap block">
                <motion.h1
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(56px,7vw,112px)',
                    fontWeight: 300,
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: word === 'intent.' ? '#c8ff00' : '#f0ede6',
                    fontStyle: word === 'intent.' ? 'italic' : 'normal',
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}

            <motion.p
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: '#5a5a52', lineHeight: 2, maxWidth: 360 }}
            >
              We typically respond within 24 hours. For urgent enquiries, reach us at&nbsp;
              <a href="mailto:hello@studio3.design" style={{ color: '#c8ff00' }}>
                hello@studio3.design
              </a>
            </motion.p>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            {sent ? (
              <div className="py-20">
                <div
                  className="mb-4"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: 48, fontWeight: 300, color: '#c8ff00', fontStyle: 'italic' }}
                >
                  Received.
                </div>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: '#5a5a52', lineHeight: 2 }}>
                  We&apos;ll be in touch shortly to understand your intent.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                {[
                  { key: 'name',    label: 'Your Name',             type: 'text',  placeholder: 'Full name' },
                  { key: 'email',   label: 'Email',                  type: 'email', placeholder: 'hello@example.com' },
                  { key: 'project', label: 'What are you building?', type: 'text',  placeholder: 'Describe the project' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key} className="flex flex-col">
                    <label style={labelStyle}>{label}</label>
                    <input
                      type={type}
                      value={fields[key as keyof typeof fields]}
                      onChange={e => setFields(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderBottomColor = '#c8ff00' }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderBottomColor = 'rgba(240,237,230,0.12)' }}
                      required={key === 'name' || key === 'email'}
                    />
                  </div>
                ))}

                <div className="flex flex-col">
                  <label style={labelStyle}>Intent — tell us the why</label>
                  <textarea
                    value={fields.message}
                    onChange={e => setFields(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="What's the core problem you're trying to solve, and for whom?"
                    rows={4}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => { (e.target as HTMLTextAreaElement).style.borderBottomColor = '#c8ff00' }}
                    onBlur={e => { (e.target as HTMLTextAreaElement).style.borderBottomColor = 'rgba(240,237,230,0.12)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="self-start px-10 py-4 uppercase tracking-[0.15em] transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: '#c8ff00',
                    color: '#0a0a08',
                    border: 'none',
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: 11,
                    cursor: 'none',
                  }}
                  onMouseMove={e => {
                    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect()
                    const dx = (e.clientX - rect.left - rect.width / 2) * 0.3
                    const dy = (e.clientY - rect.top - rect.height / 2) * 0.3
                    ;(e.currentTarget as HTMLButtonElement).style.transform = `translate(${dx}px,${dy}px)`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translate(0,0)'
                    ;(e.currentTarget as HTMLButtonElement).style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
                  }}
                >
                  <span className="relative z-10">Send Message →</span>
                  <div
                    className="absolute inset-0 bg-offwhite transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
