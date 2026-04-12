'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/',        label: 'Home'    },
  { href: '/works',   label: 'Works'   },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
  { href: '/blog',    label: 'Journal' },
]

export default function Nav() {
  const pathname = usePathname()
  const navRef   = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        const y = window.scrollY

        // Add/remove blur glass on scroll
        if (y > 60) {
          nav.classList.add('nav-scrolled')
        } else {
          nav.classList.remove('nav-scrolled')
        }

        // Smart hide/show: hide on scroll down, show on scroll up
        if (y > lastY.current && y > 120) {
          setVisible(false)
        } else {
          setVisible(true)
        }
        lastY.current = y
        ticking = false
      })
      ticking = true
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navRef}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.76,0,0.24,1), background 0.4s ease',
      }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[8.33vw] py-7"
    >
      <Link
        href="/"
        className="font-mono text-[13px] tracking-[0.05em] text-offwhite hover:text-accent transition-colors"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        Studio3<span className="text-accent">.design</span>
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex gap-10 list-none">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="relative font-mono text-[11px] tracking-[0.12em] uppercase transition-opacity duration-300"
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    opacity: active ? 1 : 0.45,
                    color: '#f0ede6',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.opacity = active ? '1' : '0.45'
                  }}
                >
                  {label}
                  <span
                    className="absolute bottom-[-3px] left-0 h-px bg-accent transition-all duration-300"
                    style={{ width: active ? '100%' : '0' }}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
