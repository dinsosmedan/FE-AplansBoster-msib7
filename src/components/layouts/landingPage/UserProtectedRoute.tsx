// import { useUserPublicToken } from '@/store/client'
import { useAuth } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function UserProtectedRoute() {
  const location = useLocation()

  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  if (!auth?.token && auth.user?.role === null) {
    return <Navigate to="/user/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
