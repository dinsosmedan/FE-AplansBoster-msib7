// import { useToken } from '@/store/client'
import { useAuth } from '@/store/client'
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedAuthProps {
  children?: React.ReactNode
}

export default function ProtectedAuth({ children }: ProtectedAuthProps) {
  const location = useLocation()
  // const token = useToken((state) => state.token)
  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  if (auth?.token && auth.user?.role !== null) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return children ?? <Outlet />
}
