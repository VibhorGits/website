// src/components/sections/Skills.tsx
'use client'

import { skills, skillCategories } from '@/data/skills'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useState } from 'react'

export function Skills() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Object.keys(skillCategories)]
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-700 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-8"></div>
            <p className="text-secondary-600 dark:text-secondary-300 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and areas of expertise
            </p>
          </div>

          {/* Category Filter */}
          <div
            className={`transition-all duration-700 delay-200 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-700 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {category === 'all' ? 'All Skills' : skillCategories[category as keyof typeof skillCategories]}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div
            className={`transition-all duration-700 delay-400 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Skill Name */}
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 transition-all duration-300">
                    {skillCategories[skill.category]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}