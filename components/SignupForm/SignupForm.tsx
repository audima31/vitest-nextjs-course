"use client"

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import ThemedButton from '@/components/ThemedButton/ThemedButton'

function assessEmail(email: string): string[] {
  const issues: string[] = []

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    issues.push("Enter a valid email address")
  }

  return issues
}

// very basic example rules
function assessPassword(pw: string): string[] {
  const issues: string[] = []

  if (pw.length < 8) issues.push("At least 8 characters")
  if (!/[A-Z]/.test(pw)) issues.push("Add an uppercase letter")
  if (!/[a-z]/.test(pw)) issues.push("Add a lowercase letter")
  if (!/[0-9]/.test(pw)) issues.push("Add a number")
  if (!/[^A-Za-z0-9]/.test(pw)) issues.push("Add a symbol")

  return issues
}

export interface SignupFormProps {
  onSubmit?: (email: string, password: string ) => void
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailIssues = assessEmail(email)
  const passwordIssues = assessPassword(password)
  const isValid = emailIssues.length === 0 && passwordIssues.length === 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isValid) {
      if (onSubmit) onSubmit(email, password)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={email &&emailIssues.length > 0 ? 'input-error' : ''}
          required
        />
        {email && emailIssues.length > 0 && (
          <ul className="password-issues" aria-label="Email issues">
            {emailIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={password && passwordIssues.length > 0 ? 'input-error' : ''}
          required
        />
        {password && passwordIssues.length > 0 && (
          <ul className="password-issues" aria-label="Password issues">
            {passwordIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        )}
      </div>

      <ThemedButton type="submit" disabled={!isValid}>
        Submit
      </ThemedButton>
    </form>
  )
}
