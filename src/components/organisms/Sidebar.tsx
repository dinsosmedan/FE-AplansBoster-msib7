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
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="flex-[1.5] flex flex-col px-[33px] py-[42px] gap-10 border-r border-[#E9E9E9] h-screen">
      <img src={Logo} alt="logo" className="w-full" />
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="uppercase text-[#C7C7C7] text-xs font-bold">Main Menu</span>
          <nav className="flex flex-col gap-3">
            <NavLink to="/">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiSquares2X2 className="text-xl" />
                  <span>Dashboard</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/layanan">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineClipboardDocumentList className="text-xl" />
                  <span>Layanan</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/data-penerima">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineClipboardDocumentCheck className="text-xl" />
                  <span>Data Penerima</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/profiling-masyarakat">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineMagnifyingGlassCircle className="text-xl" />
                  <span>Profiling Masyarakat</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/data-master">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineFolderOpen className="text-xl" />
                  <span>Data Master</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/data-dtks">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineArchiveBox className="text-xl" />
                  <span>Data DTKS</span>
                </Button>
              )}
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <span className="uppercase text-[#C7C7C7] text-xs font-bold">MENU MANAJEMEN </span>
          <nav className="flex flex-col gap-3">
            <NavLink to="/manajemen-role">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineCog6Tooth className="text-xl" />
                  <span>Manajemen Role</span>
                </Button>
              )}
            </NavLink>
            <NavLink to="/manajemen-user">
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "base"} className="gap-3 justify-start pl-8 w-full">
                  <HiOutlineUserGroup className="text-xl" />
                  <span>Manajemen User</span>
                </Button>
              )}
            </NavLink>
          </nav>
        </div>
      </section>
    </aside>
  )
}
