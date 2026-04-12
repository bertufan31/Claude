'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/data'

const CATEGORIES = ['All', 'UI/UX', 'Research', 'AI', 'Intent']

const PROJECT_SVGS: Record<string, string> = {
  meridian: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#0f0f0d"/><defs><radialGradient id="g1" cx="30%" cy="60%" r="70%"><stop offset="0%" stop-color="#c8ff00" stop-opacity="0.18"/><stop offset="100%" stop-color="#0a0a08" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#g1)"/><circle cx="160" cy="280" r="120" fill="none" stroke="rgba(200,255,0,0.08)" stroke-width="1"/><circle cx="160" cy="280" r="60" fill="rgba(200,255,0,0.1)"/><text x="400" y="270" font-family="serif" font-size="72" fill="rgba(240,237,230,0.05)" text-anchor="middle" font-style="italic">Meridian</text></svg>`,
  threshold: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#070809"/><rect x="80" y="100" width="140" height="220" rx="3" fill="rgba(200,255,0,0.06)" stroke="rgba(200,255,0,0.1)" stroke-width="1"/><rect x="250" y="60" width="140" height="290" rx="3" fill="rgba(200,255,0,0.08)" stroke="rgba(200,255,0,0.12)" stroke-width="1"/><rect x="420" y="40" width="140" height="330" rx="3" fill="rgba(200,255,0,0.1)" stroke="rgba(200,255,0,0.15)" stroke-width="1"/><text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Threshold</text></svg>`,
  'orion-agent': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#080a0c"/><circle cx="400" cy="250" r="180" fill="none" stroke="rgba(200,255,0,0.05)" stroke-width="1"/><circle cx="400" cy="250" r="120" fill="none" stroke="rgba(200,255,0,0.04)" stroke-width="1"/><circle cx="400" cy="250" r="60" fill="none" stroke="rgba(200,255,0,0.08)" stroke-width="1"/><circle cx="300" cy="187" r="6" fill="rgba(200,255,0,0.8)"/><text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Orion</text></svg>`,
  atlas: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#080a08"/><circle cx="400" cy="250" r="200" fill="none" stroke="rgba(200,255,0,0.04)" stroke-width="1"/><circle cx="400" cy="250" r="140" fill="none" stroke="rgba(200,255,0,0.04)" stroke-width="1"/><circle cx="400" cy="250" r="80" fill="none" stroke="rgba(200,255,0,0.07)" stroke-width="1"/><circle cx="400" cy="250" r="40" fill="rgba(200,255,0,0.06)"/><text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Atlas</text></svg>`,
  'luma-health': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#0a0a0d"/><defs><radialGradient id="gl" cx="50%" cy="70%" r="60%"><stop offset="0%" stop-color="#c8ff00" stop-opacity="0.18"/><stop offset="100%" stop-color="#0a0a08" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#gl)"/><circle cx="400" cy="250" r="100" fill="rgba(200,255,0,0.08)" stroke="rgba(200,255,0,0.2)" stroke-width="1"/><text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Luma</text></svg>`,
  forma: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#09090b"/><rect x="40" y="40" width="200" height="140" rx="6" fill="rgba(200,255,0,0.05)" stroke="rgba(200,255,0,0.1)" stroke-width="1"/><rect x="260" y="40" width="300" height="300" rx="6" fill="rgba(200,255,0,0.07)" stroke="rgba(200,255,0,0.12)" stroke-width="1"/><circle cx="410" cy="190" r="60" fill="rgba(200,255,0,0.08)"/><text x="400" y="460" font-family="serif" font-size="56" fill="rgba(240,237,230,0.04)" text-anchor="middle" font-style="italic">Forma</text></svg>`,
}

function ProjectCard({ project }: { project: Project }) {
  const svg = PROJECT_SVGS[project.slug] ?? PROJECT_SVGS['meridian']

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="group relative border overflow-hidden"
      style={{ borderColor: 'rgba(240,237,230,0.08)' }}
      data-cursor="view"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <div
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'rgba(200,255,0,0.05)' }}
        />
        {/* Rotating CTA */}
        <div
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center text-black text-base scale-0 rotate-[-45deg] group-hover:scale-100 group-hover:rotate-0 transition-all duration-400"
          style={{ background: '#c8ff00' }}
        >
          →
        </div>
      </div>

      {/* Info */}
      <div className="p-7">
        <div className="flex items-center justify-between mb-3">
          <span
            className="uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#c8ff00' }}
          >
            {project.category.join(' · ')}
          </span>
          <span
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#5a5a52' }}
          >
            {project.year}
          </span>
        </div>
        <h3
          className="mb-2"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 300 }}
        >
          {project.title}
        </h3>
        <p
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, lineHeight: 1.8, color: '#5a5a52' }}
        >
          {project.tagline}
        </p>
      </div>

      {/* Full card link */}
      <Link href={`/works/${project.slug}`} className="absolute inset-0" aria-label={project.title} />
    </motion.div>
  )
}

export default function WorksGrid() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(active))

  return (
    <div>
      {/* Filter bar */}
      <div
        className="flex items-center gap-2 px-site py-8 border-b"
        style={{ borderColor: 'rgba(240,237,230,0.1)' }}
      >
        <span
          className="mr-4 uppercase tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#5a5a52' }}
        >
          Filter
        </span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-5 py-2 border text-[10px] uppercase tracking-[0.1em] transition-all duration-200"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              borderColor: active === cat ? '#c8ff00' : 'rgba(240,237,230,0.1)',
              background: active === cat ? '#c8ff00' : 'transparent',
              color: active === cat ? '#0a0a08' : '#5a5a52',
              cursor: 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0.5 p-0.5 px-site py-16"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(p => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
