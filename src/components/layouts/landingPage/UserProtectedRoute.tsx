import { useUserPublicToken } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function UserProtectedRoute() {
  const location = useLocation()
  const token = useUserPublicToken((state) => state.token)

  if (token === '') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
