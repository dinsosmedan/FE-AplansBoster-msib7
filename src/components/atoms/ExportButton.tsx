import { HiChevronDown } from 'react-icons/hi2'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '../ui/dropdown-menu'

interface ExportButtonProps {
  onExportFirst: () => void
  onExportSecond: () => void
}

export default function ExportButton({ onExportFirst, onExportSecond }: ExportButtonProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="gap-4 border-primary text-primary rounded-lg inline-flex relative items-center justify-center text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden border bg-white hover:bg-zinc-100 hover:text-primary disabled:bg-white/80 h-10 px-4 py-2">
          <span>Export</span>
          <HiChevronDown className="text-lg" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left" onClick={onExportFirst}>
            <DropdownMenuLabel>xlsx</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left" onClick={onExportSecond}>
            <DropdownMenuLabel>csv</DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
