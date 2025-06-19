'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { useAuthStore } from '@/lib/store/auth-store'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuthStore()
  
  // Redirecionamento se não estiver autenticado
  if (!isLoading && !isAuthenticated) {
    redirect('/auth/login')
  }
  
  // Exibir um loader enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-100">
        {children}
      </main>
    </div>
  )
}