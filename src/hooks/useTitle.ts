import { useTitleHeader } from '@/store/client/useTitleHeader'
import React from 'react'

export default function useTitle(title: string) {
  React.useEffect(() => {
    document.title = title
    useTitleHeader.setState({ title })
  }, [title])
}
