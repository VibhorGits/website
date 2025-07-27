// src/types/index.ts
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl: string
  featured: boolean
  category: 'fullstack' | 'ai' | 'blockchain' | 'mobile'
  completedAt: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'tools' | 'other'
  proficiency: number
  icon?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}