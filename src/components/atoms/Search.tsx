import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Search({ className, ...props }: InputProps) {
  return (
    <div className="relative flex items-center flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
      <Input
        className={cn(
          'placeholder:text-[#8897AD]  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
          className
        )}
        {...props}
      />
    </div>
  )
}
