// src/components/ui/ProjectCard.tsx
'use client'

import { Project } from '@/types'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div className={`group relative bg-white dark:bg-secondary-800 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-secondary-100 dark:border-secondary-700 hover:border-primary-200 dark:hover:border-primary-600 hover:-translate-y-3 ${
      featured ? 'lg:col-span-2' : ''
    }`}>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        
        {/* Overlay Links */}
        <div className="absolute inset-0 z-20 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 dark:bg-secondary-800/90 p-3 rounded-full hover:scale-110 transition-transform duration-200 hover:bg-primary-600 hover:text-white"
              aria-label="View live project"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 dark:bg-secondary-800/90 p-3 rounded-full hover:scale-110 transition-transform duration-200 hover:bg-primary-600 hover:text-white"
              aria-label="View source code"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-medium bg-primary-600 text-white rounded-full capitalize shadow-lg">
            {project.category === 'ai' ? 'AI & ML' :
             project.category === 'fullstack' ? 'Full Stack' :
             project.category === 'blockchain' ? 'Blockchain' :
             project.category === 'mobile' ? 'Mobile' : project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-medium bg-accent-600 text-white rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(project.completedAt)}
        </div>

        {/* Title */}
        <Link href={`/projects/${project.id}`} className="block">
          <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 hover:underline">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-4 group-hover:text-secondary-800 dark:group-hover:text-secondary-100 transition-colors duration-300">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (featured ? 6 : 4) && (
            <span className="px-2 py-1 text-xs font-medium bg-secondary-200 dark:bg-secondary-600 text-secondary-600 dark:text-secondary-400 rounded">
              +{project.technologies.length - (featured ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.id}`}
            className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 hover:underline"
          >
            Learn More →
          </Link>
          
          <div className="flex space-x-2">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-primary-600 transition-colors duration-300 hover:scale-110"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-primary-600 transition-colors duration-300 hover:scale-110"
                aria-label="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}