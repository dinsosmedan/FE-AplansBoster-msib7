import { useTitleHeader } from '@/store/client'
import React from 'react'

export default function useTitle(title?: string) {
  const setTitle = useTitleHeader((state) => state.setTitle)
  React.useEffect(() => {
    document.title = `Aplans Boster${title ? ` ~ ${title}` : ''}`
    setTitle(title ?? '')
  }, [title])
}
