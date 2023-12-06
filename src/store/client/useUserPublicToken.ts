import { create } from 'zustand'
import { type TokenStore } from './useToken'
import { type IUser } from '@/lib/types/user.type'

interface UserPublicTokenStore extends TokenStore {
  user: IUser['data']
  storeUser: (user: IUser['data']) => void
}

export const useUserPublicToken = create<UserPublicTokenStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user-public') ?? '""'),
  token: JSON.parse(localStorage.getItem('access-token-user-public') ?? '""'),
  storeToken: (token) => {
    localStorage.setItem('access-token-user-public', JSON.stringify(token))
    set({ token })
  },
  removeToken: () => {
    localStorage.removeItem('access-token-user-public')
    set({ token: '' })
  },
  storeUser: (user) => {
    localStorage.setItem('user-public', JSON.stringify(user))
    set({ user })
  }
}))
