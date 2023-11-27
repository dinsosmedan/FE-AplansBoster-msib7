import {
  HiClipboardDocumentCheck,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiFolderOpen,
  HiMagnifyingGlassCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineFolderOpen,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiSquares2X2,
  HiUserGroup,
  HiOutlineChartBar,
  HiChartBar,
  HiMegaphone,
  HiOutlineMegaphone
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
    activeIcon: HiChartBar,
    inactiveIcon: HiOutlineChartBar
  },
   {
    link: '/cek-data-dukcapil',
    title: 'Cek Data Dukcapil',
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
    link: '/data-master',
    title: 'Data Master',
    activeIcon: HiFolderOpen,
    inactiveIcon: HiOutlineFolderOpen
  },
  {
    link: '/event',
    title: 'Event',
    activeIcon: HiMegaphone,
    inactiveIcon: HiOutlineMegaphone
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
