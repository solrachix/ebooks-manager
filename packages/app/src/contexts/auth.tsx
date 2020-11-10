import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '@thoth/axios-config'

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

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  Auth: {
    signIn(url: string, params: unknown): Promise<void>;
    signOut(): void;
  }
  firstTimeInTheAPP: boolean;
  finishedTheIntro() : void
}

interface Authentication {
  user: UserData,
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [firstTimeInTheAPP, setFirstTimeInTheAPP] = useState(false)

  useEffect(() => {
    async function loadStorageData () {
      const [user, token, FirstTime] = await AsyncStorage.multiGet([
        '@RNAuth:user',
        '@RNAuth:token',
        '@RNAFirstTimeInTheAPP'
      ])

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (user && token && FirstTime[1]) {
        await Auth.renewToken()
        // Set toke for all request
        // api.defaults.headers.Authorization = `Token ${token[1]}`

        setFirstTimeInTheAPP(JSON.parse(FirstTime[1]))
        // setUser(JSON.parse(user[1]))

        setUser({
          Logged: true,
          token: '',
          data: (user as UserData)
        })

        setInterval(() => Auth.renewToken(), 1000 * 60 * 60)
      }

      setLoading(false)
    }
    loadStorageData()
  }, [])

  const Auth = {
    signIn: useCallback(async (url: string, params: unknown) => {
      const { data } = await api.get<Authentication>(url, { params })

      // setTimeout(() => {

      // }, 1000)

      // Set toke for all request
      api.defaults.headers.authorization = `Token ${data.token}`

      setUser({
        Logged: true,
        token: data.token,
        data: data.user
      })

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(data.user))
      await AsyncStorage.setItem('@RNAuth:token', data.token)
    }, []),
    signOut: useCallback(() => {
      AsyncStorage.clear().then(() => {
        setUser({
          Logged: false,
          token: null,
          data: null
        })
      })
    }, []),
    renewToken: useCallback(async () => {
      console.log(user?.token)

      api.defaults.headers.authorization = `Token ${user?.token}`

      await api.post<Authentication>('/user/renewToken').then(({ data: { token } }) => {
        if (!token) return
        // Set toke for all request
        api.defaults.headers.authorization = `Token ${token}`

        if (!user) return false

        setUser({
          ...user,
          token
        })
      }).catch((error) => {
        console.log(error)
        Auth.signOut()
      })
    }, [])

  }

  // async function signIn (url: string, params: unknown) {
  //   const { data } = await api.get<Authentication>(url, { params })

  //   setTimeout(() => {
  //     setUser(data.user)
  //   }, 5000)

  //   setUser(data.user)

  //   // Set toke for all request
  //   api.defaults.headers.Authorization = `Token ${data.token}`

  //   await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(data.user))
  //   await AsyncStorage.setItem('@RNAuth:token', data.token)
  // }

  // function signOut () {
  //   AsyncStorage.clear().then(() => {
  //     setUser(null)
  //   })
  // }

  async function finishedTheIntro () {
    setLoading(false)
    setFirstTimeInTheAPP(false)

    await AsyncStorage.setItem('@RNAFirstTimeInTheAPP', JSON.stringify(true))
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, Auth, firstTimeInTheAPP, finishedTheIntro }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook próprio
export function useAuth () {
  const context = useContext(AuthContext)

  return context
}
