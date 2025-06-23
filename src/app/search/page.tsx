'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function SearchPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProfiles = async () => {
      const snap = await getDocs(collection(db, 'users'))
      setProfiles(snap.docs.map(doc => doc.data()))
    }
    fetchProfiles()
  }, [])

  const filtered = profiles.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">🔍 Search Profiles</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
        className="w-full border p-2 mb-4"
      />
      {filtered.map((profile, index) => (
        <div key={index} className="border p-3 mb-2 rounded">
          <p><strong>{profile.name}</strong></p>
          <p className="text-sm text-gray-500">{profile.bio}</p>
        </div>
      ))}
    </div>
  )
}
