'use client'

import { useAuthStore } from '@/lib/store/auth-store'
import { PermissionGate } from '@/components/permission-gate'

export default function DashboardPage() {
  const { user } = useAuthStore()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo, {user?.name}!</h2>
        <p className="text-gray-600">Seu nível de acesso é: {user?.role}</p>
        
        {/* Seção comum para todos os usuários */}
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="text-lg font-medium mb-2">Área Comum</h3>
          <p className="text-blue-800">Esta área está disponível para todos os usuários.</p>
        </div>
        
        {/* Área de gerenciamento de usuários - apenas para quem tem permissão */}
        <PermissionGate permission="view_users">
          <div className="mt-4 p-4 bg-yellow-100 rounded">
            <h3 className="text-lg font-medium mb-2">Gerenciamento de Usuários</h3>
            <p className="text-yellow-800">Você pode visualizar e gerenciar usuários do sistema</p>
            
            <PermissionGate permission="edit_users">
              <button className="mt-2 p-2 bg-yellow-200 rounded hover:bg-yellow-300 transition">
                Adicionar Novo Usuário
              </button>
            </PermissionGate>
          </div>
        </PermissionGate>
        
        {/* Área de configurações - apenas para quem tem permissão */}
        <PermissionGate permission="view_settings">
          <div className="mt-4 p-4 bg-purple-100 rounded">
            <h3 className="text-lg font-medium mb-2">Configurações do Sistema</h3>
            <p className="text-purple-800">Você pode visualizar as configurações do sistema</p>
            
            <PermissionGate permission="edit_settings">
              <button className="mt-2 p-2 bg-purple-200 rounded hover:bg-purple-300 transition">
                Editar Configurações
              </button>
            </PermissionGate>
          </div>
        </PermissionGate>
        
        {/* Área de perfil - disponível para todos os usuários autenticados */}
        <PermissionGate permission="view_profile">
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h3 className="text-lg font-medium mb-2">Meu Perfil</h3>
            <p className="text-green-800">Gerencie suas informações pessoais</p>
            
            <PermissionGate permission="edit_profile">
              <button className="mt-2 p-2 bg-green-200 rounded hover:bg-green-300 transition">
                Editar Perfil
              </button>
            </PermissionGate>
          </div>
        </PermissionGate>
      </div>
    </div>
  )
}