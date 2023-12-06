import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import * as React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { NotFoundBansos } from '@/assets'
import { useGetAssistanceCheck } from '@/store/server/usePublic'
import { useGetBeneficaryByNIK } from '@/store/server'
import { Loading } from '@/components'

export default function CekBansosUser() {
  useTitle('Cek Bansos')
  const [NIK, setNIK] = React.useState('')

  const {
    data: beneficary,
    refetch: refetchBeneficary,
    isFetching: isFetchingBeneficary,
    isSuccess: isSuccessBeneficary
  } = useGetBeneficaryByNIK(NIK, false)

  const {
    data: assistances,
    refetch: refetchAssistance,
    isFetching: isFetchingAssistance,
    isSuccess: isSuccessAssistance,
    isError: isErrorAssistance
  } = useGetAssistanceCheck(NIK, false)

  const handleRefetch = async () => {
    await refetchBeneficary()
    await refetchAssistance()
  }

  return (
    <section className="bg-[#F9F9F9]">
      {(isFetchingBeneficary || isFetchingAssistance) && <Loading />}
      <section className="h-[250px] w-full bg-[url('@/assets/images/bg-cek-bansos.svg')] bg-cover relative">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white">
            Cek Bansos <span className="text-[#FFB60A]">Sosial</span>
          </h1>
        </div>

        <div className="flex bg-white w-[40%] absolute left-1/2 -translate-x-1/2 -bottom-[28px] shadow-lg rounded-lg">
          <input
            type="text"
            value={NIK}
            onChange={(e) => setNIK(e.target.value)}
            placeholder="Masukkan NIK Anda"
            className="rounded-l-lg px-5 py-[18px] w-full outline-none"
          />
          <Button
            className="py-[30px] rounded-l-none px-6 rounded-r-lg bg-primary text-white font-bold"
            onClick={handleRefetch}
          >
            <HiMagnifyingGlass className="text-2xl" />
          </Button>
        </div>
      </section>
      {!isSuccessAssistance && !isSuccessBeneficary && <div className="min-h-[calc(100vh-340px)]" />}
      {isSuccessAssistance && isSuccessBeneficary && (
        <div className="px-14 pb-9 flex flex-col gap-5 mt-[72px]">
          <section className="bg-white px-9 py-8">
            <Table containerClassName="max-w-none">
              <TableHeader>
                <TableRow className="hover:bg-white border-none">
                  <TableHead className="text-black font-bold text-xl">NIK</TableHead>
                  <TableHead className="text-black font-bold text-xl">Nama</TableHead>
                  <TableHead className="text-black font-bold text-xl">Jenis Kelamin</TableHead>
                  <TableHead className="text-black font-bold text-xl">Kelurahan</TableHead>
                  <TableHead className="text-black font-bold text-xl">Kecamatan</TableHead>
                  <TableHead className="text-black font-bold text-xl">DTKS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-white">
                  <TableCell position="center">{beneficary.identityNumber}</TableCell>
                  <TableCell position="center">{beneficary.name}</TableCell>
                  <TableCell position="center">{beneficary.gender}</TableCell>
                  <TableCell position="center">{beneficary.address.areaLevel3?.name}</TableCell>
                  <TableCell position="center">{beneficary.address.areaLevel4?.name}</TableCell>
                  <TableCell position="center">{beneficary.isDtks ? 'IYA' : 'TIDAK'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
          <section className="bg-white py-14 px-32">
            {isErrorAssistance ? (
              <div className="flex flex-col justify-center items-center">
                <img src={NotFoundBansos} alt="not-found-bansos" />
                <h1 className="font-bold text-3xl text-center mt-9">Tidak Ada Bantuan Sosial Terdaftar</h1>
                <p className="text-[#8B8B8B] max-w-[476px] text-center mt-3">
                  Mohon Maaf, Data Anda Belum Terdaftar dalam Program Bantuan Sosial
                </p>
              </div>
            ) : (
              <Table containerClassName="max-w-none">
                <TableHeader>
                  <TableRow className="hover:bg-white">
                    <TableHead className="text-black font-bold text-xl">Nama Bansos</TableHead>
                    <TableHead className="text-black font-bold text-xl">Tahun</TableHead>
                    <TableHead className="text-black font-bold text-xl">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assistances.assistances.map((assistance) => (
                    <TableRow className="hover:bg-white" key={assistance.id}>
                      <TableCell position="center">{assistance.product.name}</TableCell>
                      <TableCell position="center">{assistance.year}</TableCell>
                      <TableCell position="center">
                        <div className="py-1 px-3 rounded-full bg-green-300">
                          <p className="text-green-700 font-medium text-xs">{assistance.status}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </section>
        </div>
      )}
    </section>
  )
}
