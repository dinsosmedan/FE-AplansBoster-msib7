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
    <div className="flex justify-start py-[10px] pt-8">
      {data.map((val, i) => (
        <Link
          key={i}
          to={`/layanan/${jenis}?tab=${val.tab}`}
          className={cn(
            tab === `${val.tab}` || (!tab && val.tab === 'pending')
              ? 'text-primary border-b-2 pb-2  border-primary me-5'
              : 'text-primary/70',
            'text-lg font-bold cursor-pointer px-2 me-5'
          )}
        >
          {val.text}
        </Link>
      ))}
    </div>
  )
}
