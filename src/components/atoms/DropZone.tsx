import { cn } from '@/lib/utils'
import { type IconType } from 'react-icons'

interface DropZoneProps {
  title: string
  subtitle?: string
  icon: IconType
  className?: string
}

export default function DropZone({ title, subtitle, icon: Icon, className }: DropZoneProps) {
  return (
    <div className="flex flex-col">
      <p className="text-base font-medium pb-4">{subtitle}</p>
      <div className={cn('flex h-[190px] w-[610px] border-dashed border-2 border-primary rounded-md bg-[#ECF0F4]', className)}>
        <div className="m-auto flex flex-col justify-center items-center">
          <div className="w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center mb-4">
            <Icon className="h-[39px] w-[39px] text-white" />
          </div>
          <p className="text-center text-base text-primary underline">{title}</p>
        </div>
      </div>
    </div>
  )
}
