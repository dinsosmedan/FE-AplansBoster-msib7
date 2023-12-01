import { useToast } from '@/components/ui/use-toast'
import * as React from 'react'

interface IUseToastNik {
  onSuccess?: () => void
  successCondition?: boolean
  notFoundCondition?: boolean
  notRegisteredCondition?: boolean
}

export default function useToastNik({
  onSuccess,
  successCondition,
  notFoundCondition,
  notRegisteredCondition
}: IUseToastNik) {
  const { toast } = useToast()

  React.useEffect(() => {
    if (successCondition) {
      onSuccess && onSuccess()
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut',
        variant: 'default'
      })
    }
  }, [successCondition])

  React.useEffect(() => {
    if (notFoundCondition) {
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive'
      })
    }
  }, [notFoundCondition])

  React.useEffect(() => {
    if (notRegisteredCondition) {
      toast({
        title: 'NIK wajib terdaftar',
        description: 'Anda belum tekan tombol cari untuk mencari NIK, apakah NIK Anda terdaftar atau belum',
        variant: 'destructive'
      })
    }
  }, [notRegisteredCondition])
}
