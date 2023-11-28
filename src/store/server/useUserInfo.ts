import { type IUser } from '@/lib/types/user.type'
import { create } from 'zustand'

interface UserInfoStore {
  user: IUser | null
  storeUserInfo: (userInfo: IUser) => void
  clearUserInfo: () => void
}

export const useUserInfo = create<UserInfoStore>((set) => ({
  user: null,
  storeUserInfo: (user: IUser) => set({ user }),
  clearUserInfo: () => set({ user: null })
}))
