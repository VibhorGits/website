// src/components/common/SEO.tsx
import Head from 'next/head'
import { SEOProps } from '@/types'

interface SEOComponentProps extends SEOProps {
  children?: React.ReactNode
}

export function SEO({
  title = 'Vibhor - Full Stack Developer & AI Enthusiast',
  description = 'Experienced full-stack developer specializing in AI, blockchain, and modern web technologies. Building innovative solutions with React, Next.js, Python, and more.',
  keywords = ['full-stack developer', 'AI', 'blockchain', 'React', 'Next.js', 'Python', 'web development'],
  ogImage = '/images/og-image.jpg',
  canonical,
  children
}: SEOComponentProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibhor-portfolio.com'
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Vibhor" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Vibhor's Portfolio" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {children}
    </Head>
  )
}