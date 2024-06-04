import { useToast } from '@/components/ui/use-toast'
import * as React from 'react'

interface IUseToastPublicEvent {
  notRegisteredCondition?: boolean
}

export default function useToastPublicEvent({
  notRegisteredCondition
}: IUseToastPublicEvent) {
  const { toast } = useToast()

  React.useEffect(() => {
    if (notRegisteredCondition) {
      toast({
        title: 'Pendaftaran Penuh',
        description: 'Maaf Pendaftaran Penuh Mohon Dicek Secara Berkala',
        variant: 'destructive'
      })
    }
  }, [notRegisteredCondition])
}
