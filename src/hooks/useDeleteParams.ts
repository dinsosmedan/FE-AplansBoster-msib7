import { useSearchParams } from 'react-router-dom'

export default function useDeleteParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const deleteParam = (param: string) => {
    const params = searchParams.get(param)
    if (params) {
      searchParams.delete(param)
      setSearchParams(searchParams.toString(), { replace: true })
    }
  }

  return deleteParam
}
