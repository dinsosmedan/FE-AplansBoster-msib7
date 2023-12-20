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
  HiOutlineMegaphone,
  HiArchiveBox,
  HiOutlineArchiveBox,
  HiUsers,
  HiOutlineUsers
} from 'react-icons/hi2'

export const MAIN_MENU = [
  {
    link: '/dashboard',
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
  },
  {
    link: '/manajemen-admin',
    title: 'Manajemen Admin',
    activeIcon: HiUsers,
    inactiveIcon: HiOutlineUsers
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
export const COMMUNITY_ACTIVITY_CODE = [
  { label: 'MUSLIM' },
  { label: 'NASRANI' },
  { label: 'HINDU' },
  { label: 'BUDDHA' },
  { label: 'KHONGHUCU' },
  { label: 'UMUM' }
]

export const COMMUNITY_ASSISTANCE_TYPE = [{ label: 'Paket Sembako' }, { label: 'Santunan' }, { label: 'Sandang' }]

export const lastEducationLists = [
  { value: 'TIDAK/BLM SEKOLAH', label: 'Tidak/belum sekolah' },
  { value: 'BELUM TAMAT SD/SEDERAJAT', label: 'Belum tamat SD/sederajat' },
  { value: 'TAMAT SD/SEDERAJAT', label: 'Tamat SD/sederajat' },
  { value: 'SLTP/SEDERAJAT', label: 'SLTP/sederajat' },
  { value: 'SLTA/SEDERAJAT', label: 'SLTA/sederajat' },
  { value: 'DIPLOMA I/II', label: 'Diploma I/II' },
  { value: 'AKADEMI/DIPLOMA III/SARJANA MUDA', label: 'Akademi/Diploma III/Sarjana Muda' },
  { value: 'DIPLOMA IV/STRATA I', label: 'Diploma IV/Strata I' },
  { value: 'STRATA II', label: 'Strata II' },
  { value: 'STRATA III', label: 'Strata III' }
]

export const religionLists = [
  { value: 'ISLAM', label: 'Islam' },
  { value: 'KRISTEN', label: 'Kristen' },
  { value: 'KATHOLIK', label: 'Katholik' },
  { value: 'HINDU', label: 'Hindu' },
  { value: 'BUDDHA', label: 'Budha' },
  { value: 'KHONGHUCU', label: 'Khonghucu' },
  { value: 'KEPERCAYAAN TERHADAP TUHAN YME', label: 'Kepercayaan terhadap Tuhan YME' }
]

export const citizenshipLists = [
  { value: 'WNI', label: 'Warga Negara Indonesia' },
  { value: 'WNA', label: 'Warga Negara Asing' }
]

export const relationshipLists = [
  'ISTRI',
  'ANAK',
  'FAMILI LAIN',
  'KEPALA KELUARGA',
  'CUCU',
  'LAINNYA',
  'MERTUA',
  'ORANG TUA',
  'BLM DITENTUKAN',
  'SUAMI',
  'MENANTU',
  'PEMBANTU'
]

export const JENIS_RUMAH_IBADAH = [
  'MESJID',
  'MUSHOLLA',
  'GEREJA',
  'GEREJA KATOLIK',
  'KUIL BUDHA',
  'KUIL HINDU',
  'KONG HU CHU'
]

export const STATUS_DTKS = [
  { value: 'prelist', label: 'Prelist' },
  { value: 'dtks', label: 'DKTS' },
  { value: 'non-dtks', label: 'Non DTKS' }
]
export const CATEGORY_APPLICATION = [
  { value: 'dtks-schools' },
  { value: 'non-dtks-schools' },
  { value: 'dtks-courts' },
  { value: 'non-dtks-courts' }
]

export const STATUS_EVENT = [
  { value: 'inactive', label: 'Inactive' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' }
]
export const RIWAYAT_MENU = [
  { value: 'inactive', label: 'Inactive' },
  { value: 'in-progress', label: 'In Progress' }
]
