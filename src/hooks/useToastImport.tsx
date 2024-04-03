import { useToast } from '@/components/ui/use-toast'

interface IUseImport {
  onSuccess?: () => void
  failedCondition?: boolean
  successCondition?: boolean
  notFoundCondition?: boolean
}

export default function useToastImport() {
  const { toast } = useToast()

  const showToast = ({ onSuccess, failedCondition, successCondition, notFoundCondition }: IUseImport = {}) => {
    if (successCondition) {
      onSuccess && onSuccess()
      toast({
        title: 'Data Ditambahkan',
        description: 'Data BST Lansia Berhasil Ditambahkan',
        variant: 'default'
      })
    }

    if (failedCondition) {
      toast({
        title: 'Data Gagal Ditambahkan',
        description: 'Maaf, Silahkan Data Tidak Dapat Ditambahkan',
        variant: 'destructive'
      })
    }

    if (notFoundCondition) {
      toast({
        title: 'Not Found',
        description: 'Mohon Masukkan File',
        variant: 'destructive'
      })
    }
  }

  return showToast
}
