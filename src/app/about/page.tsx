// src/app/about/page.tsx
import { Metadata } from 'next'
import { About } from '@/components/sections/About'

export const metadata: Metadata = {
  title: 'About - Vibhor\'s Portfolio',
  description: 'Learn more about Vibhor - a passionate full-stack developer specializing in AI, blockchain, and modern web technologies. Discover my journey, skills, and approach to software development.',
  keywords: ['about', 'developer', 'full-stack', 'AI', 'blockchain', 'web development', 'software engineer', 'portfolio'],
  openGraph: {
    title: 'About - Vibhor\'s Portfolio',
    description: 'Learn more about Vibhor - a passionate full-stack developer specializing in AI, blockchain, and modern web technologies.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <About />
}