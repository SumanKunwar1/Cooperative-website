import type React from "react"
import { Navigate } from "react-router-dom"
import { useAdmin } from "../../contexts/AdminContext"

interface ProtectedAdminRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children, requiredPermission }) => {
  const { admin, isLoading, hasPermission } = useAdmin()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this resource.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedAdminRoute
