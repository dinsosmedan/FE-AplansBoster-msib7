import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useNotFound(condition: boolean) {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (condition) {
      navigate('/404', { replace: true })
    }
  }, [condition, navigate])
}
