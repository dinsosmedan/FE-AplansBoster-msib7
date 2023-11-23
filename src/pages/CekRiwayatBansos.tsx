import { Button } from '@/components/ui/button'
import useTitle from '@/hooks/useTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type FunctionComponent } from 'react'
import { Search } from '@/components'

const CekRiwayatBansos: FunctionComponent = () => {
  useTitle('Cek Riwayat Bansos ')

  return (
    <>
      <div className="relative bg-[url('@/assets/images/bg-cekriwayat-bansos.svg')] w-full h-[402px] bg-no-repeat bg-cover">
        <div className="flex items-center gap-5 px-[99px] w-full absolute bottom-[-32px]">
          <Search placeholder="Masukkan NIK Masyarakat Disini" className="h-[75px] w-full" />
          <Button className="h-[75px] px-7 text-base font-bold">Cari</Button>
        </div>
      </div>

      <div className="bg-white p-7 rounded-xl mt-[74px]">
        <div className="grid grid-cols-4 gap-2">
          <div className="">
            <p className="font-bold text-sm mt-2">No. KK</p> <p> 1271010708690003</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Kota </p> <p> Medan</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Jenis Kelamin </p> <p> Laki-Laki</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Warga Negara </p> <p> WNI</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">NIK </p> <p> 1271010708690003</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Kecamatan </p> <p> Medan Belawan</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Pendidikan Terakhir </p> <p> SLTA/SEDERAJAT</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Status Keluarga </p> <p> Kepala Keluarga</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Nama </p> <p> Ricky J Sianipar</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Kelurahan </p> <p> Belawan</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Pekerjaan </p> <p> Buruh</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Ibu Kandung </p> <p> Susanti</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Alamat </p> <p> JLN STASIUN LORONG STASIUN NO 115</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Agama </p> <p> Islam</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Golongan Darah </p> <p> O</p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Bapak Kandung </p> <p> Budi </p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Umur </p> <p> 33 </p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Tempat,Tanggal Lahir </p> <p> Medan,12/12/1992 </p>
          </div>
          <div className="">
            <p className="font-bold text-sm mt-2">Status Kawin </p> <p> Sudah Kawin </p>
          </div>
        </div>
        {/* <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}></div> */}
      </div>
      <div className="bg-white p-7 rounded-xl mt-5">
        <TableRiwayatBansos />
      </div>
    </>
  )
}

const TableRiwayatBansos = () => {
  return (
    <>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">NIP</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Username</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="">elytha79sipayung@gmail.com</TableCell>
            <TableCell className="">081376331191</TableCell>
            <TableCell className="">Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
export default CekRiwayatBansos
