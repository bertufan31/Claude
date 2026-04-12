'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

const HEADLINE_WORDS = ['Design', 'driven', 'by', 'intent.']

// Scramble chars for eyebrow animation
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#.......…'

function scramble(el: HTMLElement, final: string) {
  let frame = 0
  const total = 22
  const id = setInterval(() => {
    el.textContent = final
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        if (frame / total > (i / final.length) * 1.4) return ch
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      })
      .join('')
    if (++frame >= total) { clearInterval(id); el.textContent = final }
  }, 35)
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const eyebrowRef  = useRef<HTMLSpanElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  // Parallax on scroll: grid drifts up faster than content
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const gridY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  // Trigger text reveal after mount
  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true)
      if (eyebrowRef.current) scramble(eyebrowRef.current, 'Studio3.design — Est. 2024')
    }, 150)
    return () => clearTimeout(t)
  }, [])

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')!
    let animId: number
    let mx = -200, my = -200

    const resize = () => {
      canvas.width  = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 120 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r:  Math.random() * 2.5 + 0.5,
    }))

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    section.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          const f = (140 - dist) / 140
          p.vx += (dx / dist) * f * 0.6
          p.vy += (dy / dist) * f * 0.6
        }
        p.vx *= 0.97; p.vy *= 0.97
        if (Math.abs(p.vx) < 0.18) p.vx += (Math.random() - 0.5) * 0.12
        if (Math.abs(p.vy) < 0.18) p.vy += (Math.random() - 0.5) * 0.12
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,255,0,${0.2 + p.r * 0.08})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove', onMove)
    }
  }, [])

  // Mouse spotlight
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--sx', `${x}%`)
    e.currentTarget.style.setProperty('--sy', `${y}%`)
  }

  const wordVariants: Variants = {
    hidden: { y: '115%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.9,
        delay: i * 0.10,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="hero-spotlight relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ padding: '0 8.33vw 80px' }}
    >
      {/* BG layers */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: gridY }}>
        {/* Grid */}
        <div
          className="hero-grid-drift absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(200,255,0,0.03) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Orbs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(200,255,0,0.07), transparent 70%)',
            filter: 'blur(100px)',
            top: -200, right: -100,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(200,255,0,0.05), transparent 70%)',
            filter: 'blur(80px)',
            bottom: 100, left: -80,
          }}
        />
        {/* Particles canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10" style={{ y: contentY }}>
        {/* Eyebrow */}
        <div
          className="mb-6"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, letterSpacing: '0.2em', color: '#c8ff00', textTransform: 'uppercase' }}
        >
          <span ref={eyebrowRef} className="blink">_</span>
        </div>

        {/* Headline — word mask reveal */}
        <h1
          className="mb-12"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(60px,8.5vw,136px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
          }}
          aria-label={HEADLINE_WORDS.join(' ')}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={word} className="word-wrap block">
              <motion.span
                className="block"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                style={word === 'intent.' ? { color: '#c8ff00' } : {}}
              >
                {word === 'intent.'
                  ? <em className="accent-glow not-italic">{word}</em>
                  : word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Bottom row */}
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <p
            className="max-w-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: '#5a5a52' }}
          >
            Three designers. One obsession.<br />
            We build experiences that begin with purpose and end with meaning.
          </p>
          <div
            className="flex flex-col items-center gap-3"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, letterSpacing: '0.15em', color: '#5a5a52', textTransform: 'uppercase' }}
          >
            <div
              className="animate-scroll-line"
              style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, #c8ff00, transparent)' }}
            />
            <span>Scroll</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
