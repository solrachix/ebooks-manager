import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import api from '../../../axios-config/src'

import { useConfig } from './../hooks/useConfig'

interface UserData {
  id: number,
  name: string,
  email: string,
  avatar: string | null,
  whatsapp: string | null,
  bio: string | null
}
interface User {
  Logged: boolean,
  token: null | string,
  data: null | UserData
}

interface UserAuthentication {
  user: UserData,
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
  // const [user, setUser] = useState<User>(useConfig('user'))
  const [user, setUser] = useConfig('user')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData () {
      // const user = localStorage.getItem('@RUser:user')
      // const token = localStorage.getItem('@RUser:token')

      // if (user && token) {
      //   api.defaults.headers.UserAuthorization = `token ${token}`

      //   setUser(JSON.parse(user))

      // }

      if (user.Logged) {
        api.defaults.headers.UserAuthorization = `token ${user.token}`
      }
      setLoading(false)
    }
    loadStorageData()
  }, [])

  const Auth = {
    signIn: useCallback(async (url: string, params: unknown) => {
      const { data } = await api.get<UserAuthentication>(url, { params })

      // setTimeout(() => {

      // }, 1000)

      // Set toke for all request
      api.defaults.headers.Authorization = `Token ${data.token}`

      setUser({
        Logged: true,
        token: data.token,
        data: data.user
      })
    }, []),
    signOut: useCallback(() => {
      localStorage.clear()
      setUser({
        Logged: false,
        token: null,
        data: null
      })
    }, [])
  }
  useEffect(() => {
    console.log(Auth)
      }, [Auth])
  return (
    <UserContext.Provider
      value={{ signed: user.Logged, user, loading, Auth }}>
      {!loading && children}
    </UserContext.Provider>
  )
}

// Hook próprio
export function useUser (): UserContextData {
  const context = useContext(UserContext)

  return context
}
