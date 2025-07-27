// src/components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { forwardRef, ButtonHTMLAttributes } from 'react'

// Simple button variants without cva for now
const buttonVariants = {
  variant: {
    default: 'bg-primary-600 text-white hover:bg-primary-700',
    destructive: 'bg-accent-600 text-white hover:bg-accent-700',
    outline: 'border border-secondary-300 hover:bg-secondary-50 hover:text-secondary-900',
    secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300',
    ghost: 'hover:bg-secondary-100 hover:text-secondary-900',
    link: 'underline-offset-4 hover:underline text-primary-600',
  },
  size: {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  },
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'