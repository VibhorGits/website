// src/components/sections/About.tsx
'use client'

import { personalInfo } from '@/data/personal'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Code, Heart, Users } from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: 'Technical Excellence',
    description: 'Passionate about writing clean, efficient code and staying updated with the latest technologies.',
  },
  {
    icon: Heart,
    title: 'Open Source Love',
    description: 'Active contributor to open source projects, believing in collaborative development.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Experienced in working with cross-functional teams to deliver exceptional results.',
  },
]

export function About() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" className="py-20 bg-white dark:bg-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-700 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-700 delay-200 ${
                hasIntersected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6 hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
                  {personalInfo.description}
                </p>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
                  {personalInfo.longDescription}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div
              className={`transition-all duration-700 delay-400 ${
                hasIntersected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 p-4 rounded-lg bg-secondary-50 dark:bg-secondary-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <highlight.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-secondary-800 dark:group-hover:text-secondary-100 transition-colors duration-300">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}