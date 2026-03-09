'use client'

import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { useRouter } from 'next/navigation'

interface AdminContextType {
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setIsAuthenticated(false)
    router.push('/admin/login')
  }, [router])

  const setAuthToken = useCallback((newToken: string) => {
    localStorage.setItem('adminToken', newToken)
    setToken(newToken)
    setIsAuthenticated(true)
  }, [])

  return {
    isAuthenticated,
    token,
    isLoading,
    logout,
    setAuthToken,
  }
}

// For use in components that need auth state
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const auth = useAdmin()
  
  return (
    <AdminContext.Provider value={auth}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminContext() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used within AdminProvider')
  }
  return context
}
