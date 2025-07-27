// src/app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
    </>
  )
}