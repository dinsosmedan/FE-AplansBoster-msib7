import { Logo } from '@/assets'
import { Button } from '../ui/button'
import {
  HiOutlineArchiveBox,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineFolderOpen,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineUserGroup,
  HiSquares2X2
} from 'react-icons/hi2'

export default function Sidebar() {
  return (
    <aside className="flex-[1.5] flex flex-col px-[33px] py-[42px] gap-10 border-r border-[#E9E9E9] h-screen">
      <img src={Logo} alt="logo" className="w-full" />
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="uppercase text-[#C7C7C7] text-xs font-bold">Main Menu</span>
          <nav className="flex flex-col gap-3">
            <Button className="gap-3 justify-start pl-8">
              <HiSquares2X2 className="text-xl" />
              <span>Dashboard</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineClipboardDocumentList className="text-xl" />
              <span>Layanan</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineClipboardDocumentCheck className="text-xl" />
              <span>Data Penerima</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineMagnifyingGlassCircle className="text-xl" />
              <span>Profiling Masyarakat</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineFolderOpen className="text-xl" />
              <span>Data Master</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineArchiveBox className="text-xl" />
              <span>Data DTKS</span>
            </Button>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <span className="uppercase text-[#C7C7C7] text-xs font-bold">MENU MANAJEMEN </span>
          <nav className="flex flex-col gap-3">
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineCog6Tooth className="text-xl" />
              <span>Manajemen Role</span>
            </Button>
            <Button variant="base" className="gap-3 justify-start pl-8">
              <HiOutlineUserGroup className="text-xl" />
              <span>Manajemen User</span>
            </Button>
          </nav>
        </div>
      </section>
    </aside>
  )
}
