"use client";

import { useUserStore } from "@/lib/store/user-store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { user } = useUserStore();
  const pathname = usePathname();

  const handleLogout = async () => {
    // Limpar o estado do Zustand
    useUserStore.getState().logout();
    // Fazer logout no NextAuth
    await signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  const isActive = (path: string) => {
    return pathname === path ? "bg-blue-700" : "";
  };

  return (
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 border-b border-blue-700">
        <h2 className="text-xl font-bold">Painel de Controle</h2>
        <p className="text-sm text-blue-300 mt-1">{user?.name}</p>
        <p className="text-xs text-blue-400">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`block p-2 rounded hover:bg-blue-700 transition ${isActive(
                "/dashboard"
              )}`}
            >
              Dashboard
            </Link>
          </li>

          {useUserStore() && (
            <li>
              <Link
                href="/dashboard/profile"
                className={`block p-2 rounded hover:bg-blue-700 transition ${isActive(
                  "/dashboard/profile"
                )}`}
              >
                Meu Perfil
              </Link>
            </li>
          )}

          {useUserStore() && (
            <li>
              <Link
                href="/dashboard/users"
                className={`block p-2 rounded hover:bg-blue-700 transition ${isActive(
                  "/dashboard/users"
                )}`}
              >
                Usuários
              </Link>
            </li>
          )}

          {useUserStore() && (
            <li>
              <Link
                href="/dashboard/settings"
                className={`block p-2 rounded hover:bg-blue-700 transition ${isActive(
                  "/dashboard/settings"
                )}`}
              >
                Configurações
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
