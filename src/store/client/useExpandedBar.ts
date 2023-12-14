import { create } from 'zustand'

interface ExpandedBarStore {
  expanded: boolean
  updateExpanded: (expanded: boolean) => void
}

export const useExpandedBar = create<ExpandedBarStore>((set) => ({
  expanded: JSON.parse(localStorage.getItem('expanded') ?? '""') || '',
  updateExpanded: (expanded) => {
    set({ expanded })
  }
}))
