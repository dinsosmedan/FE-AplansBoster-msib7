import { Button } from '@/components/ui/button'
import useTitle from '@/hooks/useTitle'
import { Search } from '@/components'
import { HiArrowRight } from 'react-icons/hi2'

const CekDataDukcapil = () => {
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
        <div className="w-full grid grid-cols-4">
          <div className="px-24 pt-8 flex flex-col gap-5">
            <div>
              <p className="text-sm font-bold">No. KK</p>
              <p className="text-sm ">1271010708690003 </p>
            </div>
            <div>
              <p className="text-sm font-bold">NIK</p>
              <p className="text-sm ">1271010708690003 </p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama</p>
              <p className="text-sm ">OZA CABUL </p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat</p>
              <p className="text-sm ">Dirumah </p>
            </div>
            <div>
              <p className="text-sm font-bold">Umur</p>
              <p className="text-sm ">69 </p>
            </div>
          </div>
          <div className="px-24 pt-8 flex flex-col gap-5">
            <div>
              <p className="text-sm font-bold">Kota</p>
              <p className="text-sm ">Medan </p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-sm ">Belawan</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-sm ">Belawan</p>
            </div>
            <div>
              <p className="text-sm font-bold">Agama</p>
              <p className="text-sm ">Atheis</p>
            </div>
            <div>
              <p className=" w-max text-sm font-bold">Tempat, Tanggal Lahir</p>
              <p className="text-sm w-max ">Medan 17/08/1945 </p>
            </div>
          </div>
          <div className="px-24 pt-8 flex flex-col gap-5">
            <div>
              <p className="text-sm font-bold w-max">Jenis Kelamin</p>
              <p className="text-sm ">Laki-Laki</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Pendidikan Terakhir</p>
              <p className="text-sm "> SLTA/SEDERAJAT</p>
            </div>
            <div>
              <p className="text-sm font-bold">Pekerjaan</p>
              <p className="text-sm ">Buruh</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Golongan Darah</p>
              <p className="text-sm ">O</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Status Kawin</p>
              <p className="text-sm  w-max">Sudah Kawin</p>
            </div>
          </div>
          <div className="px-24 pt-8 flex flex-col gap-5">
            <div>
              <p className="text-sm font-bold w-max">Warga Negara</p>
              <p className="text-sm ">WNI</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Status Keluarga</p>
              <p className="text-sm w-max"> Kepala Keluarga</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Ibu Kandung</p>
              <p className="text-sm ">Susanti</p>
            </div>
            <div>
              <p className="text-sm font-bold w-max">Bapak Kandung</p>
              <p className="text-sm ">Budi</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <button className="bg-transparent">
            <div className="flex justify-center pt-6 pb-[30px]">
              <p className="font-bold text-primary text-base">Tampilkan Data Keluarga Terkait</p>
              <HiArrowRight className="text-primary h-4 w-4 ml-2 mt-1" />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
export default CekDataDukcapil
