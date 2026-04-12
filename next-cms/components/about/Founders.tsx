'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FOUNDERS } from '@/lib/data'

function FounderCard({ founder, index }: { founder: (typeof FOUNDERS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`
    el.style.transition = 'none'
  }
  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.76, 0, 0.24, 1] }}
      className="relative border p-12 overflow-hidden group"
      style={{ borderColor: 'rgba(240,237,230,0.08)', background: 'rgba(240,237,230,0.02)' }}
    >
      {/* Accent top border on hover */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
        style={{ background: '#c8ff00' }}
      />

      {/* Avatar */}
      <div
        className="relative mb-8 overflow-hidden"
        style={{ aspectRatio: '1/1', borderRadius: 4, border: '1px solid rgba(200,255,0,0.12)' }}
      >
        <Image
          src={founder.imagePath}
          alt={founder.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          // Fallback: if image is missing, show a gradient placeholder
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Placeholder gradient for if image fails */}
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 80%, rgba(200,255,0,0.12), transparent 70%)` }}
        />
      </div>

      <h3
        className="mb-2"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 400 }}
      >
        {founder.name}
      </h3>
      <div
        className="mb-6 uppercase tracking-[0.15em]"
        style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#c8ff00' }}
      >
        {founder.role}
      </div>
      <p
        style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, lineHeight: 1.9, color: '#5a5a52' }}
      >
        {founder.bio}
      </p>
    </motion.div>
  )
}

export default function Founders() {
  return (
    <section
      className="py-40 px-[8.33vw] border-t"
      style={{ borderColor: 'rgba(240,237,230,0.1)' }}
    >
      <div className="flex items-center gap-4 mb-20">
        <span style={{ width: 32, height: 1, background: '#c8ff00', display: 'inline-block' }} />
        <span
          className="uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#c8ff00' }}
        >
          The Three
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {FOUNDERS.map((f, i) => (
          <FounderCard key={f._id} founder={f} index={i} />
        ))}
      </div>
    </section>
  )
}
