'use client'

import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const CTA_TEXT = "Let's talk."

function MagneticLetter({ char, delay }: { char: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const radius = 100
    if (dist < radius) {
      const strength = (1 - dist / radius) * 22
      setPos({ x: (dx / dist) * strength, y: (dy / dist) * strength })
    }
  }, [])

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), [])

  if (char === ' ') return <span>&nbsp;</span>

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      initial={{ y: '110%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      className="inline-block"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {char}
    </motion.span>
  )
}

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(false)

  // Mouse spotlight for section
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--cx', `${x}%`)
    e.currentTarget.style.setProperty('--cy', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative py-48 px-site border-t overflow-hidden cursor-none"
      style={{
        borderColor: 'rgba(240,237,230,0.1)',
        background: hovered ? '#c8ff00' : '#0a0a08',
        transition: 'background 0.7s cubic-bezier(0.76,0,0.24,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial cursor spotlight when not hovered */}
      {!hovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--cx,50%) var(--cy,50%), rgba(200,255,0,0.07), transparent 50%)',
          }}
        />
      )}

      <div className="relative z-10">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            style={{ width: 32, height: 1, background: hovered ? '#0a0a08' : '#c8ff00', display: 'inline-block', transition: 'background 0.7s' }}
          />
          <span
            className="uppercase tracking-[0.2em] transition-colors duration-700"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: hovered ? '#0a0a08' : '#c8ff00' }}
          >
            Start a Project
          </span>
        </motion.div>

        {/* Magnetic headline */}
        <h2
          className="overflow-hidden mb-16"
          aria-label={CTA_TEXT}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(72px, 13vw, 200px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: hovered ? '#0a0a08' : '#f0ede6',
            transition: 'color 0.7s',
          }}
        >
          {CTA_TEXT.split('').map((char, i) => (
            <MagneticLetter key={i} char={char} delay={i * 30} />
          ))}
        </h2>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 border px-10 py-5 uppercase tracking-[0.15em] transition-all duration-500 hover:gap-8"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: 11,
              borderColor: hovered ? '#0a0a08' : 'rgba(240,237,230,0.2)',
              color: hovered ? '#0a0a08' : '#f0ede6',
              transition: 'border-color 0.7s, color 0.7s, gap 0.3s',
            }}
          >
            <span>Begin</span>
            <span
              className="inline-block transition-all duration-300"
              style={{ width: 24, height: 1, background: hovered ? '#0a0a08' : '#c8ff00' }}
            />
            <span style={{ color: hovered ? '#0a0a08' : '#c8ff00' }}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
