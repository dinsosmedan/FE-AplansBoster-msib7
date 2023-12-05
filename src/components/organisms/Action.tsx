import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import { Button } from '../ui/button'
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
        <DropdownMenuTrigger>
          <Button className="gap-2 border-none rounded-lg" type="submit">
            <span>Action</span>
            <HiOutlineExclamationCircle className="text-lg" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          {onEdit ? (
            <DropdownMenuItem className="cursor-pointer">
              <button onClick={onEdit} className="flex-1 w-full text-left">
                <DropdownMenuLabel className="text-primary">Edit</DropdownMenuLabel>
              </button>
            </DropdownMenuItem>
          ) : null}
          {onDelete ? (
            <DropdownMenuItem className="cursor-pointer">
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
