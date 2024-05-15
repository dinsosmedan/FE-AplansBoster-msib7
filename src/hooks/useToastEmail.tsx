import { useToast } from '@/components/ui/use-toast'

interface IUseImport {
  onSuccess?: () => void
  failedCondition?: boolean
  successCondition?: boolean
  notFoundCondition?: boolean
}

export default function useToastEmail() {
  const { toast } = useToast()

  const showToast = ({ onSuccess, failedCondition, successCondition, notFoundCondition }: IUseImport = {}) => {
    if (successCondition) {
      onSuccess && onSuccess()
      toast({
        title: 'Notifikasi Dikirimkan',
        description: 'Notifikasi Berhasil Dikirimkan',
        variant: 'default'
      })
    }

    if (failedCondition) {
      toast({
        title: 'Notifikasi Gagal Dikirimkan',
        description: 'Maaf, Mohon coba lagi',
        variant: 'destructive'
      })
    }
  }

  return showToast
}
