'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { POSTS } from '@/lib/data'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-end pt-40 px-site pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(200,255,0,0.04), transparent 50%)' }}
        />
        {['The', 'Journal.'].map((word, i) => (
          <div key={word} className="word-wrap block">
            <motion.h1
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(64px,11vw,160px)',
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: word === 'Journal.' ? '#c8ff00' : '#f0ede6',
                fontStyle: word === 'Journal.' ? 'italic' : 'normal',
              }}
            >
              {word}
            </motion.h1>
          </div>
        ))}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 uppercase tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: '#5a5a52' }}
        >
          Thinking out loud on design, AI, and human intent
        </motion.p>
      </section>

      {/* Posts */}
      <section
        className="py-24 px-site border-t"
        style={{ borderColor: 'rgba(240,237,230,0.1)' }}
      >
        <div className="flex flex-col">
          {POSTS.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-12 border-b group"
                style={{ borderColor: 'rgba(240,237,230,0.08)' }}
              >
                <div className="flex-1">
                  <div
                    className="mb-3 flex items-center gap-4"
                    style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, letterSpacing: '0.15em', color: '#5a5a52', textTransform: 'uppercase' }}
                  >
                    <span>{post.publishedAt}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2
                    className="mb-3 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 300, lineHeight: 1.2 }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, lineHeight: 1.9, color: '#5a5a52', maxWidth: 560 }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-black text-lg opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 rotate-[-45deg] group-hover:rotate-0 transition-all duration-400"
                  style={{ background: '#c8ff00' }}
                >
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
