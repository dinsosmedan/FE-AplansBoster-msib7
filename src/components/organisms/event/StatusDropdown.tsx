import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HiChevronDown } from 'react-icons/hi2'
import * as React from 'react'
import { STATUS_DTKS } from '@/lib/data'

interface StatusDropdownProps {
  action: (status: string) => Promise<void>
  value: string
}

export default function StatusDropdown({ action, value }: StatusDropdownProps) {
  const [label, setLabel] = React.useState('')

  React.useEffect(() => {
    setLabel(value ?? '')
  }, [value])

  const handleChange = async (status: string, label: string) => {
    setLabel(label)
    await action(status)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="gap-2 rounded-lg inline-flex relative items-center justify-between text-xs font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden min-w-[116px] bg-white border-primary border text-primary hover:bg-zinc-200 h-10 px-3 py-1.5">
        <span className="uppercase">{label || 'Pilih Status'}</span>
        <HiChevronDown className="text-sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5">
        {STATUS_DTKS.map((status, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer flex-1 w-full text-left hover:bg-zinc-100">
            <DropdownMenuLabel
              className="text-font w-full flex-1"
              onClick={async () => await handleChange(status.value, status.label)}
            >
              {status.label}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
