import { BgVerified } from '@/assets'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function VerifiedAccount() {
  const navigate = useNavigate()
  return (
    <div className="flex py-14 flex-col justify-center items-center gap-[30px] bg-[#F9F9F9]">
      <div className="bg-white w-[686px] h-[535px] shadow-xl">
        <div className="flex flex-col items-center justify-center py-14 gap-6">
          <img className="w-[168px] h-[168px]" src={BgVerified} alt="" />
          <p className="text-[34px] font-semibold">Akun Terverifikasi</p>
          <p className="text-xl">Selamat, Akun anda berhasil diverifikasi</p>
          <Button className="w-[200px] h-[60px]" onClick={() => navigate('/user/login')}>
            <p className="text-white text-[26px] font-semibold">Masuk</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
