import { create } from 'zustand'

interface showHeaderStore {
  order: string
  setorder: (order: string) => void
}

export const useDashboardParam = create<showHeaderStore>((set) => ({
  order: '',
  setorder: (order: any) => set({ order })
}))
