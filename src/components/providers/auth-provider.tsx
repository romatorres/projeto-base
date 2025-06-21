'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useUserStore } from '@/lib/store/user-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const { setUser, setLoading } = useUserStore()

  useEffect(() => {
    setLoading(status === 'loading')
    
    if (session?.user) {
      setUser(session.user)
    }
  }, [session, status, setUser, setLoading])

  return <>{children}</>
}