'use client'

import React from 'react'

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
  children: React.ReactNode
}

export default function ThemedButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ThemedButtonProps) {
  const variantClass = `btn-${variant}`
  const classes = `btn ${variantClass} ${className}`.trim()

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export type { ThemedButtonProps }