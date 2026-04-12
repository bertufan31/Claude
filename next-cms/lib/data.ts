// Static fallback data — used when Sanity is not configured
// Once you add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local, live CMS data takes over.

export type Project = {
  _id: string
  title: string
  slug: string
  category: string[]
  year: string
  tagline: string
  description: string
  featured: boolean
  colorAccent: string
}

export type Post = {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: string
}

export type Founder = {
  _id: string
  name: string
  role: string
  bio: string
  imagePath: string
}

export type Service = {
  num: string
  name: string
  tag: string
  description: string
}

export const SERVICES: Service[] = [
  {
    num: '01',
    name: 'Intent Mapping',
    tag: 'Core Offering',
    description:
      'Before a single wireframe, we excavate the gap between stated intent and latent need. The output is a behavioural map that every design decision traces back to.',
  },
  {
    num: '02',
    name: 'UI/UX Systems',
    tag: 'Design',
    description:
      'Component libraries, design systems, and product interfaces built at the intersection of craft and cognition — where every state, every motion, every word earns its place.',
  },
  {
    num: '03',
    name: 'AI Experience Design',
    tag: 'Emerging Tech',
    description:
      'AI can feel magical or mechanical. We design the in-between — agentic interfaces that communicate uncertainty, build trust, and guide users without overwhelming them.',
  },
  {
    num: '04',
    name: 'Behavioural Research',
    tag: 'Research',
    description:
      'Mixed-method research that listens to what people do, not just what they say. Ethnographic studies, usability testing, and data synthesis that drives decision-making.',
  },
  {
    num: '05',
    name: 'Agentic Interfaces',
    tag: 'Frontier',
    description:
      'Multi-agent systems need UX too. We design the scaffolding of transparency, control, and trust that makes autonomous AI systems feel collaborative, not chaotic.',
  },
]

export const PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Meridian',
    slug: 'meridian',
    category: ['UI/UX', 'Intent'],
    year: '2024',
    tagline: 'Financial clarity for complex lives',
    description:
      'End-to-end product design for a personal finance platform. Intent mapping revealed users didn\'t want to "manage money" — they wanted to stop worrying about it.',
    featured: true,
    colorAccent: 'rgba(200,255,0,0.15)',
  },
  {
    _id: '2',
    title: 'Threshold',
    slug: 'threshold',
    category: ['Intent', 'Research'],
    year: '2024',
    tagline: 'Brand & system for a Series B fintech',
    description:
      'Full brand identity, design system, and product interface. Every touchpoint mapped back to user intent archetypes uncovered in 6 weeks of deep research.',
    featured: true,
    colorAccent: 'rgba(200,255,0,0.12)',
  },
  {
    _id: '3',
    title: 'Orion Agent',
    slug: 'orion-agent',
    category: ['AI', 'UI/UX'],
    year: '2023',
    tagline: 'Conversational UI for multi-agent AI',
    description:
      'Designing transparency and trust into an autonomous AI system. Users needed to understand what the agent was doing without needing to understand how.',
    featured: true,
    colorAccent: 'rgba(200,255,0,0.1)',
  },
  {
    _id: '4',
    title: 'Atlas Navigation',
    slug: 'atlas',
    category: ['AI', 'Intent'],
    year: '2024',
    tagline: 'Wayfinding for a multi-modal transit network',
    description:
      'Agentic AI infers destination intent before the user finishes typing. The interface dissolves when it\'s working — users feel guided, not managed.',
    featured: false,
    colorAccent: 'rgba(200,255,0,0.08)',
  },
  {
    _id: '5',
    title: 'Luma Health',
    slug: 'luma-health',
    category: ['Research', 'UI/UX'],
    year: '2023',
    tagline: 'Patient-facing health app',
    description:
      'Research-led design for complex medical intent. Patients don\'t want "health management" — they want to feel in control of a frightening experience.',
    featured: false,
    colorAccent: 'rgba(200,255,0,0.11)',
  },
  {
    _id: '6',
    title: 'Forma Design System',
    slug: 'forma',
    category: ['UI/UX'],
    year: '2023',
    tagline: '500-component system, intent-first',
    description:
      'Built on intent-first principles for a Series A SaaS company. The system encodes behavioural logic into every component so product teams can\'t accidentally build confusion.',
    featured: false,
    colorAccent: 'rgba(200,255,0,0.13)',
  },
]

export const POSTS: Post[] = [
  {
    _id: '1',
    title: 'The Difference Between UX and Intent Design',
    slug: 'ux-vs-intent-design',
    excerpt:
      'UX is about removing friction. Intent design is about understanding why the friction exists in the first place — and sometimes deciding to keep it.',
    publishedAt: '2024-11-12',
    readTime: '6 min',
  },
  {
    _id: '2',
    title: 'Designing for AI Agents: A New Vocabulary',
    slug: 'designing-for-ai-agents',
    excerpt:
      'When the interface is an agent, the old interaction models break. We need new words — and new mental models — for designing AI-native experiences.',
    publishedAt: '2024-10-28',
    readTime: '9 min',
  },
  {
    _id: '3',
    title: 'Why We Always Start with Behavioural Research',
    slug: 'start-with-research',
    excerpt:
      'Every project that skipped research taught us something expensive. Here\'s what we learned, and why we\'ve made research non-negotiable.',
    publishedAt: '2024-09-14',
    readTime: '5 min',
  },
]

export const FOUNDERS: Founder[] = [
  {
    _id: '1',
    name: 'Kuljit Kondral',
    role: 'Research Director',
    bio: 'The oracle of insight. With 14 years decoding human behaviour, Kuljit lives and breathes the Double Diamond — diverging into chaos, converging into clarity. He doesn\'t just read data, he hears it. Our resident futures thinker, he maps where the world is going before anyone else has thought to look.',
    imagePath: '/images/founder-kuljit.jpg',
  },
  {
    _id: '2',
    name: 'Tolga Inam',
    role: 'Head of Tech & UX',
    bio: 'Two decades of building things that actually work — then making them beautiful. Tolga is our Dungeon Master: he architects the dungeons (systems), writes the rules (logic), and somehow always has a clever spell ready when the demo breaks. His command of AI and web tech is, frankly, unfair.',
    imagePath: '/images/founder-tolga.png',
  },
  {
    _id: '3',
    name: 'Baris Ertufan',
    role: 'Visual Director',
    bio: 'What happens when a gamer becomes a designer? You get someone who thinks in levels, not pages — who treats every screen as a world to be rendered and every interaction as a reward loop. With 14 years of digital UI craft, Baris builds animated bridges between raw vision and pixel-perfect reality.',
    imagePath: '/images/founder-baris.png',
  },
]
