import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export interface UserProfile {
  id: number
  email: string
  avatar_url: string | null
  streak_days: number
  level: number
}

interface AuthContextValue {
  accessToken: string | null
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const REFRESH_TOKEN_KEY = 'studypal_refresh_token'

async function apiPost<T>(path: string, body: object, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers, body: JSON.stringify(body) })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw Object.assign(new Error(err.detail ?? 'Request failed'), { status: res.status })
  }
  return res.json()
}

async function apiGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = useCallback(async (token: string) => {
    const profile = await apiGet<UserProfile>('/api/users/me', token)
    setUser(profile)
  }, [])

  // Silent refresh on mount
  useEffect(() => {
    const rt = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!rt) { setIsLoading(false); return }

    apiPost<{ access_token: string }>('/api/auth/refresh', { refresh_token: rt })
      .then(async ({ access_token }) => {
        setAccessToken(access_token)
        await fetchUser(access_token)
      })
      .catch(() => {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
      })
      .finally(() => setIsLoading(false))
  }, [fetchUser])

  const login = useCallback(async (email: string, password: string) => {
    const { access_token, refresh_token } = await apiPost<{
      access_token: string
      refresh_token: string
    }>('/api/auth/login', { email, password })
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
    setAccessToken(access_token)
    await fetchUser(access_token)
  }, [fetchUser])

  const register = useCallback(async (email: string, password: string) => {
    await apiPost('/api/auth/register', { email, password })
    await login(email, password)
  }, [login])

  const logout = useCallback(() => {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
