import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "next-auth";

type Permission =
  | "view_users"
  | "edit_users"
  | "view_settings"
  | "edit_settings"
  | "view_profile"
  | "edit_profile";

type PermissionsByRole = {
  ADMIN: Permission[];
  USER: Permission[];
};

type UserState = {
  // Dados do usuário
  user: (User & { role?: string }) | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Permissões
  permissionsByRole: PermissionsByRole;

  // Ações
  setUser: (user: (User & { role?: string }) | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isLoading: false,
      isAuthenticated: false,
      permissionsByRole: {
        ADMIN: [
          "view_users",
          "edit_users",
          "view_settings",
          "edit_settings",
          "view_profile",
          "edit_profile",
        ],
        USER: ["view_profile", "edit_profile"],
      },

      // Ações
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Verificação de permissão
      hasPermission: (permission: Permission): boolean => {
        const { user, permissionsByRole } = get();
        if (!user?.role) return false;
        return (
          permissionsByRole[user.role as keyof PermissionsByRole]?.includes(
            permission
          ) || false
        );
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
