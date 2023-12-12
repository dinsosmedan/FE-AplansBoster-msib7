import { ImageCover } from '@/assets'
import { Button } from '@/components/ui/button'
import { HiAcademicCap, HiArrowRightCircle, HiDocumentText, HiGift } from 'react-icons/hi2'
import { CardLandingPage } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '@/hooks'

export default function LandingPage() {
  const navigate = useNavigate()
  useTitle('')

  return (
    <>
      <section className="h-[calc(100vh-80px)] gap-[40px] flex justify-between w-full bg-[url('@/assets/images/bg-landing-page.svg')] bg-cover">
        <div className="relative flex-1">
          <img src={ImageCover} alt="image-cover" className="absolute bottom-0 w-full" />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-[450px]">
            <div className="flex flex-col items-start text-white">
              <h1 className="font-volkhov max-w-[500px] font-bold text-[64px]">
                Pelayanan Online <br /><span className="text-[#FFB60A]">Aplans Boster</span>
              </h1>
              <p className="text-lg mt-8 mb-16 leading-relaxed">
                Selamat datang di di Aplikasi Pelayanan Sosial Berbasis Online Terintegrasi. <br /> Dinas Sosial Kota Medan
              </p>
              <Button
                variant="ghost"
                className="bg-white rounded-lg gap-3 py-7 px-5 text-primary"
                onClick={() => navigate('/user/cek-bansos')}
              >
                <span className="font-medium">Cek Bansos Sekarang</span>
                <HiArrowRightCircle className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[70px] px-14 bg-[#F9F9F9] relative overflow-hidden">
        <div className="w-96 h-96 opacity-20 bg-rose-600 rounded-full absolute top-[calc(-192px+38px)] right-[calc(-192px+103px)] blur-3xl" />
        <div className="flex flex-col gap-6 w-fit mx-auto">
          <h2 className="text-5xl font-bold font-volkhov text-center">
            Layanan Pengajuan <span className="text-[#FFB60A]">Online</span>
          </h2>
          <p className="text-lg text-[#666666] text-center w-[644px] leading-relaxed">
            Pengajuan Bantuan Secara Online Menjadi Mudah dan bisa dilakukan dimana saja
          </p>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-[92px]">
          <CardLandingPage
            title="DTKS (Data Terpadu Kesejahteraan Sosial)"
            desc="Layanan Pengajuan DTKS (Data Terpadu Kesejahteraan Sosial)"
            btnText="Pendaftaran Pengajuan"
            href="/"
            icon={HiGift}
          />
          <CardLandingPage
            curvePosition="right"
            title="Bantuan Biaya Pendidikan"
            desc="Layanan Pengajuan Bantuan Biaya Pendidikan"
            btnText="Pendaftaran Pengajuan"
            href="/"
            icon={HiAcademicCap}
          />
          <CardLandingPage
            title="SKTM (Surat Keterangan Tidak Mampu)"
            desc="Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)"
            btnText="Pendaftaran Pengajuan"
            href="/"
            icon={HiDocumentText}
          />
        </div>
      </section>
      <section className="py-[98px] bg-[#1B232F] flex items-center gap-14 justify-center">
        <div className="flex flex-col items-end gap-5">
          <p className="text-[#FFB60A] text-[70px] font-bold font-volkhov">700.000 +</p>
          <p className="text-[#FFB60A] text-[70px] font-bold font-volkhov">450.000 +</p>
          <p className="text-[#FFB60A] text-[70px] font-bold font-volkhov">1.500.000 +</p>
        </div>
        <div className="flex flex-col gap-[52px]">
          <p className="text-white font-medium text-[50px]">Masyarakat Terdata DTKS</p>
          <p className="text-white font-medium text-[50px]">Keluarga Terdata DTKS</p>
          <p className="text-white font-medium text-[50px]">Masyarakat Penerima Manfaat</p>
        </div>
      </section>
    </>
  )
}
