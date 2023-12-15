import { useCreateParams, useGetParams } from '@/hooks'
import { type ITuitionAssistanceEvents } from '@/lib/types/service.type'
import { cn } from '@/lib/utils'
import React from 'react'
import { type QueryObserverResult } from 'react-query'
import { Link } from 'react-router-dom'

interface FilterLayananProps {
  action: () => Promise<QueryObserverResult<ITuitionAssistanceEvents, unknown>>
}

export default function FilterLayanan({ data, jenis, action }: any) {
  const [isActive, setIsActive] = React.useState('pending')

  const createParams = useCreateParams()
  const { applicationStatus } = useGetParams(['applicationStatus'])

  const handleActive = async (value: string) => {
    createParams({ key: 'applicationStatus', value })
    await action()
  }

  // console.log(data, jenis);

  return (
    <div className="flex justify-between py-[40px] px-10">
      {data.map((val: any, i: any) =>
        <Link
          key={i}
          to={`/layanan/${jenis}?tab=${val.tab}`}
          onClick={() => setIsActive(`${val.tab}`)}
          className={cn(
            isActive === `${val.tab}` ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
            'text-2xl font-bold cursor-pointer px-2'
          )}
        >
          {val.text}
        </Link>
      )}
      {/* <Link
       key={i}
         to={'/layanan/layanan-sktm?tab=pending'}
         onClick={() => setIsActive('pending')}
         className={cn(
           isActive === 'pending' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
           'text-2xl font-bold cursor-pointer px-2'
         )}
       >
         Data Pengajuan
       </Link> */}
      {/* <Link
        to={'/layanan/layanan-sktm?tab=processed'}
        onClick={() => setIsActive('processed')}
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
      </Link> */}
    </div>
  )
}
