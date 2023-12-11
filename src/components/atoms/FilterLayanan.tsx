import { cn } from '@/lib/utils'
import React from 'react'

export default function FilterLayanan() {
  const [isActive, setIsActive] = React.useState('Data Pengajuan')
  return (
    <div className="flex justify-between py-[40px] px-10">
      <p
        onClick={() => setIsActive('Data Pengajuan')}
        className={cn(
          isActive === 'Data Pengajuan' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Pengajuan
      </p>
      <p
        onClick={() => setIsActive('Data Direvisi/Diproses')}
        className={cn(
          isActive === 'Data Direvisi/Diproses' ? 'text-primary border-b-2 pb-2 border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Direvisi/Diproses
      </p>
      <p
        onClick={() => setIsActive('Data Diterima')}
        className={cn(
          isActive === 'Data Diterima' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Diterima
      </p>
      <p
        onClick={() => setIsActive('Data Ditolak')}
        className={cn(
          isActive === 'Data Ditolak' ? 'text-primary border-b-2 pb-2  border-primary' : 'text-primary/70',
          'text-2xl font-bold cursor-pointer px-2'
        )}
      >
        Data Ditolak
      </p>
    </div>
  )
}
