"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  businessName: string
  email: string
  phone?: string
  membershipType?: string
  joinedDate?: string
  role?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  register: (businessName: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData: User): void => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const register = async (businessName: string, email: string, password: string): Promise<boolean> => {
    // Simple mock registration - replace with real registration
    if (businessName && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        businessName: businessName,
        email: email,
        role: "user",
      }
      setUser(newUser)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
