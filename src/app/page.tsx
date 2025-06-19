import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Bem-vindo ao Sistema</h1>
        <p className="text-lg text-gray-600">Faça login para acessar o painel de controle</p>
        <Link 
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Acessar Sistema
        </Link>
      </div>
    </div>
  )
}
