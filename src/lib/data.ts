import {
  HiArchiveBox,
  HiCircleStack,
  HiClipboardDocumentCheck,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiFolderOpen,
  HiMagnifyingGlassCircle,
  HiOutlineArchiveBox,
  HiOutlineCircleStack,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineFolderOpen,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiSquares2X2,
  HiUserGroup
} from 'react-icons/hi2'

export const MAIN_MENU = [
  {
    link: '/',
    title: 'Dashboard',
    activeIcon: HiSquares2X2,
    inactiveIcon: HiOutlineSquares2X2
  },
  {
    link: '/layanan',
    title: 'Layanan',
    activeIcon: HiClipboardDocumentList,
    inactiveIcon: HiOutlineClipboardDocumentList
  },
  {
    link: '/data-penerima',
    title: 'Data Penerima',
    activeIcon: HiClipboardDocumentCheck,
    inactiveIcon: HiOutlineClipboardDocumentCheck
  },
  {
    link: '/cek-riwayat-bansos',
    title: 'Cek Riwayat Bansos',
    activeIcon: HiMagnifyingGlassCircle,
    inactiveIcon: HiOutlineMagnifyingGlassCircle
  },
  {
    link: '/cek-data-dukcapil',
    title: 'Cek Data Dukcapil',
    activeIcon: HiCircleStack,
    inactiveIcon: HiOutlineCircleStack
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
