import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import * as React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDisableBodyScroll, useTitle } from '@/hooks'
import { CekBansosIlustration, NotFoundBansos } from '@/assets'
import { useGetAssistanceCheck } from '@/store/server/usePublic'
import { useGetBeneficaryByNIK } from '@/store/server'
import { Loading, NoData } from '@/components'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export default function CekBansosUser() {
  useTitle('Cek Bansos')

  const { toast } = useToast()
  const [NIK, setNIK] = React.useState('')

  const {
    data: beneficary,
    refetch: refetchBeneficary,
    isFetching: isFetchingBeneficary,
    isSuccess: isSuccessBeneficary,
    isError: isErrorBeneficary
  } = useGetBeneficaryByNIK(NIK, false)

  const {
    data: assistances,
    refetch: refetchAssistance,
    isFetching: isFetchingAssistance,
    isSuccess: isSuccessAssistance,
    isError: isErrorAssistance
  } = useGetAssistanceCheck(NIK, false)

  useDisableBodyScroll(isFetchingBeneficary || isFetchingAssistance)

  React.useEffect(() => {
    if (isErrorBeneficary) {
      toast({
        title: 'NIK Tidak Ditemukan',
        description: 'Mohon periksa kembali NIK Anda',
        variant: 'destructive'
      })
    }
  }, [isErrorBeneficary])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (NIK) {
      await refetchBeneficary()
      await refetchAssistance()
    }
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

        <form
          className="flex bg-white w-[40%] absolute left-1/2 -translate-x-1/2 -bottom-[28px] shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
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
      <div className="px-14 pb-9 flex flex-col gap-5 mt-[72px] min-h-[calc(100vh-340px)]">
        {!isSuccessBeneficary && !isSuccessAssistance && (
          <NoData
            image={CekBansosIlustration}
            title="Cek BANSOS Anda"
            desc="Silahkan Masukkan NIK Anda Untuk Mengecek Daftar Bantuan Sosial Anda"
          />
        )}
        {isSuccessBeneficary && (
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
                  <TableCell position="center">{beneficary?.identityNumber}</TableCell>
                  <TableCell position="center">{beneficary?.name}</TableCell>
                  <TableCell position="center">{beneficary?.gender}</TableCell>
                  <TableCell position="center">{beneficary?.address.areaLevel3?.name}</TableCell>
                  <TableCell position="center">{beneficary?.address.areaLevel4?.name}</TableCell>
                  <TableCell position="center">{beneficary?.isDtks ? 'IYA' : 'TIDAK'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        )}
        {isSuccessAssistance && (
          <section className="bg-white py-14 px-32">
            <Table containerClassName="max-w-none">
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead className="text-black font-bold text-xl">Nama Bansos</TableHead>
                  <TableHead className="text-black font-bold text-xl">Tahun</TableHead>
                  <TableHead className="text-black font-bold text-xl">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assistances?.assistances.map((assistance) => (
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
