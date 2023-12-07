import { HiChevronDown } from 'react-icons/hi2'
import { Button } from '../ui/button'
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
        <DropdownMenuTrigger>
          <Button variant="outline" className="gap-4 border-primary text-primary rounded-lg" type="submit">
            <span>Export</span>
            <HiChevronDown className="text-lg" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <button onClick={onExportFirst} className="flex-1 w-full text-left">
              <DropdownMenuLabel>xlsx</DropdownMenuLabel>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <button onClick={onExportSecond} className="flex-1 w-full text-left">
              <DropdownMenuLabel>csv</DropdownMenuLabel>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
