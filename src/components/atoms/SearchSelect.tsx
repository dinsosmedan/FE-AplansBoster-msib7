import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'

export interface OptionType {
  label: string
  value: string
}

interface SearchSelectProps {
  options: OptionType[]
  selected: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  className?: string
  width?: string
  disabled?: boolean
}

export default function SearchSelect({
  options,
  selected,
  onChange,
  className,
  placeholder,
  width,
  disabled,
  ...props
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'w-full justify-between border-[#D4D7E3] bg-[#F7FBFF] p-0 md:p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8897AD] focus-visible:ring-offset-2 ring-offset-[#F7FBFF] hover:bg-[#f1f7fd] hover:text-zinc-900 relative',
              className
            )}
            onClick={() => setOpen(!open)}
          >
            <p className={cn('font-normal truncate-1', selected ? 'text-font' : 'text-font')}>
              {selected ? options.filter((option) => option.value === selected)[0]?.label : placeholder}
            </p>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('p-0', width ?? 'min-w-full')}>
          <Command>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  )
}
