"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "member" | "admin" | "shareholder"
  avatar?: string
  phone?: string
  membershipNumber?: string
  joinedDate: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("auth_token")
        const userData = localStorage.getItem("user_data")

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)

      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - replace with real API call
      if (email === "admin@constellation.com" && password === "admin123") {
        const userData: User = {
          id: "1",
          email: email,
          name: "Admin User",
          role: "admin",
          avatar: "/admin-avatar.png",
          phone: "+977-9841234567",
          membershipNumber: "ADM001",
          joinedDate: "2020-01-01",
        }

        const token = "mock_jwt_token_" + Date.now()

        localStorage.setItem("auth_token", token)
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)

        return { success: true }
      } else if (email === "member@constellation.com" && password === "member123") {
        const userData: User = {
          id: "2",
          email: email,
          name: "John Doe",
          role: "member",
          avatar: "/member-avatar.png",
          phone: "+977-9841234568",
          membershipNumber: "MEM001",
          joinedDate: "2022-03-15",
        }

        const token = "mock_jwt_token_" + Date.now()

        localStorage.setItem("auth_token", token)
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)

        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - replace with real API call
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: "member",
        avatar: "/new-member-avatar.png",
        phone: userData.phone,
        membershipNumber: "MEM" + Date.now().toString().slice(-3),
        joinedDate: new Date().toISOString().split("T")[0],
      }

      const token = "mock_jwt_token_" + Date.now()

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_data", JSON.stringify(newUser))
      setUser(newUser)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) return { success: false, error: "No user logged in" }

      const updatedUser = { ...user, ...userData }
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Profile update failed" }
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
