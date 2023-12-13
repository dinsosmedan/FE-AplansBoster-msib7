import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HiAcademicCap, HiChevronDown, HiFunnel, HiMiniCheck, HiXMark } from 'react-icons/hi2'

export default function SubmissionHistory() {
  return (
    <div className="bg-[#F9F9F9] px-[342px] py-[38px]">
      <div className="bg-white h-[647px]">
        <div className="py-[53px] px-8 flex justify-between">
          <p className="text-[26px] font-semibold">Riwayat Pengajuan</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#ECF0F4] rounded-lg inline-flex relative items-center justify-center text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden border  h-10 px-4 py-2">
              <HiFunnel className="text-2xl" />
              <span className="px-6">SKTM</span>
              <HiChevronDown className="text-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#ECF0F4] w-[155px] ">
              <DropdownMenuItem className=" cursor-pointer text-left">
                <DropdownMenuLabel>xlsx</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-left">
                <DropdownMenuLabel>csv</DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 gap-7">
          <div className="pl-[90px] flex">
            <div className="bg-red-600/10  rounded-full w-14 h-14 flex items-center justify-center ">
              <HiAcademicCap className="w-10 h-10 text-primary" />
            </div>
            <div className="flex flex-col pl-7 gap-1">
              <p className="text-xl font-semibold">SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)</p>
              <div className="flex items-center gap-2">
                <div className="bg-[#5BC665] w-[18px] h-[18px] rounded-md flex items-center justify-center">
                  <HiMiniCheck className="text-white" />
                </div>
                <span className="text-base font-medium">Diterima</span>
              </div>
              <p className="text-[#8B8B8B] text-">7 Jam Lalu</p>
            </div>
          </div>
          <div className="pl-[90px] flex">
            <div className="bg-red-600/10  rounded-full w-14 h-14 flex items-center justify-center ">
              <HiAcademicCap className="w-10 h-10 text-primary" />
            </div>
            <div className="flex flex-col pl-7 gap-1">
              <p className="text-xl font-semibold">SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)</p>
              <div className="flex items-center gap-2">
                <div className="bg-primary w-[18px] h-[18px] rounded-md flex items-center justify-center">
                  <HiXMark className="text-white" />
                </div>
                <span className="text-base font-medium">Diterima</span>
              </div>
              <p className="text-[#8B8B8B] text-">7 Jam Lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
