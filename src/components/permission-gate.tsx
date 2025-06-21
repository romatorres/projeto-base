'use client'

import { useUserStore } from '@/lib/store/user-store'

type Permission = 'view_users' | 'edit_users' | 'view_settings' | 'edit_settings' | 'view_profile' | 'edit_profile'

type PermissionGateProps = {
  permission: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const { hasPermission } = useUserStore()
  
  if (hasPermission(permission)) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}