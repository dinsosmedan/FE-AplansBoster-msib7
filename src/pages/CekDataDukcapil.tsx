import { HiArrowRight } from 'react-icons/hi2'
import { useTitle } from '@/hooks'

import { Search } from '@/components'
import { Button } from '@/components/ui/button'

const CekDataDukcapil = () => {
  useTitle('Cek Riwayat Bansos ')

  return (
    <>
      <section className="relative bg-[url('@/assets/images/bg-cekriwayat-bansos.svg')] w-full h-[412px] bg-no-repeat bg-cover">
        <div className="flex items-center gap-5 px-[99px] w-full absolute bottom-[-30px]">
          <Search placeholder="Masukkan NIK Masyarakat Disini" className="h-[75px] w-full" />
          <Button className="h-[75px] px-7 text-base font-bold">Cari</Button>
        </div>
      </section>

      <section className="bg-white rounded-xl mt-[74px] px-[100px] pt-[30px] pb-8">
        <div className="w-full grid grid-cols-4">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-base font-bold">No. KK</p>
              <p className="text-base ">1271010708690003 </p>
            </div>
            <div>
              <p className="text-base font-bold">NIK</p>
              <p className="text-base ">1271010708690003 </p>
            </div>
            <div>
              <p className="text-base font-bold">Nama</p>
              <p className="text-base ">OZA CABUL </p>
            </div>
            <div>
              <p className="text-base font-bold">Alamat</p>
              <p className="text-base ">Dirumah </p>
            </div>
            <div>
              <p className="text-base font-bold">Umur</p>
              <p className="text-base ">69 </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-base font-bold">Kota</p>
              <p className="text-base ">Medan </p>
            </div>
            <div>
              <p className="text-base font-bold">Kecamatan</p>
              <p className="text-base ">Belawan</p>
            </div>
            <div>
              <p className="text-base font-bold">Kelurahan</p>
              <p className="text-base ">Belawan</p>
            </div>
            <div>
              <p className="text-base font-bold">Agama</p>
              <p className="text-base ">Atheis</p>
            </div>
            <div>
              <p className=" w-max text-base font-bold">Tempat, Tanggal Lahir</p>
              <p className="text-base w-max ">Medan 17/08/1945 </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-base font-bold w-max">Jenis Kelamin</p>
              <p className="text-base ">Laki-Laki</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Pendidikan Terakhir</p>
              <p className="text-base "> SLTA/SEDERAJAT</p>
            </div>
            <div>
              <p className="text-base font-bold">Pekerjaan</p>
              <p className="text-base ">Buruh</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Golongan Darah</p>
              <p className="text-base ">O</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Status Kawin</p>
              <p className="text-base  w-max">Sudah Kawin</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-base font-bold w-max">Warga Negara</p>
              <p className="text-base ">WNI</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Status Keluarga</p>
              <p className="text-base w-max"> Kepala Keluarga</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Ibu Kandung</p>
              <p className="text-base ">Susanti</p>
            </div>
            <div>
              <p className="text-base font-bold w-max">Bapak Kandung</p>
              <p className="text-base ">Budi</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[26px]">
          <Button variant="base" className="flex justify-center items-center gap-[11px]">
            <p className="font-bold text-primary text-base">Tampilkan Data Keluarga Terkait</p>
            <HiArrowRight className="text-primary" />
          </Button>
        </div>
      </section>
    </>
  )
}
export default CekDataDukcapil
