import { useAuthStore } from '../store/auth-store'
import { usePermissionsStore } from '../store/permissions-store'

export function useHasPermission() {
  const { user } = useAuthStore()
  const { hasPermission } = usePermissionsStore()
  
  return (permission: 'view_users' | 'edit_users' | 'view_settings' | 'edit_settings' | 'view_profile' | 'edit_profile') => {
    return hasPermission(permission, user?.role)
  }
}