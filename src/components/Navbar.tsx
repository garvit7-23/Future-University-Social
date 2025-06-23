'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white shadow-md">
      <div className="flex items-center space-x-6">
        <Link href="/feed" className="text-lg font-bold hover:underline">FutureSocial</Link>
        {user && (
          <>
            <Link href="/feed" className="hover:underline">Feed</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/search" className="hover:underline">Search Profiles</Link>
            <Link href="/story" className="hover:underline">Add Story</Link>
          </>
        )}
      </div>
      <div className="space-x-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link href="/signup" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
