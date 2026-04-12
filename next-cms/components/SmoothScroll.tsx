'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Sync Lenis with GSAP ticker so ScrollTrigger works with smooth scroll
    lenis.on('scroll', () => ScrollTrigger.update())
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Scroll progress bar
    const bar = document.getElementById('scroll-progress')
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (bar) bar.style.width = `${progress * 100}%`
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
    }
  }, [])

  return <>{children}</>
}
