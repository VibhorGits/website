// src/components/sections/Hero.tsx
'use client'

import { personalInfo, heroStats } from '@/data/personal'
import { Button } from '@/components/ui/Button'
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Hero() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <div
            className={`transition-all duration-700 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 hover:scale-105 transition-transform duration-300">
              Hello, I'm
            </p>
          </div>

          {/* Name */}
          <div
            className={`transition-all duration-700 delay-200 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-500 cursor-default">
              {personalInfo.name}
            </h1>
          </div>

          {/* Title */}
          <div
            className={`transition-all duration-700 delay-400 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary-600 dark:text-primary-400 font-semibold mb-2 hover:scale-105 transition-transform duration-300 cursor-default">
              {personalInfo.title}
            </h2>
            <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-300 mb-8 hover:text-secondary-800 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
              {personalInfo.subtitle}
            </p>
          </div>

          {/* Description */}
          <div
            className={`transition-all duration-700 delay-600 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-secondary-700 dark:text-secondary-300 text-lg max-w-3xl mx-auto mb-12 leading-relaxed hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
              {personalInfo.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transition-all duration-700 delay-800 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/projects" className="group">
                <Button size="lg" className="min-w-[160px] hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    View My Work
                  </span>
                </Button>
              </Link>
              <Link href="/contact" className="group">
                <Button variant="outline" size="lg" className="min-w-[160px] hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Get In Touch
                  </span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="min-w-[160px] hover:scale-105 hover:shadow-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 group"
                onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Resume
                </span>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`transition-all duration-700 delay-1000 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex justify-center space-x-6 mb-12">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="group text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 group-hover:animate-pulse" />
              </Link>
              <Link
                href="https://github.com/VibhorGits"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
              <Link
                href="https://linkedin.com/in/vibhor-bhatt"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`transition-all duration-700 delay-1200 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center group cursor-default hover:scale-110 transition-all duration-300 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-secondary-800/50">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-125 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-800 dark:group-hover:text-secondary-200 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`transition-all duration-700 delay-1400 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={scrollToAbout}
              className="text-secondary-400 hover:text-primary-600 transition-all duration-300 animate-bounce hover:scale-125 hover:animate-pulse group"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="w-6 h-6 mx-auto group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}