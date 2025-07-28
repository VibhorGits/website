// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { personalInfo } from '@/data/personal'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema (same as frontend)
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

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes

  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Email template
function createEmailTemplate(data: z.infer<typeof contactSchema>) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #1e40af;
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 5px;
          display: block;
        }
        .field-value {
          background: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
        }
        .message-field {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
        }
        .timestamp {
          color: #9ca3af;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p class="timestamp">Received on ${new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}</p>
        </div>
        
        <div class="field">
          <span class="field-label">👤 Name:</span>
          <div class="field-value">${data.name}</div>
        </div>
        
        <div class="field">
          <span class="field-label">📧 Email:</span>
          <div class="field-value">
            <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
              ${data.email}
            </a>
          </div>
        </div>
        
        <div class="field">
          <span class="field-label">📋 Subject:</span>
          <div class="field-value">${data.subject}</div>
        </div>
        
        <div class="field">
          <span class="field-label">💬 Message:</span>
          <div class="message-field">${data.message}</div>
        </div>
        
        <div class="footer">
          <p><strong>Quick Actions:</strong></p>
          <p>
            • <a href="mailto:${data.email}?subject=Re: ${data.subject}" style="color: #3b82f6;">Reply directly</a><br>
            • <a href="mailto:${data.email}" style="color: #3b82f6;">Send new email</a>
          </p>
          <p style="margin-top: 20px;">
            This message was sent through the contact form on your portfolio website.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@vibhor-portfolio.com',
      to: [personalInfo.email],
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: createEmailTemplate(validatedData),
      replyTo: validatedData.email,
    })

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    // Log successful submission (in production, consider using proper logging)
    console.log(`Contact form submission from ${validatedData.email} - Subject: ${validatedData.subject}`)

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        id: emailResult.data?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid form data',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}