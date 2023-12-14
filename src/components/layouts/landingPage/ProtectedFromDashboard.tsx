import { useAuth } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedFromDashboard() {
  const location = useLocation()
  // const token = useUserPublicToken((state) => state.token)
  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  if (auth.user?.role && auth.token) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return <Outlet />
}
