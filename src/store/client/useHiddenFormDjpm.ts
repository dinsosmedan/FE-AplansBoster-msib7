import { create } from 'zustand'

interface showHeaderStore {
  id_masyarakat: string
  setid_masyarakat: (id_masyarakat: string) => void
}

export const useHiddenFormDjpm = create<showHeaderStore>((set) => ({
  id_masyarakat: '',
  setid_masyarakat: (id_masyarakat) => set({ id_masyarakat })
}))
