import React from 'react'

export default function useTitle(title: string) {
  React.useEffect(() => {
    document.title = `Aplans Boster ~ ${title}`
  }, [title])
}
