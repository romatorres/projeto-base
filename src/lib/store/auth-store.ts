import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from 'next-auth'

type AuthState = {
  user: (User & { role?: string }) | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: (User & { role?: string }) | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)