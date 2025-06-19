import { create } from 'zustand'

type Permission = 'view_users' | 'edit_users' | 'view_settings' | 'edit_settings' | 'view_profile' | 'edit_profile'

type PermissionsByRole = {
  ADMIN: Permission[]
  USER: Permission[]
}

type PermissionsState = {
  permissionsByRole: PermissionsByRole
  hasPermission: (permission: Permission, role?: string) => boolean
}

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  permissionsByRole: {
    ADMIN: ['view_users', 'edit_users', 'view_settings', 'edit_settings', 'view_profile', 'edit_profile'],
    USER: ['view_profile', 'edit_profile']
  },
  
  hasPermission: (permission: Permission, role?: string): boolean => {
    if (!role) return false
    const { permissionsByRole } = get()
    return permissionsByRole[role as keyof PermissionsByRole]?.includes(permission) || false
  }
}))