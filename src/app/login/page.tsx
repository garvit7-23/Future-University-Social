'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/feed')
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Log In</button>
    </form>
  )
}
