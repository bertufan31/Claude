import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Studio3.design — Intent-Led Experiences',
  description:
    'Three designers. One obsession. We build experiences that begin with purpose and end with meaning.',
  openGraph: {
    title: 'Studio3.design',
    description: 'Intent-Led Design, UI/UX Systems, Agentic AI',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Syne:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Scroll progress bar */}
        <div id="scroll-progress" aria-hidden="true" />

        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
