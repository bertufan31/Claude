'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot   = dotRef.current
    const ring  = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
      label.style.left = mx + 'px'
      label.style.top  = my + 'px'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)

    // Interactive elements — expand ring
    const interactiveEls = document.querySelectorAll(
      'a, button, [data-cursor], .work-card-inner'
    )
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '60px'
        ring.style.height = '60px'
        dot.style.width   = '16px'
        dot.style.height  = '16px'
      })
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '40px'
        ring.style.height = '40px'
        dot.style.width   = '10px'
        dot.style.height  = '10px'
        label.classList.remove('show')
        dot.style.opacity = '1'
        ring.style.opacity = '0.6'
      })
    })

    // Work cards — show "View →" label
    document.querySelectorAll('[data-cursor="view"]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        label.textContent = 'View →'
        label.classList.add('show')
        dot.style.opacity  = '0'
        ring.style.opacity = '0'
      })
      el.addEventListener('mouseleave', () => {
        label.classList.remove('show')
        dot.style.opacity  = '1'
        ring.style.opacity = '0.6'
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"   aria-hidden="true" />
      <div ref={ringRef}  className="cursor-ring"  aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  )
}
