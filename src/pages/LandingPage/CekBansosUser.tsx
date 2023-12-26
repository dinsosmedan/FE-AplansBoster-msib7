import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import * as React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDisableBodyScroll, useTitle } from '@/hooks'
import { CekBansosIlustration, NotFoundBansos } from '@/assets'
import { useGetAssistanceCheck } from '@/store/server/usePublic'
import { Loading, NoData } from '@/components'
import { cn } from '@/lib/utils'

export default function CekBansosUser() {
  useTitle('Cek Bansos')

  const [NIK, setNIK] = React.useState('')

  const {
    data,
    refetch: refetchAssistance,
    isFetching: isFetchingAssistance,
    isSuccess: isSuccessAssistance,
    isError: isErrorAssistance
  } = useGetAssistanceCheck(NIK, false)

  useDisableBodyScroll(isFetchingAssistance)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (NIK) {
      await refetchAssistance()
    }
  }

  return (
    <section className="bg-[#F9F9F9]">
      {isFetchingAssistance && <Loading />}
      <section className="h-[250px] w-full bg-[url('@/assets/images/bg-cek-bansos.webp')] bg-cover relative">
        <div className="flex items-center justify-center h-full">
          <h1 className="lg:text-5xl md:text-3xl text-3xl font-bold text-white">
            Cek Bantuan <span className="text-[#FFB60A]">Sosial</span>
          </h1>
        </div>

        <form
          className="flex bg-white lg:w-[40%] md:w-[70%] w-[95%] absolute left-1/2 -translate-x-1/2 -bottom-[28px] shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="number"
            value={NIK}
            onChange={(e) => setNIK(e.target.value)}
            placeholder="Masukkan NIK Anda"
            className="rounded-l-lg px-5 py-[18px] w-full outline-none"
          />
          <Button className="py-[30px] rounded-l-none px-6 rounded-r-lg bg-primary text-white font-bold" type="submit">
            <HiMagnifyingGlass className="text-2xl" />
          </Button>
        </form>
      </section>
      <div className="md:px-14 px-5 pb-9 flex flex-col gap-5 mt-[72px] min-h-[calc(100vh-180px)]">
        {!isSuccessAssistance && !isErrorAssistance && (
          <NoData
            image={CekBansosIlustration}
            title="Cek BANSOS Anda"
            desc="Silahkan Masukkan NIK Anda Untuk Mengecek Daftar Bantuan Sosial Anda"
          />
        )}
        {isSuccessAssistance && (
          <React.Fragment>
            <section className="bg-white px-9 py-8 hidden lg:block">
              <Table containerClassName="max-w-none">
                <TableHeader>
                  <TableRow className="hover:bg-white border-none">
                    <TableHead className="text-black font-bold text-xl">NIK</TableHead>
                    <TableHead className="text-black font-bold text-xl">Nama</TableHead>
                    {/* <TableHead className="text-black font-bold text-xl">Jenis Kelamin</TableHead> */}
                    <TableHead className="text-black font-bold text-xl">Kecamatan</TableHead>
                    <TableHead className="text-black font-bold text-xl">Kelurahan</TableHead>
                    <TableHead className="text-black font-bold text-xl">DTKS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-white">
                    <TableCell position="center">{data?.identityNumber}</TableCell>
                    <TableCell position="center">{data?.name}</TableCell>
                    {/* <TableCell position="center">{data?.gender}</TableCell> */}
                    <TableCell position="center">{data?.address.areaLevel3?.name}</TableCell>
                    <TableCell position="center">{data?.address.areaLevel4?.name}</TableCell>
                    <TableCell position="center">{data?.isDtks ? 'IYA' : 'TIDAK'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
            <section className="bg-white px-9 py-8 lg:hidden">
              <div className="flex flex-col gap-5 grid md:grid-cols-2 text-center">
                <div>
                  <p className="text-base font-bold">NIK</p>
                  <p className="text-base ">{data?.identityNumber}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Nama</p>
                  <p className="text-base ">{data?.name}</p>
                </div>
                {/* <div>
                <p className="text-base font-bold">Jenis Kelamin</p>
                <p className="text-base ">{beneficary?.gender}</p>
              </div> */}
                <div>
                  <p className="text-base font-bold">Kecamatan</p>
                  <p className="text-base ">{data?.address.areaLevel3?.name}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Kelurahan</p>
                  <p className="text-base">{data?.address.areaLevel4?.name}</p>
                </div>
                <div>
                  <p className="text-base font-bold">DTKS</p>
                  <p className="text-base">{data?.isDtks ? 'IYA' : 'TIDAK'}</p>
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
        {isSuccessAssistance && data.assistances.length > 0 ? (
          <section className="bg-white py-14 lg:px-32 md:px-14 px-5 mb-20 lg:mb-0">
            <Table containerClassName="max-w-none">
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead className="text-black font-bold text-xl">Nama Bansos</TableHead>
                  <TableHead className="text-black font-bold text-xl">Tahun</TableHead>
                  <TableHead className="text-black font-bold text-xl">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.assistances.map((assistance) => (
                  <TableRow className="hover:bg-white" key={assistance.id}>
                    <TableCell position="center">{assistance.product.name}</TableCell>
                    <TableCell position="center">{assistance.year}</TableCell>
                    <TableCell position="center">
                      <div
                        className={cn(
                          'py-1 px-3 rounded-full',
                          assistance.status === 'approved' ? 'bg-green-300' : 'bg-red-300'
                        )}
                      >
                        <p
                          className={cn(
                            'font-medium text-xs',
                            assistance.status === 'approved' ? 'text-green-700' : 'text-red-700'
                          )}
                        >
                          {assistance.status}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        ) : (
          <NoData
            image={NotFoundBansos}
            title="Tidak Ada Bantuan Sosial Terdaftar"
            desc="Mohon Maaf, Data Anda Belum Terdaftar dalam Program Bantuan Sosial"
          />
        )}
        {isErrorAssistance && (
          <NoData
            image={NotFoundBansos}
            title="Tidak Ada Bantuan Sosial Terdaftar"
            desc="Mohon Maaf, Data Anda Belum Terdaftar dalam Program Bantuan Sosial"
          />
        )}
      </div>
    </section>
  )
}
