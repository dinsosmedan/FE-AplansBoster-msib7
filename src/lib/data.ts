import {
  HiArchiveBox,
  HiClipboardDocumentCheck,
  HiCog6Tooth,
  HiFolderOpen,
  HiMagnifyingGlassCircle,
  HiOutlineArchiveBox,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog6Tooth,
  HiOutlineFolderOpen,
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
  HiUserGroup
} from 'react-icons/hi2'

export const MAIN_MENU = [
  {
    link: '/data-penerima',
    title: 'Data Penerima',
    activeIcon: HiClipboardDocumentCheck,
    inactiveIcon: HiOutlineClipboardDocumentCheck
  },
  {
    link: '/profiling-masyarakat',
    title: 'Profiling Masyarakat',
    activeIcon: HiMagnifyingGlassCircle,
    inactiveIcon: HiOutlineMagnifyingGlass
  },
  {
    link: '/data-master',
    title: 'Data Master',
    activeIcon: HiFolderOpen,
    inactiveIcon: HiOutlineFolderOpen
  },
  {
    link: '/data-dtks',
    title: 'Data DTKS',
    activeIcon: HiArchiveBox,
    inactiveIcon: HiOutlineArchiveBox
  }
]

export const MENU_MANAJEMEN = [
  {
    link: '/manajemen-role',
    title: 'Manajemen Role',
    activeIcon: HiCog6Tooth,
    inactiveIcon: HiOutlineCog6Tooth
  },
  {
    link: '/manajemen-user',
    title: 'Manajemen User',
    activeIcon: HiUserGroup,
    inactiveIcon: HiOutlineUserGroup
  }
]

export const SUB_MENU_LAYANAN = [
  {
    link: '/layanan/rehabsos',
    title: 'Rehabsos'
  },
  {
    link: '/layanan/dayasos',
    title: 'Dayasos'
  },
  {
    link: '/layanan/linjamsos',
    title: 'Linjamsos'
  }
]
