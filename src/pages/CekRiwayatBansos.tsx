import { Button } from '@/components/ui/button'
import useTitle from '@/hooks/useTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import * as React from 'react'
import { Loading, Modal, Search } from '@/components'
import { useGetAssistanceHistory, useGetBeneficaryByNIK } from '@/store/server'
import { type IAssistanceHistory } from '@/lib/types/beneficary.type'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useToast } from '@/components/ui/use-toast'
import { useDisableBodyScroll } from '@/hooks'

const CekRiwayatBansos = () => {
  useTitle('Cek Riwayat Bansos ')
  const { toast } = useToast()
  const [NIK, setNIK] = React.useState('')

  const {
    data: beneficary,
    refetch: refetchBeneficary,
    isFetching: isFetchingBeneficary,
    isLoading: isLoadingBeneficary,
    isSuccess: isSuccessBeneficary,
    isError
  } = useGetBeneficaryByNIK(NIK, false)

  const {
    data: assistanceHistories,
    refetch: refetchAssistanceHistories,
    isFetching: isFetchingAssistanceHistories,
    isLoading: isLoadingAssistanceHistories,
    isSuccess: isSuccessAssistanceHistories
  } = useGetAssistanceHistory(NIK, false)

  React.useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'NIK tidak ditemukan',
        description: 'Maaf NIK yang Anda masukkan tidak dapat ditemukan pada daftar kami'
      })
    }
  }, [isError])

  const refetch = async () => {
    await refetchBeneficary()
    await refetchAssistanceHistories()
  }

  useDisableBodyScroll(
    isFetchingBeneficary || isFetchingAssistanceHistories || isLoadingBeneficary || isLoadingAssistanceHistories
  )

  return (
    <>
      {(isFetchingBeneficary ||
        isFetchingAssistanceHistories ||
        isLoadingBeneficary ||
        isLoadingAssistanceHistories) && <Loading />}
      <div className="relative bg-[url('@/assets/images/bg-cekriwayat-bansos.webp')] w-full h-[412px] bg-no-repeat bg-cover">
        <div className="flex items-center gap-5 px-[99px] w-full absolute bottom-[-30px]">
          <Search
            value={NIK}
            onChange={(e) => setNIK(e.target.value)}
            placeholder="Masukkan NIK Masyarakat Disini"
            className="h-[75px] w-full"
          />
          <Button
            className="h-[75px] px-7 text-base font-bold"
            onClick={async () => await refetch()}
            // loading={isFetchingAssistanceHistories || isFetchingBeneficary}
          >
            Cari
          </Button>
        </div>
      </div>

      {isSuccessAssistanceHistories && isSuccessBeneficary && (
        <React.Fragment>
          <div className="bg-white rounded-xl mt-[74px] px-[100px] pt-[30px] pb-8">
            <div className="w-full grid grid-cols-4">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-base font-bold">No. KK</p>
                  <p className="text-base ">{beneficary?.familyCardNumber ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">NIK</p>
                  <p className="text-base ">{beneficary?.identityNumber ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Nama</p>
                  <p className="text-base ">{beneficary?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Alamat</p>
                  <p className="text-base ">{beneficary?.address.fullAddress ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Umur</p>
                  <p className="text-base ">{beneficary?.age ?? '-'}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-base font-bold">Kota</p>
                  <p className="text-base ">Medan</p>
                </div>
                <div>
                  <p className="text-base font-bold">Kecamatan</p>
                  <p className="text-base ">{beneficary?.address.areaLevel3?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Kelurahan</p>
                  <p className="text-base ">{beneficary?.address.areaLevel4?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Agama</p>
                  <p className="text-base">{beneficary?.religion ?? '-'}</p>
                </div>
                <div>
                  <p className=" w-max text-base font-bold">Tempat, Tanggal Lahir</p>
                  <p className="text-base w-max ">
                    {beneficary?.birthPlace ?? '-'} {beneficary?.birthDate ?? '-'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-base font-bold w-max">Jenis Kelamin</p>
                  <p className="text-base ">{beneficary?.gender ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Pendidikan Terakhir</p>
                  <p className="text-base ">{beneficary?.lastEducation ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold">Pekerjaan</p>
                  <p className="text-base ">{beneficary?.occupation ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Golongan Darah</p>
                  <p className="text-base ">{beneficary?.bloodType ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Status Kawin</p>
                  <p className="text-base  w-max">{beneficary?.maritalStatus ?? '-'}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-base font-bold w-max">Warga Negara</p>
                  <p className="text-base ">{beneficary?.citizenship ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Status Keluarga</p>
                  <p className="text-base w-max">{beneficary?.familyRelationship ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Ibu Kandung</p>
                  <p className="text-base ">{beneficary?.motherName ?? '-'}</p>
                </div>
                <div>
                  <p className="text-base font-bold w-max">Bapak Kandung</p>
                  <p className="text-base ">{beneficary?.fatherName ?? '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-7 rounded-xl mt-5">
            <TableRiwayatBansos data={assistanceHistories} />
          </div>
        </React.Fragment>
      )}
    </>
  )
}

interface TableRiwayatBansosProps {
  data: IAssistanceHistory[]
}

const TableRiwayatBansos = ({ data }: TableRiwayatBansosProps) => {
  const [isShow, setIsShow] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const handleClick = (index: number) => {
    setIndex(index)
    setIsShow(true)
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Jenis Bansos</TableHead>
            <TableHead className="text-white">Tahun</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Keterangan</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={item?.id}>
              <TableCell position="center">{item?.product?.name}</TableCell>
              <TableCell position="center">{item?.product?.code}</TableCell>
              <TableCell position="center">{item?.year}</TableCell>
              <TableCell className="capitalize" position="center">
                {item?.status}
              </TableCell>
              <TableCell position="center">{item?.detail?.type}</TableCell>
              <TableCell className="flex justify-center items-center" position="center">
                <Button variant="base" size="icon" className="mx-auto" onClick={() => handleClick(index)}>
                  <HiOutlineInformationCircle className="text-primary text-xl" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isShow={isShow}>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Riwayat Bansos</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Riwayat Bansos</p>
        </Modal.Header>
        <div className="flex flex-col gap-5">
          <section className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-bold">Tempat tugas</p>
              <p className="text-base capitalize">-</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat tugas</p>
              <p className="text-base capitalize">-</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Layanan</p>
              <p className="text-base capitalize">{data[index]?.detail?.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nominal Bantuan</p>
              <p className="text-base capitalize">-</p>
            </div>
            <div>
              <p className="text-sm font-bold">No. Rekening Bank Sumut</p>
              <p className="text-base capitalize">-</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama Rekening Bank Sumut</p>
              <p className="text-base capitalize">-</p>
            </div>
          </section>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">-</p>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default CekRiwayatBansos
