import { type AxiosError } from 'axios'
import { type IErrorResponse } from '../types/user.type'
import { toast } from '@/components/ui/use-toast'

export const handleOnError = (error: AxiosError, message?: string) => {
  const errorResponse = error.response?.data as IErrorResponse

  if (errorResponse !== undefined) {
    toast({
      variant: 'destructive',
      title: message ?? errorResponse.message ?? 'Gagal',
      description: 'Terjadi masalah dengan permintaan Anda.'
    })
  }
}

interface handleMessageProps {
  title: string
  variant: 'create' | 'update' | 'delete'
}

export const handleMessage = ({ title, variant }: handleMessageProps) => {
  toast({
    title: 'Proses Berhasil',
    description: `${title} berhasil di${variant === 'create' ? 'tambahkan' : variant === 'update' ? 'ubah' : 'hapus'}`
  })
}
