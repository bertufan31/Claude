import Hero         from '@/components/home/Hero'
import Marquee      from '@/components/home/Marquee'
import ServicesPin  from '@/components/home/ServicesPin'
import WorksPreview from '@/components/home/WorksPreview'
import ContactCTA   from '@/components/home/ContactCTA'
import Footer       from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ServicesPin />
      <WorksPreview />
      <ContactCTA />
      <Footer />
    </main>
  )
}
