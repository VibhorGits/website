// src/app/projects/page.tsx
import { Metadata } from 'next'
import { ProjectsClient } from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects - Vibhor\'s Portfolio',
  description: 'Explore my portfolio of AI, blockchain, full-stack, and mobile development projects. See my work in machine learning, web development, and innovative technology solutions.',
  keywords: ['projects', 'portfolio', 'AI', 'blockchain', 'full-stack', 'mobile development', 'machine learning', 'web development'],
  openGraph: {
    title: 'Projects - Vibhor\'s Portfolio',
    description: 'Explore my portfolio of AI, blockchain, full-stack, and mobile development projects.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}