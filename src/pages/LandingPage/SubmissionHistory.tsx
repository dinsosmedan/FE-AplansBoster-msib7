import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HiAcademicCap, HiChevronDown, HiFunnel, HiMiniCheck } from 'react-icons/hi2'
import * as React from 'react'
import { useFetchRiwayatSktm } from '@/store/server/useService'
import { Loading } from '@/components'
import { waktuLalu } from '@/lib/services/formatDate'

export default function SubmissionHistory() {
  const [filter, setfilter] = React.useState('SKTM')

  const { data, refetch, isLoading } = useFetchRiwayatSktm(filter)

  if (isLoading) {
    return <Loading />
  }

  // React.useEffect(() => {
  //   setfilter(filter ?? '')
  // }, [filter])

  const onChangeFilter = async (params: any) => {
    setfilter(params)
    await refetch()
  }

  return (
    <div className="bg-[#F9F9F9] lg:px-[342px] py-[38px] flex justify-center pt-20">
      <div className="bg-white h-[647px] w-[90%] md:px-5 shadow-sm mb-[150px]">
        <div className="py-[53px] px-8 md:flex md:justify-between">
          <div className="mb-5 md:mb-0">
            <p className="md:text-[24px] text-[20px] font-semibold">Riwayat Pengajuan</p>
            <p className="text-[14px] text-[#8b8b8b]">Lihat riwayat pengajuan online yang pernah kamu ajuakan</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#ECF0F4] w-[100%]  md:w-auto rounded-lg inline-flex relative items-center justify-center text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden  h-10 px-4 py-2">
              <HiFunnel className="text-2xl text-[#8b8b8b]" />
              <span className="px-6">{filter}</span>
              <HiChevronDown className="text-lg " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#ECF0F4] w-[155px] ">
              <DropdownMenuItem className=" cursor-pointer text-left">
                <DropdownMenuLabel className="w-full" onClick={async () => await onChangeFilter('SKTM')}>
                  SKTM
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-left">
                <DropdownMenuLabel className="w-full" onClick={async () => await onChangeFilter('BBP')}>
                  BBP
                </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 gap-7">
          {data.map((riwayat: any, index: any) => {
            const title =
              riwayat.applicationCategory === 'dtks-schools'
                ? 'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'
                : riwayat.applicationCategory === 'non-dtks-schools'
                ? 'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'
                : riwayat.applicationCategory === 'dtks-courts'
                ? 'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'
                : riwayat.applicationCategory === 'non-dtks-courts'
                ? 'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'
                : ''
            const waktuDiberikan = new Date(riwayat.createdAt)
            const waktulalu = waktuLalu(waktuDiberikan)
            return (
              <div className="md:pl-[90px] pl-[20px] flex" key={index}>
                <div className="bg-red-600/10  rounded-full md:w-14 w-16 md:h-14 h-11 flex items-center justify-center ">
                  <HiAcademicCap className="md:w-10 w-8 md:h-10 h-8 text-primary" />
                </div>
                <div className="flex flex-col md:pl-7 pl-4 gap-1">
                  <p className="lg:text-lg text-md font-semibold">{title}</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#5BC665] w-[18px] h-[18px] rounded-md flex items-center justify-center">
                      {}
                      <HiMiniCheck className="text-white" />
                    </div>
                    {riwayat?.applicationStatus && (
                      <span className="text-sm font-medium capitalize">{riwayat?.applicationStatus}</span>
                    )}
                  </div>
                  <small className="text-[#8B8B8B]">{waktulalu}</small>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
