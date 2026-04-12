'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { num: 3,   suffix: '',   label: 'Founding Designers' },
  { num: 40,  suffix: '+',  label: 'Projects Delivered' },
  { num: 12,  suffix: '',   label: 'Industry Awards'    },
  { num: 100, suffix: '%',  label: 'Intent-Led'         },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const duration = 1600

          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 4)
            setValue(Math.round(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {value}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      className="py-40 px-site border-t"
      style={{ borderColor: 'rgba(240,237,230,0.1)' }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        {STATS.map(s => (
          <div
            key={s.label}
            className="flex flex-col border-l-2 pl-6 py-8"
            style={{ borderColor: '#c8ff00' }}
          >
            <span
              className="mb-2"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(48px,6vw,80px)',
                fontWeight: 300,
                lineHeight: 1,
                color: '#c8ff00',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <CountUp end={s.num} suffix={s.suffix} />
            </span>
            <span
              className="uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#5a5a52' }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
