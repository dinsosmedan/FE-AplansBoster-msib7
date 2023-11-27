import { useSearchParams } from 'react-router-dom'

interface ParamsType {
  key: string
  value: string
}

export default function useCreateParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleFilter = (params: ParamsType) => {
    searchParams.set(params.key, params.value)
    setSearchParams(searchParams, { replace: true })
  }

  return handleFilter
}
