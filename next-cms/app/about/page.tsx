'use client'

import { motion } from 'framer-motion'
import Founders from '@/components/about/Founders'
import Stats    from '@/components/about/Stats'
import Footer   from '@/components/Footer'

const HEADLINE_WORDS = ['Three', 'minds,', 'one', 'intent.']

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[65vh] flex flex-col justify-end pt-40 px-[8.33vw] pb-20 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(200,255,0,0.05), transparent 60%)' }}
        />

        <h1
          className="relative z-10"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(60px,10vw,150px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
          }}
          aria-label={HEADLINE_WORDS.join(' ')}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={word} className="word-wrap block">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                style={word === 'intent.' ? { color: '#c8ff00', fontStyle: 'italic' } : {}}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </section>

      {/* Story */}
      <section
        className="py-32 px-[8.33vw] border-t"
        style={{ borderColor: 'rgba(240,237,230,0.1)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {[
              'Studio3.design was founded on a belief that has guided every project since: <strong>design without intent is decoration.</strong>',
              'We are three designers who met at the intersection of craft and cognition — where the way something works is inseparable from the way it feels.',
              'Our practice centres on <strong>intent-led experience design</strong> — a methodology that starts not with wireframes or user stories, but with a deep excavation of what people actually want to accomplish, and why.',
              'We work with early-stage startups, scaling platforms, and enterprise teams who believe that <strong>the quality of the experience is the quality of the product.</strong>',
            ].map((text, i) => (
              <p
                key={i}
                className="mb-6 last:mb-0 leading-relaxed"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 14, color: '#5a5a52', lineHeight: 2 }}
                dangerouslySetInnerHTML={{ __html: text.replace(/<strong>/g, '<strong style="color:#f0ede6;font-weight:400">') }}
              />
            ))}
          </motion.div>

          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-center"
          >
            <blockquote
              className="border-l-2 pl-8"
              style={{ borderColor: '#c8ff00' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(28px,3.5vw,48px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: '#f0ede6',
                }}
              >
                &ldquo;Intent is not a feature — it&apos;s a <span style={{ color: '#c8ff00' }}>philosophy.</span>&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      <Stats />
      <Founders />
      <Footer />
    </main>
  )
}
