import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute() {
  const { accessToken, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-400 text-sm">验证登录状态…</div>
      </div>
    )
  }

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        state={{ redirect: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}
