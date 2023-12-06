import { useUserPublicToken } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function UserProtectedAuth() {
  const location = useLocation()
  const token = useUserPublicToken((state) => state.token)

  if (token !== '') {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
