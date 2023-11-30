/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

// Assuming SelectSingleEventHandler is a generic type
// ... (previous imports)

interface DatePickerProps {
  selected: Date
  onChange: (date: Date) => void
  placeholder?: string
  className?: string
}

export default function DatePicker({ selected, onChange, placeholder, className }: DatePickerProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'hover:text-black w-[370px] justify-start text-left font-normal bg-[#F7FBFF]',
              selected && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => date !== undefined && onChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
