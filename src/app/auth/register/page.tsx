"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { UserForm } from "@/components/forms/user-form";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      toast.success("Conta criada com sucesso");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Erro ao criar conta");
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500"
            >
              Faça login
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <UserForm
            onSubmit={handleSubmit}
            submitLabel="Criar conta"
            submitLoadingLabel="Criando conta..."
            showRoleField={false}
            passwordRequired={true}
          />
        </div>
      </div>
    </div>
  );
}
