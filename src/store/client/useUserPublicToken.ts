import { create } from 'zustand'
import { type TokenStore } from './useToken'

export const useUserPublicToken = create<TokenStore>((set) => ({
  token: JSON.parse(localStorage.getItem('access-token-user-public') ?? '""'),
  storeToken: (token) => {
    localStorage.setItem('access-token-user-public', JSON.stringify(token))
    set({ token })
  },
  removeToken: () => {
    localStorage.removeItem('access-token-user-public')
    set({ token: '' })
  }
}))
