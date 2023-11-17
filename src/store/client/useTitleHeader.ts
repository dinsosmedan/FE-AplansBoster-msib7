import { create } from 'zustand'

interface TitleHeaderStore {
  title: string
  setTitle: (title: string) => void
}

export const useTitleHeader = create<TitleHeaderStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title })
}))
