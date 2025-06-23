'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export default function StoryViewer({
  uid,
  onClose,
}: {
  uid: string
  onClose: () => void
}) {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      const q = query(
        collection(db, 'stories', uid, 'items'),
        orderBy('createdAt', 'desc')
      )
      const snap = await getDocs(q)
      setStories(snap.docs.map(doc => doc.data()))
      setLoading(false)
    }
    fetchStories()
  }, [uid])

  if (loading) return null
  if (stories.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white rounded shadow-lg relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <img
          src={stories[0].imageURL}
          alt="story"
          className="w-full max-h-[400px] object-contain mb-2"
        />
        {stories[0].caption && (
          <p className="text-gray-800 font-medium">{stories[0].caption}</p>
        )}
      </div>
    </div>
  )
}
