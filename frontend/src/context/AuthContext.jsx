import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { login as loginRequest } from '../services/authService'

const AuthContext = createContext(null)
const STORAGE_KEY = 'aulix_session'

function readSession(remembered) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession())

  const login = useCallback(async ({ email, password, remember }) => {
    const data = await loginRequest({ email, password })
    const storage = remember ? localStorage : sessionStorage
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    storage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSession(data)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ user: session?.user ?? null, token: session?.token ?? null, isAuthenticated: !!session?.token, login, logout }),
    [session, login, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
