// src/components/sections/Contact.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { personalInfo } from '@/data/personal'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

// Form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/vibhor-bhatt',
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/vibhor-bhatt',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/vibhor_bhatt',
    color: 'hover:text-blue-400'
  }
]

export function Contact() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: ContactFormData) => {
    setFormState({ status: 'loading', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setFormState({
        status: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.'
      })
      reset()
    } catch (error) {
      setFormState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      })
    }
  }

  return (
    <section id="contact" className="py-20 bg-secondary-50 dark:bg-secondary-900">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full hover:w-32 transition-all duration-500 mb-6"></div>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div
              className={`transition-all duration-700 delay-200 ${
                hasIntersected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Let's Connect
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                        <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide">
                        Email
                      </p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-lg font-medium text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                        <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide">
                        Location
                      </p>
                      <p className="text-lg font-medium text-secondary-900 dark:text-white">
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700">
                  <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-4">
                    Follow Me
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-10 h-10 bg-secondary-100 dark:bg-secondary-700 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:scale-110 transition-all duration-300",
                          social.color
                        )}
                        aria-label={`Follow me on ${social.name}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-400 ${
                hasIntersected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Send Message
                </h3>

                {/* Form Status Messages */}
                {formState.status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-green-800 dark:text-green-200">{formState.message}</p>
                  </div>
                )}

                {formState.status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200">{formState.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300",
                        errors.name
                          ? "border-red-300 dark:border-red-600"
                          : "border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500"
                      )}
                      placeholder="Your full name"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300",
                        errors.email
                          ? "border-red-300 dark:border-red-600"
                          : "border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500"
                      )}
                      placeholder="your.email@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300",
                        errors.subject
                          ? "border-red-300 dark:border-red-600"
                          : "border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500"
                      )}
                      placeholder="What's this about?"
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-vertical",
                        errors.message
                          ? "border-red-300 dark:border-red-600"
                          : "border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500"
                      )}
                      placeholder="Tell me about your project or idea..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || formState.status === 'loading'}
                    className="w-full h-12 text-base font-medium hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
                  >
                    {isSubmitting || formState.status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}