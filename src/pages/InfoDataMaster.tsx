import { Loading } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDisableBodyScroll } from '@/hooks'
import { useGetBeneficaryById } from '@/store/server'
import { useParams } from 'react-router-dom'
const InfoDataMaster = () => {
  const { id } = useParams<{ id: string }>()
  const { data: beneficiary, isLoading } = useGetBeneficaryById(id)

  useDisableBodyScroll(isLoading)

  if (isLoading) return <Loading />

  const TableDataMaster = () => {
    return (
      <>
        <Table className="my-10">
          <TableHeader className="bg-primary">
            <TableRow className="text-center">
              <TableHead className="text-white">NIK</TableHead>
              <TableHead className="text-white">Nama</TableHead>
              <TableHead className="text-white">Hubungan keluarga</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {beneficiary?.familyMembers?.length !== 0 ? (
              beneficiary?.familyMembers.map((item, index) => (
                <TableRow key={index} className="text-center">
                  <TableCell className="" position="center">
                    {item.identityNumber}
                  </TableCell>
                  <TableCell className="" position="center">
                    {item.name}
                  </TableCell>
                  <TableCell className="" position="center">
                    {item.familyRelationship}
                  </TableCell>
                  <TableCell className="" position="center">
                    {item.isDtks ? 'DTKS' : 'Non DTKS'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    )
  }

  return (
    <>
      <div className="container bg-white py-10 flex-row flex-wrap grid grid-cols-4 gap-y-3">
        <div className="flex flex-col">
          <p className="font-bold">No.KK</p>
          <p>{beneficiary?.familyCardNumber ?? '-' ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Jenis Kelamin</p>
          <p>{beneficiary?.gender ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Kewarganegaraan</p>
          <p>{beneficiary?.citizenship ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">NIK</p>
          <p>{beneficiary?.identityNumber ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Kecamatan</p>
          <p>{beneficiary?.address.areaLevel3?.name ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Pendidikan Terakhir</p>
          <p>{beneficiary?.lastEducation ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Status Keluarga</p>
          <p>{beneficiary?.familyRelationship ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Nama</p>
          <p>{beneficiary?.name ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Kelurahan</p>
          <p>{beneficiary?.address.areaLevel4?.name ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Pekerjaan</p>
          <p>{beneficiary?.occupation ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Nama Ibu</p>
          <p>{beneficiary?.motherName ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Alamat</p>
          <p>{beneficiary?.address.fullAddress ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Agama</p>
          <p>{beneficiary?.religion ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Golongan Darah</p>
          <p>{beneficiary?.bloodType ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Nama Bapak</p>
          <p>{beneficiary?.fatherName ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Umur</p>
          <p>{beneficiary?.age ?? '-'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Tempat,Tanggal Lahir</p>
          <p>
            {beneficiary?.birthPlace ?? '-'},{beneficiary?.birthDate ?? '-'}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Status Kawin</p>
          <p>{beneficiary?.maritalStatus ?? '-'}</p>
        </div>
      </div>
      <TableDataMaster />
    </>
  )
}

export default InfoDataMaster
