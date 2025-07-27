// src/lib/constants.ts
import { NavItem } from '@/types'

export const SITE_CONFIG = {
  name: 'Vibhor Bhatt',
  title: 'Vibhor Bhatt - Software Developer',
  description:
    'Passionate Software Developer specializing in Machine Learning, Blockchain, and Full Stack development. Building scalable solutions and contributing to open source.',
  url: process.env.NODE_ENV === 'production' ? 'https://vibhorbhatt.dev' : 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  author: 'Vibhor Bhatt',
  email: 'bhattvibhor123@gmail.com',
  location: 'Dehradun, India',
  github: 'https://github.com/VibhorGits',
  linkedin: 'https://linkedin.com/in/vibhor-bhatt',
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export const SKILL_CATEGORIES = [
  'Data Structures',
  'Version Control',
  'Algorithms Analysis',
  'Database Management',
  'Operating Systems',
  'Object Oriented (OOP)',
  'Machine Learning',
  'Computer Architecture',
  'Artificial Intelligence',
  'Generative AI',
]

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: SITE_CONFIG.github, icon: 'Github' },
  { name: 'LinkedIn', url: SITE_CONFIG.linkedin, icon: 'Linkedin' },
  { name: 'Email', url: `mailto:${SITE_CONFIG.email}`, icon: 'Mail' },
]