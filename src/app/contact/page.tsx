// src/app/contact/page.tsx
import { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { personalInfo } from '@/data/personal'

export const metadata: Metadata = {
  title: 'Contact - Vibhor Bhatt | Get In Touch',
  description: `Get in touch with ${personalInfo.name}, a skilled full-stack developer specializing in AI, blockchain, and modern web technologies. Let's discuss your next project or collaboration opportunity.`,
  keywords: [
    'contact vibhor bhatt',
    'hire full stack developer',
    'web development services',
    'AI development consultation',
    'blockchain developer contact',
    'freelance developer',
    'project collaboration',
    'software development inquiry'
  ],
  openGraph: {
    title: 'Contact - Vibhor Bhatt | Get In Touch',
    description: `Ready to bring your ideas to life? Contact ${personalInfo.name} for web development, AI solutions, and blockchain projects. Let's create something amazing together.`,
    type: 'website',
    url: '/contact',
    images: [
      {
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Vibhor Bhatt - Full Stack Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Vibhor Bhatt | Get In Touch',
    description: `Ready to bring your ideas to life? Contact ${personalInfo.name} for web development, AI solutions, and blockchain projects.`,
    images: ['/images/contact-og.jpg']
  },
  alternates: {
    canonical: '/contact'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Vibhor Bhatt',
  description: `Contact page for ${personalInfo.name}, a full-stack developer specializing in AI, blockchain, and modern web technologies.`,
  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vibhor-portfolio.com'}/contact`,
  mainEntity: {
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.split(',')[0],
      addressCountry: personalInfo.location.split(',')[1]?.trim() || 'India'
    },
    sameAs: [
      'https://github.com/vibhor-bhatt',
      'https://linkedin.com/in/vibhor-bhatt',
      'https://twitter.com/vibhor_bhatt'
    ]
  },
  potentialAction: {
    '@type': 'CommunicateAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vibhor-portfolio.com'}/contact`,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform'
      ]
    }
  }
}

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Page content */}
      <main className="min-h-screen">
        {/* Hero section with breadcrumb */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                  <li>
                    <a 
                      href="/" 
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    >
                      Home
                    </a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-secondary-900 dark:text-white font-medium">Contact</span>
                  </li>
                </ol>
              </nav>

              {/* Page title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                Let's Work Together
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto leading-relaxed">
                Have an exciting project in mind? Whether it's web development, AI solutions, or blockchain innovation, 
                I'm here to help bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <Contact />

        {/* Additional CTA section */}
        <section className="py-16 bg-white dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
                From initial concept to final deployment, I'm committed to delivering exceptional results. 
                Let's discuss how we can make your project a success.
              </p>
              
              {/* Quick contact options */}
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <a
                  href={`mailto:${personalInfo.email}?subject=Project Inquiry`}
                  className="group p-6 bg-secondary-50 dark:bg-secondary-700 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    Quick Email
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-secondary-800 dark:group-hover:text-secondary-100 transition-colors duration-300">
                    Send me a direct email for urgent inquiries
                  </p>
                </a>

                <a
                  href="https://linkedin.com/in/vibhor-bhatt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-secondary-50 dark:bg-secondary-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    LinkedIn Connect
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-secondary-800 dark:group-hover:text-secondary-100 transition-colors duration-300">
                    Connect with me professionally
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}