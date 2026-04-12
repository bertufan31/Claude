'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PROJECTS } from '@/lib/data'

// SVG placeholder image for each project (lime gradient art)
const PROJECT_SVGS = [
  // Meridian
  `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="#0f0f0d"/>
    <defs><radialGradient id="g1" cx="30%" cy="60%" r="70%"><stop offset="0%" stop-color="#c8ff00" stop-opacity="0.18"/><stop offset="100%" stop-color="#0a0a08" stop-opacity="0"/></radialGradient></defs>
    <rect width="800" height="500" fill="url(#g1)"/>
    <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(200,255,0,0.05)" stroke-width="1"/>
    <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(200,255,0,0.05)" stroke-width="1"/>
    <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(200,255,0,0.05)" stroke-width="1"/>
    <circle cx="160" cy="280" r="120" fill="none" stroke="rgba(200,255,0,0.08)" stroke-width="1"/>
    <circle cx="160" cy="280" r="60"  fill="rgba(200,255,0,0.1)"/>
    <text x="400" y="270" font-family="serif" font-size="72" fill="rgba(240,237,230,0.05)" text-anchor="middle" font-style="italic">Meridian</text>
  </svg>`,
  // Threshold
  `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="#070809"/>
    <defs><linearGradient id="g2" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stop-color="#c8ff00" stop-opacity="0.14"/><stop offset="50%" stop-color="#c8ff00" stop-opacity="0.04"/><stop offset="100%" stop-color="#c8ff00" stop-opacity="0.14"/></linearGradient></defs>
    <rect width="800" height="500" fill="url(#g2)"/>
    <rect x="80"  y="100" width="160" height="220" rx="3" fill="rgba(200,255,0,0.04)" stroke="rgba(200,255,0,0.08)" stroke-width="1"/>
    <rect x="270" y="70"  width="160" height="280" rx="3" fill="rgba(200,255,0,0.07)" stroke="rgba(200,255,0,0.12)" stroke-width="1"/>
    <rect x="460" y="50"  width="160" height="320" rx="3" fill="rgba(200,255,0,0.1)"  stroke="rgba(200,255,0,0.15)" stroke-width="1"/>
    <text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Threshold</text>
  </svg>`,
  // Orion
  `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="#080a0c"/>
    <defs><radialGradient id="g3" cx="65%" cy="40%" r="60%"><stop offset="0%" stop-color="#c8ff00" stop-opacity="0.12"/><stop offset="100%" stop-color="#0a0a08" stop-opacity="0"/></radialGradient></defs>
    <rect width="800" height="500" fill="url(#g3)"/>
    <circle cx="400" cy="250" r="180" fill="none" stroke="rgba(200,255,0,0.05)" stroke-width="1"/>
    <circle cx="400" cy="250" r="120" fill="none" stroke="rgba(200,255,0,0.04)" stroke-width="1"/>
    <circle cx="400" cy="250" r="60"  fill="none" stroke="rgba(200,255,0,0.08)" stroke-width="1"/>
    <circle cx="300" cy="187" r="6"   fill="rgba(200,255,0,0.8)"/>
    <text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Orion</text>
  </svg>`,
]

function ParallaxCard({
  project,
  index,
  svgStr,
}: {
  project: (typeof PROJECTS)[0]
  index: number
  svgStr: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Parallax: image moves upward faster than card
  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  // Slide in from alternating sides
  const fromX = index % 2 === 0 ? -60 : 60

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex gap-0 border overflow-hidden"
      style={{ borderColor: 'rgba(240,237,230,0.08)' }}
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      data-cursor="view"
    >
      {/* Image side (switches left/right) */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          width: '55%',
          order: index % 2 === 0 ? 0 : 1,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            y: imgY,
            height: '110%',
            marginTop: '-5%',
          }}
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'rgba(200,255,0,0.05)' }}
        />
      </div>

      {/* Info side */}
      <div
        className="flex flex-col justify-between p-10 flex-1"
        style={{ order: index % 2 === 0 ? 1 : 0 }}
      >
        <div>
          <div
            className="flex items-center justify-between mb-6"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, letterSpacing: '0.15em', color: '#c8ff00', textTransform: 'uppercase' }}
          >
            <span>{project.category.join(' · ')}</span>
            <span style={{ color: '#5a5a52' }}>{project.year}</span>
          </div>

          <h3
            className="mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,3.5vw,56px)', fontWeight: 300, lineHeight: 1.05 }}
          >
            {project.title}
          </h3>

          <p
            className="mb-8"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, lineHeight: 1.9, color: '#5a5a52' }}
          >
            {project.tagline}
          </p>

          <p
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, lineHeight: 1.9, color: '#5a5a52', opacity: 0.7 }}
          >
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-10">
          <Link
            href={`/works/${project.slug}`}
            className="inline-flex items-center gap-3 uppercase transition-colors duration-300 hover:text-accent"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, letterSpacing: '0.15em', color: '#5a5a52' }}
          >
            <span
              className="inline-block transition-all duration-300 group-hover:w-10"
              style={{ width: 24, height: 1, background: 'currentColor' }}
            />
            View Project
          </Link>

          {/* Rotating arrow CTA */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-black text-lg font-bold opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 rotate-[-45deg] group-hover:rotate-0 transition-all duration-400"
            style={{ background: '#c8ff00', cursor: 'none' }}
          >
            →
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorksPreview() {
  const featured = PROJECTS.filter(p => p.featured).slice(0, 3)

  return (
    <section
      className="py-40 px-[8.33vw] border-t"
      style={{ borderColor: 'rgba(240,237,230,0.1)' }}
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-20">
        <div className="flex items-center gap-4">
          <span style={{ width: 32, height: 1, background: '#c8ff00', display: 'inline-block' }} />
          <span
            className="uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#c8ff00' }}
          >
            Selected Works
          </span>
        </div>
        <Link
          href="/works"
          className="uppercase tracking-[0.15em] hover:text-accent transition-colors duration-300"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#5a5a52' }}
        >
          All Projects →
        </Link>
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-0.5">
        {featured.map((project, i) => (
          <ParallaxCard
            key={project._id}
            project={project}
            index={i}
            svgStr={PROJECT_SVGS[i] ?? PROJECT_SVGS[0]}
          />
        ))}
      </div>
    </section>
  )
}
