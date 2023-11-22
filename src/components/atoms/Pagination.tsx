import { HiChevronDoubleLeft } from 'react-icons/hi2'
import { DOTS } from '@/hooks/usePagination'
import { usePagination } from '@/hooks'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
}

export default function Pagination(props: PaginationProps) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (paginationRange == null || paginationRange.length === 0) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onPrevious} disabled={currentPage === 1}>
        <HiChevronDoubleLeft />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <Button variant="outline" size="icon" className="rounded-lg" key={index} disabled>
              &#8230;
            </Button>
          )
        }

        return (
          <Button
            key={index}
            variant="outline"
            className={cn(pageNumber === currentPage && 'bg-[#F9F9F9] text-primary border-primary', 'rounded-lg')}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </Button>
        )
      })}
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onNext} disabled={currentPage === lastPage}>
        <HiChevronDoubleLeft className="rotate-180" />
      </Button>
    </div>
  )
}
