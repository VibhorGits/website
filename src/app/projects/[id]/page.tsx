// src/app/projects/[id]/page.tsx
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ProjectPageProps {
  params: { id: string }
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 bg-white dark:bg-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/projects" className="group">
              <Button 
                variant="ghost" 
                className="hover:scale-105 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="group-hover:-translate-x-1 transition-transform duration-300">
                  Back to Projects
                </span>
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary-600 text-white rounded-full capitalize">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-sm font-medium bg-accent-600 text-white rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default">
              {project.title}
            </h1>
            
            <div className="flex items-center text-secondary-600 dark:text-secondary-300 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Completed {formatDate(project.completedAt)}</span>
            </div>

            <p className="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
              {project.description}
            </p>
          </div>

          {/* Project Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-12 group">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>

          {/* Project Details */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default">
                Project Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-300 cursor-default">
                  {project.longDescription}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="bg-secondary-50 dark:bg-secondary-700/50 p-6 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-full border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group">
                    <Button className="w-full hover:scale-105 transition-all duration-300 group">
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        View Live Demo
                      </span>
                    </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group">
                    <Button variant="outline" className="w-full hover:scale-105 transition-all duration-300 group">
                      <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        View Source Code
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}