import { useGetDevices } from '@/hooks'
import { useAuth } from '@/store/client'
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedAuthProps {
  children?: React.ReactNode
}

export default function ProtectedAuth({ children }: ProtectedAuthProps) {
  const location = useLocation()
  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  const { isMobile, isTablet } = useGetDevices()

  if (auth?.token && auth.user?.role !== null) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  if (isMobile || isTablet) {
    return (
      <p className="justify-between items-center text-2xl font-bold text-primary px-8 text-center min-h-screen flex">
        Maaf Halaman Ini hanya dapat dilihat dengan menggunakan Desktop atau Laptop 😢
      </p>
    )
  }

  return children ?? <Outlet />
}
