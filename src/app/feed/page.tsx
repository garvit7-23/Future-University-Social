'use client'

import { getDoc, doc as docRef } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import StoryViewer from '@/components/StoryViewer' // ✅ Import viewer

export default function FeedPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [content, setContent] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [viewingStoryUser, setViewingStoryUser] = useState<string | null>(null) // ✅ story viewer

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const handleClap = async (postId: string, currentLikes: number) => {
    const postRef = doc(db, 'posts', postId)
    try {
      await updateDoc(postRef, {
        likes: currentLikes + 1,
      })
    } catch (error) {
      console.error('Clap failed:', error)
    }
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const profileSnap = await getDoc(docRef(db, 'users', user.uid))
      const profile = profileSnap.exists() ? profileSnap.data() : {}

      await addDoc(collection(db, 'posts'), {
        uid: user.uid,
        name: profile.name || 'Anonymous',
        photoURL: profile.photoURL || '',
        content,
        imageURL,
        createdAt: serverTimestamp(),
        likes: 0,
      })

      setContent('')
      setImageURL('')
    } catch (error) {
      alert('Failed to post: ' + (error as Error).message)
    }
  }

  if (loading || !user) return <div className="text-center p-10">Loading...</div>

  const filteredPosts = posts.filter((post) =>
    post.content?.toLowerCase().includes(search.toLowerCase()) ||
    post.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">📢 Global Feed</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts or users..."
          className="w-full border p-2 mb-4"
        />

        <form onSubmit={handlePost} className="space-y-3 mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            required
            className="w-full p-2 border"
          />
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Post
          </button>
        </form>

        {filteredPosts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow-sm">
            <div className="flex items-center gap-2">
              {/* ✅ Profile image triggers story */}
              {post.photoURL && (
                <button onClick={() => setViewingStoryUser(post.uid)}>
                  <Image
                    src={post.photoURL}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>
              )}
              {/* ✅ Name links to profile */}
              <Link href={`/profile/${post.uid}`} className="hover:underline">
                <strong>{post.name}</strong>
              </Link>
            </div>

            <p className="mt-2">{post.content}</p>

            {post.imageURL && (
              <Image
                src={post.imageURL}
                alt="post"
                width={400}
                height={300}
                className="rounded mt-2"
              />
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => handleClap(post.id, post.likes)}
                className="text-blue-600 font-semibold"
              >
                👏 Clap
              </button>
              <span>{post.likes || 0} claps</span>
            </div>
          </div>
        ))}

        {/* ✅ Show story viewer modal */}
        {viewingStoryUser && (
          <StoryViewer uid={viewingStoryUser} onClose={() => setViewingStoryUser(null)} />
        )}
      </div>
    </ProtectedRoute>
  )
}
