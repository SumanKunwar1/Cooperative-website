"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Admin {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin"
  permissions: string[]
}

interface AdminContextType {
  admin: Admin | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

interface AdminProviderProps {
  children: ReactNode
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem("admin")
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch (error) {
        localStorage.removeItem("admin")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call - replace with actual admin authentication
    try {
      // Demo admin credentials
      if (email === "admin@constellationcooperative.com" && password === "constellation@123") {
        const adminUser: Admin = {
          id: "1",
          email: "admin@constellationcooperative.com",
          name: "System Administrator",
          role: "super_admin",
          permissions: ["users", "businesses", "products", "services", "notices", "settings"],
        }

        setAdmin(adminUser)
        localStorage.setItem("admin", JSON.stringify(adminUser))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem("admin")
  }

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false
    return admin.permissions.includes(permission) || admin.role === "super_admin"
  }

  const value: AdminContextType = {
    admin,
    isLoading,
    login,
    logout,
    hasPermission,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
