import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar' // ✅ Import it

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FutureU Social',
  description: 'Social Media App for Thapar Assignment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar /> {/* ✅ Show navbar on all pages */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
