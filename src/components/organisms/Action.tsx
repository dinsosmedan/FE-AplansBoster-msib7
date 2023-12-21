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
  editText?: string
  detailText?: string
  deleteText?: string
}
const Action = ({ onDelete, onEdit, onDetail, editText, deleteText, detailText }: BaseActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="gap-2 border-none rounded-lg inline-flex relative items-center justify-center text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden bg-primary text-zinc-50 hover:bg-[#C21D49] disabled:bg-primary/80 h-10 px-4 py-2">
        <span>Action</span>
        <HiOutlineExclamationCircle className="text-lg" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5">
        {onEdit ? (
          <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left hover:bg-zinc-100" onClick={onEdit}>
            <DropdownMenuLabel className="text-primary w-full flex-1">{editText ?? 'Edit'}</DropdownMenuLabel>
          </DropdownMenuItem>
        ) : null}
        {onDelete ? (
          <DropdownMenuItem className="cursor-pointer flex-1 w-full text-left hover:bg-zinc-100">
            <DropdownMenuLabel className="text-primary w-full flex-1" onClick={onDelete}>
              {deleteText ?? 'Hapus'}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ) : null}
        {onDetail ? (
          <DropdownMenuItem className="cursor-pointer hover:bg-zinc-100">
            <DropdownMenuLabel className="text-primary w-full flex-1" onClick={onDetail}>
              {detailText ?? 'Detail'}
            </DropdownMenuLabel>
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Action
