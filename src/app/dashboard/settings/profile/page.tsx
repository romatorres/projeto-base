"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/lib/store/user-store";
import { UserForm } from "@/components/forms/user-form";

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export default function ProfilePage() {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    try {
      // Remover a senha se estiver vazia
      if (!data.password) {
        delete data.password;
      }

      // Não permitir alteração de role pelo próprio usuário
      delete data.role;

      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar perfil");
      }

      const updatedUser = await response.json();

      // Atualizar o usuário no store
      setUser({
        ...user!,
        name: updatedUser.name,
        email: updatedUser.email,
      });

      toast.success("Perfil atualizado com sucesso");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao atualizar perfil");
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>

      {!isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome</h3>
              <p className="mt-1">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Função</h3>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.role}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      ) : (
        <div>
          <UserForm
            initialData={{
              name: user.name || "",
              email: user.email || "",
              password: "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Salvar Alterações"
            submitLoadingLabel="Salvando..."
            passwordRequired={false}
            passwordLabel="Nova Senha (deixe em branco para manter a atual)"
            showRoleField={false}
            showCancelButton={true}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}
