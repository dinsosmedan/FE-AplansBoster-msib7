import { create } from 'zustand'

interface showHeaderStore {
  show: boolean
  setshow: (show: boolean) => void
}

export const useHiddenFormDjpm = create<showHeaderStore>((set) => ({
  show: false,
  setshow: (show) => set({ show })
}))
