'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function StoryUploadPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !user) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'unsigned_preset_name') // replace this below

      const res = await fetch('https://api.cloudinary.com/v1_1/dxo0axabg/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!data.secure_url) throw new Error('Upload failed')

      await addDoc(collection(db, 'stories', user.uid, 'items'), {
        imageURL: data.secure_url,
        caption,
        createdAt: serverTimestamp(),
      })

      setCaption('')
      setFile(null)
      router.push('/feed')
    } catch (err) {
      alert('Failed to upload story')
    }

    setUploading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">📤 Upload Story</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption (optional)"
          className="w-full border p-2"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {uploading ? 'Uploading...' : 'Upload Story'}
        </button>
      </form>
    </div>
  )
}
