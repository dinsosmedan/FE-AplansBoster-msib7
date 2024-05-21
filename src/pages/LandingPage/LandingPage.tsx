import { ImageCover, gamba6, gambar, gambar2, gambar3, gambar4, gambar5 } from '@/assets'
import { Button } from '@/components/ui/button'
import { HiAcademicCap, HiArrowRightCircle, HiDocumentText } from 'react-icons/hi2'
import { CardLandingPage } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '@/hooks'


export default function LandingPage() {
  const navigate = useNavigate()
  useTitle('')

  return (
    <>
      <section className="h-[calc(100vh-80px)] relative lg:gap-[40px] flex justify-between w-full bg-[url('@/assets/images/bg-landing-page.png')] bg-cover">
        <div className="lg:relative lg:flex-1">
          <img src={ImageCover} alt="image-cover" className="absolute bottom-0 w-full" />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-[450px]">
            <div className="flex flex-col items-center lg:items-start text-white">
              <h1 className="font-volkhov max-w-[500px] font-bold text-[32px] md:text-[48px] text-center lg:text-start lg:text-[64px]">
                Pelayanan Online <br />
                <span className="text-[#FFB60A] ">Aplans Boster</span>
              </h1>
              <p className="md:text-xl text-sm lg:text-start text-center mt-8 mb-20 leading-relaxed">
                Selamat datang di Aplikasi Pelayanan Sosial Berbasis Online Terintegrasi. <br /> Dinas Sosial Kota Medan
              </p>
              <div className=" hidden lg:block">
                {/* <Button
                  variant="ghost"
                  className="bg-white rounded-lg gap-3 py-7 px-10 flex text-primary"
                  onClick={() => navigate('/user/cek-bansos')}
                >
                  <span className="font-medium">Cek Bansos Sekarang</span>
                  <HiArrowRightCircle className="text-xl" />
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[70px] md:px-15 px-4 bg-[#F9F9F9] relative overflow-hidden lg:mb-0 pb-20 mb-[100px]" >
        <div className="w-96 h-96 opacity-20 bg-rose-600 rounded-full absolute top-[calc(-192px+38px)] right-[calc(-192px+103px)] blur-3xl" />
        <div className="rounded-xl py-[25px] shadow-lg bg-white w-[100%] bg-no-repeat hover:shadow-2xl shadow-zinc-500/30 transition-shadow cursor-pointer duration-300 relative z-10 leading-relaxed">
          <h2 className="mt-5 lg:text-5xl md:text-4xl text-[24px] font-bold font-volkhov text-center">
          
          


          </h2>
          <h3 className="mt-5 font-semibold md:text-xl text-md mx-auto text-center"> 
          
          
          </h3>

          <p className="mt-3 mb-6 lg:text-lg md:text-md text-[12px] text-[#666666]">
          <br /> 
          
          
          
  <div className="mt-3 mb-6 lg:text-lg md:text-md text-[12px] text-[#F9F9F9] overflow-x-auto flex space-x-4 scroll-snap-x">
  <img src={gambar} alt="kegiatan1" className="w-96 h-96 opacity-100  " />
  <img src={gambar2} alt="kegiatan2" className="w-96 h-96 opacity-100  " />
  <img src={gambar3} alt="kegiatan3" className="w-96 h-96 opacity-100  " />
  <img src={gambar4} alt="kegiatan4" className="w-96 h-96 opacity-100  " />
  <img src={gambar5} alt="kegiatan5" className="w-96 h-96 opacity-100  " />
  <img src={gamba6} alt="kegiatan6" className="w-96 h-96 opacity-100  " />

</div>

          
        

          </p>
        </div>

        <div className="text-center mb-11 mt-0">
          <Button
            variant="ghost"
            className="bg-white rounded-lg  py-6 px-10 text-primary border-2 border-primary  lg:hidden"
            onClick={() => navigate('/user/cek-bansos')}
          >
            <span className="font-medium mr-1">Cek Bansos Sekarang</span>
            <HiArrowRightCircle className="text-xl" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 lg:w-fit mx-auto">
          <h2 className="lg:text-5xl md:text-4xl text-[24px] font-bold font-volkhov text-center">
            Layanan / Pengajuan <span className="text-[#FFB60A]">Online</span>
          </h2>
          <p className="lg:text-lg md:text-md text-[12px] text-[#666666] text-center lg:w-[644px] leading-relaxed">
            Pengajuan Bantuan Secara Online Menjadi Mudah dan bisa dilakukan dimana saja
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-2 lg:gap-[92px] gap-[40px]">
          <CardLandingPage
            curvePosition="right"
            title="Bantuan Biaya Pendidikan"
            desc="Layanan Pengajuan Bantuan Biaya Pendidikan"
            btnText="Pendaftaran Pengajuan"
            href="/user/bbp"
            icon={HiAcademicCap}
          />
          <CardLandingPage
            title="SKTM (Surat Keterangan Tidak Mampu)"
            desc="Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)"
            btnText="Pendaftaran Pengajuan"
            href="/user/sktm"
            icon={HiDocumentText}
          />
        </div>       
      </section>
      <section className="hidden lg:block ">
        <div className="py-[98px] bg-[#1B232F] flex items-center gap-14 justify-center pb-[200px]">
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
        </div>
      </section>
    </>
  )
}
