// import { useUserPublicToken } from '@/store/client'
import { useAuth } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function UserProtectedAuth() {
  const location = useLocation()
  // const token = useUserPublicToken((state) => state.token)
  const auth = useAuth((state) => ({
    token: state.token,
    user: state.user
  }))

  if (auth?.token && auth.user?.role === null) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
