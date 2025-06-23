'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'

export default function PublicProfilePage() {
  const { uid } = useParams()
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, 'users', uid as string))
      if (snap.exists()) {
        setProfile(snap.data())
      }
      setLoading(false)
    }
    fetchProfile()
  }, [uid])

  if (loading) return <div className="text-center p-10">Loading...</div>
  if (!profile) return <div className="text-center p-10">User not found.</div>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">👤 {profile.name}</h1>
      {profile.photoURL && (
        <Image
          src={profile.photoURL}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
      )}
      <p className="mb-2"><strong>Bio:</strong></p>
      <p className="text-gray-700">{profile.bio}</p>
    </div>
  )
}
