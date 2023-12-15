import { type IUser } from '@/lib/types/user.type'
import { create } from 'zustand'

export interface AuthStore {
  user: IUser['data'] | null
  storeUser: (user: IUser['data']) => void
  token: string | null
  storeToken: (token: string) => void
  removeToken: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user') ?? '""'),
  storeUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
  token: JSON.parse(localStorage.getItem('access-token') ?? '""'),
  storeToken: (token) => {
    localStorage.setItem('access-token', JSON.stringify(token))
    set({ token })
  },
  removeToken: () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  }
}))
