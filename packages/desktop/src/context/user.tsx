import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import api from '../../../axios-config/src'

interface User {
  id: number,
  name: string,
  email: string,
  avatar: string | null,
  whatsapp: string | null,
  bio: string | null
}
interface UserAuthentication {
  user: User,
  token: string
}

interface Auth {
  signIn(url: string, params: unknown): Promise<void>;
  signOut(): void;
}

interface UserContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  Auth: Auth
}

const UserContext = createContext<UserContextData>({} as UserContextData)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData () {
      const user = localStorage.getItem('@RUser:user')
      const token = localStorage.getItem('@RUser:token')

      if (user && token) {
        api.defaults.headers.UserAuthorization = `token ${token}`

        setUser(JSON.parse(user))
      }
      setLoading(false)
    }
    loadStorageData()
  }, [])

  const Auth = {
    signIn: useCallback(async (url: string, params: unknown) => {
      const { data } = await api.get<UserAuthentication>(url, { params })

      setTimeout(() => {
        setUser(data.user)
      }, 1000)

      // Set toke for all request
      api.defaults.headers.UserAuthorization = `Token ${data.token}`

      localStorage.setItem('@RUser:user', JSON.stringify(data.user))
      localStorage.setItem('@RUser:token', data.token)
    }, []),
    signOut: useCallback(() => {
      localStorage.clear()
      setUser(null)
    }, [])
  }

  return (
    <UserContext.Provider
      value={{ signed: !!user, user, loading, Auth }}>
      {!loading && children}
    </UserContext.Provider>
  )
}

// Hook próprio
export function useUser (): UserContextData {
  const context = useContext(UserContext)

  return context
}
