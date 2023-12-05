import { DinsosLogo } from '@/assets'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function FooterUser() {
  return (
    <footer className="bg-[#161C28] font-poppins">
      <section className="p-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[22px]">
            <img src={DinsosLogo} alt="dinsos-logo" className="w-[83px]" />
            <div className="flex flex-col">
              <p className="text-2xl text-[#00923F] font-bold">Pemerintah Kota Medan</p>
              <p className="text-2xl text-white font-bold">Dinas Sosial Kota Medan</p>
            </div>
          </div>
          <div className="flex flex-col text-white gap-1">
            <p className="font-semibold text-xl">Hubungi Kami</p>
            <div className="flex gap-2 items-center">
              <HiOutlineEnvelope />
              <span className="text-white/70 text-sm">dinsosmedan@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col text-white gap-1">
            <p className="font-semibold text-xl">Lokasi Kami</p>
            <div className="flex gap-2 items-center">
              <HiOutlineMapPin />
              <span className="text-white/70 text-sm">Jl. Pinang Baris No. 114B</span>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between mt-[67px]">
          <p className="text-xl max-w-[432px] text-white/80 leading-relaxed">
            “Memberikan Pelayanan Yang Terbaik Bagi Masyarakat Agar Tercapai Tujuan Bangsa”
          </p>
          <div className="flex flex-col text-white gap-2 mr-20">
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
      </section>
      <div className="py-[30px] border-t border-[#3c3c3c]">
        <p className="text-center text-white/80">Copyright | 2023 | dinas sosial kota medan</p>
      </div>
    </footer>
  )
}
