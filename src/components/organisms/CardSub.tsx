import { Button } from '../ui/button'
import { HiChevronRight } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface CardSubProps {
  title: string
  subTitle: string
  href: string
}

export default function Card({ title, subTitle, href }: CardSubProps) {
  return (
    <Link
      to={href}
      className="w-[100%] h-[120px] bg-primary rounded-[20px] flex items-center justify-between relative overflow-hidden group hover:bg-white border-primary border transition-all duration-700 ease-in-out"
    >
      <div className="ml-10 group-hover:text-primary relative z-10 ">
        <p className="font-extrabold text-lg text-white group-hover:text-primary transition-colors">{title}</p>
        <p className="text-base text-white group-hover:text-primary transition-colors">{subTitle}</p>
      </div>
      <Button variant="link" className="relative z-10">
        <div className="m-3 flex h-6 w-6 items-center justify-center rounded-full bg-white group-hover:bg-primary">
          <HiChevronRight className="text-primary text-base font-bold group-hover:text-white" />
        </div>
      </Button>
      <div
        className={cn(
          'group w-[196px] h-[196px] rounded-full bg-[#D71F50] absolute left-[-52px] top-[80px] transition-transform duration-700 ease-in-out transform group-hover:translate-x-[310px] group-hover:translate-y-[-235px] group-hover:bg-primary/60'
        )}
      />
    </Link>
  )
}
