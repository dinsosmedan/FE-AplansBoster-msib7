import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface BaseActionProps {
  onDelete?: () => void
  onEdit?: () => void
  onDetail?: () => void
}
const Action = ({ onDelete, onEdit, onDetail }: BaseActionProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="gap-2 border-none rounded-lg inline-flex relative items-center justify-center text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden bg-primary text-zinc-50 hover:bg-[#C21D49] disabled:bg-primary/80 h-10 px-4 py-2">
          <span>Action</span>
          <HiOutlineExclamationCircle className="text-lg" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          {onEdit ? (
            <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left" onClick={onEdit}>
              <DropdownMenuLabel className="text-primary">Edit</DropdownMenuLabel>
            </DropdownMenuItem>
          ) : null}
          {onDelete ? (
            <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left">
              <DropdownMenuLabel className="text-primary" onClick={onDelete}>
                Hapus
              </DropdownMenuLabel>
            </DropdownMenuItem>
          ) : null}
          {onDetail ? (
            <DropdownMenuItem className="cursor-pointer">
              <DropdownMenuLabel className="text-primary" onClick={onDetail}>
                Detail
              </DropdownMenuLabel>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Action
