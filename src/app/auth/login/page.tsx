'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useUserStore } from '@/lib/store/user-store'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setLoading: setAuthLoading } = useUserStore()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setAuthLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false
      })

      if (res?.error) {
        toast.error('Credenciais inválidas')
        return
      }

      if (res?.ok) {
        toast.success('Login realizado com sucesso')
        router.refresh()
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao fazer login')
      console.error('Erro no login:', error)
    } finally {
      setLoading(false)
      setAuthLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500"
            >
              Registre-se
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
