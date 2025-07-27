// src/components/layout/Header.tsx
'use client'

import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'
import { Navigation } from './Navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-200',
        isScrolled
          ? 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-secondary-200/20 dark:border-secondary-700/20'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-secondary-900 dark:text-white hover:text-primary-600 transition-colors"
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Navigation />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}