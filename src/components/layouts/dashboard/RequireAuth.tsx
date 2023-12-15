import { useAuth } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  allowedRoles?: string[]
}

export default function RequireAuth({ allowedRoles = [] }: RequireAuthProps) {
  const user = useAuth((state) => state.user)
  const location = useLocation()

  const isPermitted = allowedRoles.includes(user?.role?.toString() ?? '')

  if (isPermitted) return <Outlet />

  return <Navigate to="/404" state={{ from: location }} replace />
}
