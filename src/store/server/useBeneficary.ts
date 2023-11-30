import { showBeneficaryByNIKFn } from '@/api/beneficary.api'
import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQuery } from 'react-query'
import { useHiddenFormDjpm } from '../client/useHiddenFormDjpm'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled
  })
}
export const useMutateBeneficaryByNIK = () => {
  const { toast } = useToast()
  const setid_masyarakat = useHiddenFormDjpm((state) => state.setid_masyarakat)

  return useMutation(showBeneficaryByNIKFn, {
    onSuccess: (res): any => {
      setid_masyarakat(res.id)
      // void queryClient.invalidateQueries('veterans')
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut'
      })
    },
    onError: () => {
      // <Link/>
      // <Link to="/data-master/info-datamaster">
      setid_masyarakat('')
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive'
      })
      // </Link>
    }
  })
  // return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
  //   enabled
  // })
}
