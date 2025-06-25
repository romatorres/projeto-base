"use client";

import { PermissionGate } from "@/components/permission-gate";

export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Configurações Gerais</h2>

      <PermissionGate
        permission="view_settings"
        fallback={
          <p>Você não tem permissão para visualizar as configurações.</p>
        }
      >
        <div className="space-y-4 md:space-y-6">
          <div className="p-3 md:p-4 border rounded-md">
            <h3 className="font-medium mb-2">Configurações do Sistema</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Gerencie as configurações gerais do sistema.
            </p>

            <PermissionGate permission="edit_settings">
              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Editar Configurações
              </button>
            </PermissionGate>
          </div>

          <div className="p-3 md:p-4 border rounded-md">
            <h3 className="font-medium mb-2">Preferências</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Personalize sua experiência no sistema.
            </p>

            <button className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
              Gerenciar Preferências
            </button>
          </div>
        </div>
      </PermissionGate>
    </div>
  );
}
