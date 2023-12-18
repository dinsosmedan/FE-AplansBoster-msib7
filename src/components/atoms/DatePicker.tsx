import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  selected: Date
  onChange: (date: Date) => void
  placeholder?: string
  className?: string
}

export default function DatePicker({ selected, onChange, placeholder, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'hover:text-black w-full justify-start text-left font-normal bg-[#F7FBFF] border-[#D4D7E3]',
            selected && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#8897AD]" />
          {selected ? format(selected, 'PPP') : <span className="text-[#8897AD]">{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selected}
          onSelect={(date) => {
            date !== undefined && onChange(date)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
