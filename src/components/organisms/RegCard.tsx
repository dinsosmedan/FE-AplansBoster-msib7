import { Button } from '../ui/button'
import { HiChevronRight } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

interface RegCard {
  title: string
  subTitle: string
  pdfFileName: string;
}


export default function RegCard({ title, subTitle, pdfFileName}: RegCard) {
  const pdfPath = `/pdf/${pdfFileName}`
  return (
    <a
    href={pdfPath}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-auto mb-auto rounded-[10px] w-[100%] h-[100%] bg-white flex items-center justify-between relative overflow-hidden group hover:bg-primary border-primary border transition-all duration-700 ease-in-out"
    >
      <div className="ml-10 group-hover:text-white relative z-10 ">
        <p className="font-bold text-lg text-primary group-hover:text-white transition-colors">{title}</p>
        <p className="text-base text-primary group-hover:text-white transition-colors">{subTitle}</p>
      </div>
      <Button variant="link" className="relative z-10">
        <div className="m-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary group-hover:bg-white">
          <HiChevronRight className="text-white text-base font-bold group-hover:text-primary" />
        </div>
      </Button>
      
      <div
        className={cn(
          'group w-[196px] h-[196px] rounded-full bg-secondary absolute left-[-52px] top-[80px] transition-transform duration-700 ease-in-out transform group-hover:translate-x-[310px] group-hover:translate-y-[-235px] group-hover:bg-primary/60'
        )}
      />
   </a>
  )
}
