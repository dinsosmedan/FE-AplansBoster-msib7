import { type IBreadcrumbs } from '@/components/atoms/Breadcrumbs'
import { create } from 'zustand'

interface TitleHeaderStore {
  title: string
  breadcrumbs: IBreadcrumbs[]
  isHadBreadcrumbs: boolean
  setTitle: (title: string) => void
  setBreadcrumbs: (breadcrumbs: IBreadcrumbs[]) => void
}

export const useTitleHeader = create<TitleHeaderStore>((set) => ({
  title: '',
  breadcrumbs: [],
  isHadBreadcrumbs: false,
  setTitle: (title) => set({ title, isHadBreadcrumbs: false }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs, isHadBreadcrumbs: true })
}))
