import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { HiOutlineEye } from 'react-icons/hi2'

interface BerkasProps {
  title: string
  url: string
}

export default function Berkas({ title, url }: BerkasProps) {
  const location = useLocation()

  return (
    <div className="py-[18px] px-3 flex justify-between items-center border-b border-zinc-200">
      <p className="uppercase w-max">{title}</p>
      <Link to={url || location.pathname} target="_blank">
        <Button className="gap-2 rounded-lg ml-24 items-center" type="button">
          <HiOutlineEye />
          <p className="text-xs">View</p>
        </Button>
      </Link>
    </div>
  )
}
