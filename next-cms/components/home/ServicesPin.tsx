'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ServicesPin() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const panels = gsap.utils.toArray<HTMLElement>('.service-panel')
    const scrollAmount = track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: -scrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.6,
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      },
    })

    // Animate panel content as each one enters
    panels.forEach(panel => {
      const num  = panel.querySelector('.svc-ghost-num')
      const name = panel.querySelector('.svc-name')
      const desc = panel.querySelector('.svc-desc')
      const tag  = panel.querySelector('.svc-tag')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween,
          start: 'left 85%',
          end: 'left 20%',
          scrub: 1,
        },
      })

      tl.from(num,  { opacity: 0, y: 80,  duration: 1 }, 0)
        .from(name, { opacity: 0, y: 60,  duration: 1 }, 0.1)
        .from(desc, { opacity: 0, y: 40,  duration: 1 }, 0.2)
        .from(tag,  { opacity: 0, x: -20, duration: 0.8 }, 0.3)
    })

    // Progress line across bottom
    const line = document.querySelector('.svc-progress-fill')
    if (line) {
      gsap.to(line, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          scrub: true,
          end: () => `+=${scrollAmount}`,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="overflow-hidden" style={{ background: '#0a0a08' }}>
      {/* Section label */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-4 px-site pt-10 pointer-events-none">
        <span style={{ width: 32, height: 1, background: '#c8ff00', display: 'inline-block' }} />
        <span
          className="uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#c8ff00' }}
        >
          What We Do
        </span>
      </div>

      {/* Progress bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-px pointer-events-none"
        style={{ background: 'rgba(240,237,230,0.08)' }}
      >
        <div
          className="svc-progress-fill h-full origin-left"
          style={{ background: '#c8ff00', transform: 'scaleX(0)', boxShadow: '0 0 12px #c8ff00' }}
        />
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex will-change-transform">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            className="service-panel relative flex items-center px-site border-r"
            style={{ borderColor: 'rgba(240,237,230,0.06)' }}
          >
            {/* Ghost number background */}
            <div
              className="svc-ghost-num absolute pointer-events-none select-none"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(200px, 28vw, 400px)',
                fontWeight: 300,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(200,255,0,0.06)',
                lineHeight: 1,
                right: '5vw',
                bottom: '-0.1em',
              }}
            >
              {s.num}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[56vw]">
              <div
                className="svc-tag mb-8 inline-flex items-center gap-4"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#c8ff00', textTransform: 'uppercase' }}
              >
                <span style={{ width: 24, height: 1, background: '#c8ff00', display: 'inline-block' }} />
                {s.tag}
              </div>

              <h2
                className="svc-name mb-8"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(54px, 6.5vw, 110px)',
                  fontWeight: 300,
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.name}
              </h2>

              <p
                className="svc-desc leading-relaxed"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 14, color: '#5a5a52', maxWidth: 420, lineHeight: 2 }}
              >
                {s.description}
              </p>

              <div
                className="mt-12 flex items-center gap-3 group"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, letterSpacing: '0.15em', color: '#5a5a52', textTransform: 'uppercase', cursor: 'none' }}
              >
                <span
                  className="inline-block transition-all duration-300"
                  style={{ width: 32, height: 1, background: '#5a5a52' }}
                />
                Learn More
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
