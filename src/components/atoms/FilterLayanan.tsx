import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FilterLayanan({ data, jenis }: any) {
  const [isActive, setIsActive] = React.useState('pending')


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
          isActive === 'processed' ? 'text-primary border-b-2 pb-2 border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Direvisi/Diproses
      </Link>
      <Link
        to={'/layanan/layanan-sktm?tab=approved'}
        onClick={() => setIsActive('approved')}
        className={cn(
          isActive === 'approved' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Diterima
      </Link>
      <Link
        to={'/layanan/layanan-sktm?tab=rejected'}
        onClick={() => setIsActive('rejected')}
        className={cn(
          isActive === 'rejected' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Ditolak
      </Link> */}
    </div>
  )
}
