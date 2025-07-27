// src/components/layout/Footer.tsx
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  Github,
  Linkedin,
  Mail,
} as const

export function Footer() {
  return (
    <footer className="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 max-w-md">
              Passionate about building scalable solutions and contributing to
              open source communities.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary-900 dark:text-white uppercase tracking-wide">
              Location
            </h4>
            <p className="text-secondary-600 dark:text-secondary-300">
              {SITE_CONFIG.location}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary-900 dark:text-white uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.url.startsWith('http') ? 'noopener noreferrer' : undefined
                    }
                    className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-center text-secondary-600 dark:text-secondary-400 text-sm">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}