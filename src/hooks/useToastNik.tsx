import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  React.useEffect(() => {
    if (successCondition) {
      onSuccess && onSuccess()
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi inputan selanjutnya',
        variant: 'default'
      })
    }
  }, [successCondition])

  React.useEffect(() => {
    if (notFoundCondition) {
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive',
        action: (
          <ToastAction altText="Daftar NIK" onClick={() => navigate('/data-master')}>
            Daftar NIK
          </ToastAction>
        )
      })
    }
  }, [notFoundCondition])

  React.useEffect(() => {
    if (notRegisteredCondition) {
      toast({
        title: 'NIK Belum di isi',
        description: 'Anda belum tekan tombol cari untuk mencari NIK, apakah NIK Anda terdaftar atau belum',
        variant: 'destructive'
      })
    }
  }, [notRegisteredCondition])
}
