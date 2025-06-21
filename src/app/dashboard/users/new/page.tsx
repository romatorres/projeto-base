"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserForm } from "@/components/forms/user-form";
import { withAdminProtection } from "@/components/hoc/with-admin-protection";

function NewUserPage() {
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao criar usuário");
      }

      toast.success("Usuário criado com sucesso");
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao criar usuário");
      throw error;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-bold">Novo Usuário</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <UserForm
          onSubmit={handleSubmit}
          submitLabel="Salvar"
          submitLoadingLabel="Salvando..."
          showRoleField={true}
          passwordRequired={true}
          showCancelButton={true}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}

export default withAdminProtection(NewUserPage);
