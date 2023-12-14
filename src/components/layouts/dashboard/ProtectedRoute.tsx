// import { useToken } from '@/store/client'
import { useAuth } from '@/store/client'
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  // const token = useToken((state) => state.token)
  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  if (!auth?.token && auth.user?.role !== null) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children ?? <Outlet />
}
