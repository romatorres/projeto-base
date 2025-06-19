'use client'

import { useHasPermission } from '@/lib/hooks/use-has-permission'

type PermissionGateProps = {
  permission: 'view_users' | 'edit_users' | 'view_settings' | 'edit_settings' | 'view_profile' | 'edit_profile'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const hasPermission = useHasPermission()
  
  if (hasPermission(permission)) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}