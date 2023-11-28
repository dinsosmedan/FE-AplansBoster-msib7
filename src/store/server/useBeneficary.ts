import { showBeneficaryByNIKFn } from '@/api/beneficary.api'
import { toast, useToast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled
  })
}
export const useMutateBeneficaryByNIK = () => {
  const { toast } = useToast()

  return useMutation(showBeneficaryByNIKFn, {
    onSuccess: () => {
      // void queryClient.invalidateQueries('veterans')
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut'
      })
    },
    onError: () => {
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive'
      })
    }
  })
  // return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
  //   enabled
  // })
}
