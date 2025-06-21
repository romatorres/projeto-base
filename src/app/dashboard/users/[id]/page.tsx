"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserForm } from "@/components/forms/user-form";
import { withAdminProtection } from "@/components/hoc/with-admin-protection";

function EditUserPage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const userId = params.id;

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do usuário");
        }

        const data = await response.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "USER",
        });
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Erro ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (formData: any) => {
    // Preparar dados para envio (remover senha se estiver vazia)
    const dataToSend: any = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao atualizar usuário");
      }

      toast.success("Usuário atualizado com sucesso");
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao atualizar usuário");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-bold">Editar Usuário</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <UserForm
          initialData={userData}
          onSubmit={handleSubmit}
          submitLabel="Salvar"
          submitLoadingLabel="Salvando..."
          showRoleField={true}
          passwordRequired={false}
          passwordLabel="Senha (deixe em branco para manter a atual)"
          showCancelButton={true}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}

export default withAdminProtection(EditUserPage);
