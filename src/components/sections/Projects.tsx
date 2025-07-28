// src/components/sections/Projects.tsx
'use client'

import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Code, Sparkles } from 'lucide-react'

export function Projects() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })
  
  // Get featured projects for homepage display
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)

  return (
    <section className="py-20 bg-white dark:bg-secondary-900">
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
            <div className="flex items-center justify-center mb-4">
              <Code className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white">
                Featured Projects
              </h2>
              <Sparkles className="w-8 h-8 text-primary-600 ml-3" />
            </div>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-8"></div>
            <p className="text-secondary-600 dark:text-secondary-300 text-lg max-w-2xl mx-auto">
              Explore some of my most impactful projects spanning AI, blockchain, full-stack development, and mobile applications
            </p>
          </div>

          {/* Featured Projects Grid */}
          <div
            className={`transition-all duration-700 delay-200 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProjectCard project={project} featured />
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div
            className={`text-center transition-all duration-700 delay-400 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-secondary-800 dark:to-secondary-700 rounded-2xl p-8 border border-primary-100 dark:border-secondary-600">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                Want to see more?
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-6 max-w-2xl mx-auto">
                Discover my complete portfolio including AI projects, blockchain applications, 
                full-stack solutions, and mobile apps. Each project showcases different technologies and problem-solving approaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/projects">
                  <Button
                    variant="default"
                    size="lg"
                    className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View All Projects
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></span>
                  {projects.length} projects available
                </div>
              </div>
            </div>
          </div>

          {/* Project Categories Preview */}
          <div
            className={`mt-16 transition-all duration-700 delay-600 ${
              hasIntersected
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  category: 'ai', 
                  label: 'AI & ML', 
                  count: projects.filter(p => p.category === 'ai').length,
                  icon: '🤖',
                  color: 'from-blue-500 to-purple-600'
                },
                { 
                  category: 'blockchain', 
                  label: 'Blockchain', 
                  count: projects.filter(p => p.category === 'blockchain').length,
                  icon: '⛓️',
                  color: 'from-green-500 to-teal-600'
                },
                { 
                  category: 'fullstack', 
                  label: 'Full Stack', 
                  count: projects.filter(p => p.category === 'fullstack').length,
                  icon: '🌐',
                  color: 'from-orange-500 to-red-600'
                },
                { 
                  category: 'mobile', 
                  label: 'Mobile', 
                  count: projects.filter(p => p.category === 'mobile').length,
                  icon: '📱',
                  color: 'from-pink-500 to-rose-600'
                },
              ].map((cat, index) => (
                <Link
                  key={cat.category}
                  href={`/projects?category=${cat.category}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 border border-secondary-100 dark:border-secondary-700 hover:border-primary-200 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {cat.label}
                    </h4>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {cat.count} project{cat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}