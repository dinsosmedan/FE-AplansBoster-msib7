import { DinsosLogo } from '@/assets'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function FooterUser() {
  return (
    <footer className="bg-[#161C28] font-poppins lg:px-10 mt-[-100px]">
      <section className="md:p-20 p-8 pt-20 md:pt-20">
        <div className="lg:flex justify-between">
          <div>
            <div className="flex items-center gap-[22px]">
              <img src={DinsosLogo} alt="dinsos-logo" className="w-[52px] lg:w-[83px] md:w-[83px]" />
              <div className="flex flex-col">
                <p className="lg:text-2xl md:text-[24px] text-[#00923F] font-bold">Pemerintah Kota Medan</p>
                <p className="lg:text-2xl md:text-[24px] text-white font-bold">Dinas Sosial Kota Medan</p>
              </div>
            </div>
            <div className="flex items-start justify-between  md:mt-12 mt-10">
              <p className="text-sm md:text-[18px] lg:max-w-[432px] text-white/80 leading-relaxed">
                “Memberikan Pelayanan Yang Terbaik Bagi Masyarakat Agar Tercapai Tujuan Bangsa”
              </p>
            </div>
          </div>
          <div className="flex flex-col text-white gap-1 mt-10">
            <p className="font-semibold text-xl">Hubungi Kami</p>
            <div className="flex gap-2 items-center">
              <HiOutlineEnvelope />
              <span className="text-white/70 text-sm">dinsosmedan@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col text-white gap-1 mt-10">
            <p className="font-semibold text-xl">Tautan Terkait</p>
            <div className="flex gap-2 items-center">
              <ul>
                <li>
                  <a href="https://kemensos.go.id" className="text-white/70 text-sm">
                    KEMENSOS
                  </a>
                </li>
                <li>
                  <a href="https://portal.pemkomedan.go.id" className="text-white/70 text-sm">
                    PEMKO Medan
                  </a>
                </li>
                <li>
                  <a href="https://dissos.pemkomedan.go.id" className="text-white/70 text-sm">
                    DINSOS Medan
                  </a>
                </li>
                <li>
                  <Link to={'/login'} className="text-white/70 text-sm">
                    Admin Aplans-Boster
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col text-white mt-10">
            <p className="font-semibold text-xl">Lokasi Kami</p>
            <div className="flex gap-2 ">
              <HiOutlineMapPin />
              <span className="text-white/70 text-sm">
                Jl. Pinang Baris No. 114 <br />
                Lalang, Kec. Medan Sunggal <br />
                Kota Medan, Sumatera Utara 20127
              </span>
            </div>
            <div className="flex flex-col text-white gap-2 mr-20 mt-10">
              <p className="font-semibold text-xl">Ikuti Kami</p>
              <div className="flex gap-2 items-center">
                <Link to="/" className="w-8 h-8 flex rounded-full bg-[#00923F]">
                  <FaInstagram className="m-auto" />
                </Link>
                <Link to="/" className="w-8 h-8 flex rounded-full bg-[#00923F]">
                  <FaFacebookF className="m-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-[30px] border-t border-[#3c3c3c]">
        <p className="text-center text-white/80">Copyright &copy; 2024 | Dinas Sosial Kota Medan</p>
      </div>
    </footer>
  )
}
