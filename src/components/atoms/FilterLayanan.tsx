import { useGetParams } from '@/hooks'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface DataFilter {
  text: string
  tab: string
}

interface FilterLayananProps {
  data: DataFilter[]
  jenis: string
}

export default function FilterLayanan({ data, jenis }: FilterLayananProps) {
  const { tab } = useGetParams(['tab'])

  return (
    <div className="flex justify-between py-[40px] px-10">
      {data.map((val, i) => (
        <Link
          key={i}
          to={`/layanan/${jenis}?tab=${val.tab}`}
          className={cn(
            tab === `${val.tab}` || (!tab && val.tab === 'pending')
              ? 'text-primary border-b-2 pb-2  border-primary'
              : 'text-primary/70',
            'text-2xl font-bold cursor-pointer px-2'
          )}
        >
          {val.text}
        </Link>
      ))}
    </div>
  )
}
