'use client'

import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        bio,
        photoURL,
      })
      router.push('/feed')
    } catch (error) {
      alert('Failed to save profile: ' + (error as Error).message)
    }
  }

  if (loading || !user) return <div className="p-10 text-center">Loading...</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Complete Your Profile</h2>

      <input
        type="text"
        placeholder="Your name"
        className="w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Profile picture URL (optional)"
        className="w-full border p-2"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />

      <textarea
        placeholder="Short bio"
        className="w-full border p-2"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  )
}
