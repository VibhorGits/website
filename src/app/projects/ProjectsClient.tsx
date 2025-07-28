// src/app/projects/ProjectsClient.tsx
'use client'

import { useState, useMemo } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Search, Filter, Grid, List } from 'lucide-react'

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai', label: 'AI & Machine Learning' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile Apps' },
]

export function ProjectsClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  return (
    <main className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-800 dark:to-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div
              ref={ref}
              className={`transition-all duration-700 ${
                hasIntersected
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
                My <span className="text-primary-600">Projects</span>
              </h1>
              <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed max-w-3xl mx-auto">
                A showcase of my work in AI, blockchain, full-stack development, and mobile applications. 
                Each project represents a unique challenge and innovative solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-secondary-900 border-b border-secondary-100 dark:border-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`transition-all duration-700 delay-200 ${
                hasIntersected
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects by name, description, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  aria-label="Search projects"
                />
              </div>

              {/* Category Filters and View Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                        selectedCategory === category.value
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-700 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      aria-label={`Filter by ${category.label}`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">View:</span>
                  <div className="flex bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-secondary-600 dark:text-secondary-400">
                {filteredProjects.length === 0 ? (
                  'No projects found matching your criteria'
                ) : (
                  `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              /* Empty State */
              <div
                className={`text-center py-16 transition-all duration-700 delay-400 ${
                  hasIntersected
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                  Try adjusting your search criteria or browse all projects.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                  <div
                    className={`transition-all duration-700 delay-400 ${
                      hasIntersected
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 flex items-center">
                      <span className="w-2 h-8 bg-primary-600 rounded-full mr-4"></span>
                      Featured Projects
                    </h2>
                    <div className={`grid gap-8 ${
                      viewMode === 'grid' 
                        ? 'md:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}>
                      {featuredProjects.map((project, index) => (
                        <div
                          key={project.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProjectCard project={project} featured />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Projects */}
                {regularProjects.length > 0 && (
                  <div
                    className={`transition-all duration-700 delay-600 ${
                      hasIntersected
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {featuredProjects.length > 0 && (
                      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 flex items-center">
                        <span className="w-2 h-8 bg-secondary-400 rounded-full mr-4"></span>
                        Other Projects
                      </h2>
                    )}
                    <div className={`grid gap-8 ${
                      viewMode === 'grid' 
                        ? 'md:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}>
                      {regularProjects.map((project, index) => (
                        <div
                          key={project.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${(index + featuredProjects.length) * 100}ms` }}
                        >
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}