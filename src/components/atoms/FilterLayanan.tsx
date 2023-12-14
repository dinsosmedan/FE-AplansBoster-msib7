import { useCreateParams, useGetParams } from '@/hooks'
import { type ITuitionAssistanceEvents } from '@/lib/types/service.type'
import { cn } from '@/lib/utils'
import { type QueryObserverResult } from 'react-query'

interface FilterLayananProps {
  action: () => Promise<QueryObserverResult<ITuitionAssistanceEvents, unknown>>
}

export default function FilterLayanan({ action }: FilterLayananProps) {
  const createParams = useCreateParams()
  const { applicationStatus } = useGetParams(['applicationStatus'])

  const handleActive = async (value: string) => {
    createParams({ key: 'applicationStatus', value })
    await action()
  }

  return (
    <div className="flex justify-between py-[40px] px-10">
      <p
        onClick={async () => await handleActive('processed')}
        className={cn(
          applicationStatus === 'processed' || applicationStatus === ''
            ? 'text-primary border-b-2 pb-2  border-primary'
            : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Pengajuan
      </p>
      <p
        onClick={async () => await handleActive('pending')}
        className={cn(
          applicationStatus === 'pending' ? 'text-primary border-b-2 pb-2 border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Direvisi/Diproses
      </p>
      <p
        onClick={async () => await handleActive('approved')}
        className={cn(
          applicationStatus === 'approved' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Diterima
      </p>
      <p
        onClick={async () => await handleActive('rejected')}
        className={cn(
          applicationStatus === 'rejected' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Ditolak
      </p>
    </div>
  )
}
