import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, X, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface OptionType {
  label: string
  value: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  placeholder?: string
  className?: string
  width?: string
}

function MultiSelect({ options, selected, onChange, className, placeholder, width, ...props }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <React.Fragment>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-[#D4D7E3] bg-[#F7FBFF] p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8897AD] focus-visible:ring-offset-2 ring-offset-[#F7FBFF] hover:bg-[#f1f7fd] hover:text-zinc-900"
            onClick={() => {
              setOpen(!open)
            }}
          >
            <p className="text-[#A1A1A1] font-normal">{placeholder}</p>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('p-0', width ?? 'min-w-full')}>
          <Command className={className}>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected?.includes(option.value)
                        ? selected?.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', selected?.includes(option.value) ? 'opacity-100' : 'opacity-0')}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <section className="flex flex-col pt-2 divide-y divide-[##E1E1E1]">
        {selected.length > 0
          ? selected.map((item, index) => (
              <div className="flex justify-between items-center px-5 py-2.5 bg-[#F9FAFC]" key={index}>
                <p className="text-sm font-medium">{options.find((option) => option.value === item)?.label}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-sm hover:text-black"
                  onClick={() => {
                    handleUnselect(item)
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </Button>
              </div>
            ))
          : null}
      </section>
    </React.Fragment>
  )
}

export default MultiSelect
