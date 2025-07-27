// src/data/skills.ts
import { Skill } from '@/types'

export const skills: Skill[] = [
  // Core Programming
  { name: 'Data Structures', category: 'other', proficiency: 90 },
  { name: 'Algorithms Analysis', category: 'other', proficiency: 85 },
  { name: 'Object Oriented (OOP)', category: 'other', proficiency: 92 },
  
  // Development Tools
  { name: 'Version Control', category: 'tools', proficiency: 88 },
  { name: 'Database Management', category: 'backend', proficiency: 85 },
  { name: 'Operating Systems', category: 'other', proficiency: 80 },
  
  // AI/ML
  { name: 'Machine Learning', category: 'ai', proficiency: 87 },
  { name: 'Artificial Intelligence', category: 'ai', proficiency: 85 },
  { name: 'Generative AI', category: 'ai', proficiency: 82 },
  
  // System Design
  { name: 'Computer Architecture', category: 'other', proficiency: 78 },
  
  // Additional Skills (commonly expected)
  { name: 'JavaScript', category: 'frontend', proficiency: 90 },
  { name: 'Python', category: 'backend', proficiency: 88 },
  { name: 'React', category: 'frontend', proficiency: 90 },
  { name: 'Node.js', category: 'backend', proficiency: 85 },
  { name: 'TypeScript', category: 'frontend', proficiency: 88 },
]

export const skillCategories = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  ai: 'AI & Machine Learning',
  tools: 'Development Tools',
  other: 'Core Concepts',
}