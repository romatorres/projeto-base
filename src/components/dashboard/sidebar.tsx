"use client";

import { useUserStore } from "@/lib/store/user-store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const { user, hasPermission } = useUserStore();
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = async () => {
    // Limpar o estado do Zustand
    useUserStore.getState().logout();
    // Fazer logout no NextAuth
    await signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? "bg-blue-700" : "";
  };

  const isSettingsActive = () => {
    return pathname.startsWith("/dashboard/settings") ? true : false;
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
              ) && pathname === "/dashboard" ? "bg-blue-700" : ""}`}
            >
              Dashboard
            </Link>
          </li>

          {hasPermission("view_users") && (
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

          <li>
            <div className="space-y-1">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`w-full flex items-center justify-between p-2 rounded hover:bg-blue-700 transition ${isSettingsActive() ? "bg-blue-700" : ""}`}
              >
                <span>Configurações</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${settingsOpen || isSettingsActive() ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Submenu de Configurações */}
              <div className={`pl-4 space-y-1 ${(settingsOpen || isSettingsActive()) ? "block" : "hidden"}`}>
                <Link
                  href="/dashboard/settings"
                  className={`block p-2 rounded hover:bg-blue-600 transition ${pathname === "/dashboard/settings" ? "bg-blue-600" : ""}`}
                >
                  Configurações Gerais
                </Link>
                <Link
                  href="/dashboard/settings/profile"
                  className={`block p-2 rounded hover:bg-blue-600 transition ${pathname === "/dashboard/settings/profile" ? "bg-blue-600" : ""}`}
                >
                  Meu Perfil
                </Link>
              </div>
            </div>
          </li>
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
