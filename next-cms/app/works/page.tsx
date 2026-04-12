import WorksGrid from '@/components/works/WorksGrid'
import Footer    from '@/components/Footer'

export const metadata = {
  title: 'Works — Studio3.design',
  description: 'Selected projects: intent in action.',
}

export default function WorksPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[55vh] flex flex-col justify-end pt-40 px-site pb-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg,rgba(200,255,0,0.02) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <h1
          className="relative z-10"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(72px,12vw,180px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
          }}
        >
          Selected<br />
          <em className="accent-glow not-italic" style={{ color: '#c8ff00' }}>Works</em>
        </h1>
        <p
          className="relative z-10 mt-8 uppercase tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: '#5a5a52' }}
        >
          Intent in action — {6} projects, one obsession
        </p>
      </section>

      <WorksGrid />
      <Footer />
    </main>
  )
}
