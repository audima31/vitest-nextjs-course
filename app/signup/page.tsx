"use client"

import { useRouter } from 'next/navigation'
import SignupForm from '@/components/SignupForm/SignupForm'

export default function Signup() {
  const router = useRouter()

  const handleSubmit = (email: string, password: string) => {
    console.log('Form submitted with data:', email, password)
    router.push('/books')
  }

  return (
    <div className="signup-page">
      <h1>Sign Up for an Account</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, deleniti.</p>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  )
}