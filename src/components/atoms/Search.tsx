import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Search({ className, ...props }: InputProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <HiOutlineMagnifyingGlass size="1em" className="text-xl text-[#8897AD]" />
      </div>
      <Input
        className={cn(
          'pl-10 placeholder:text-[#8897AD] bg-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
          className
        )}
        {...props}
      />
    </div>
  )
}
