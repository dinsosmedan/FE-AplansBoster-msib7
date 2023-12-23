import { BgVerified } from '@/assets'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function VerifiedAccount() {
  const navigate = useNavigate()
  return (
    <div className="flex py-14 flex-col justify-center items-center w-[90%] gap-[30px] bg-[#F9F9F9] ">
      <div className="bg-white md:w-[686px] w-[100%] h-[480px] shadow-lg rounded-xl">
        <div className="flex flex-col items-center justify-center py-14">
          <img className="w-[168px] h-[168px]" src={BgVerified} alt="" />
          <p className="text-xl font-semibold pt-10">Akun Terverifikasi</p>
          <p className="md:text-md text-sm pb-10">Selamat, Akun anda berhasil diverifikasi</p>
          <Button className="md:w-[160px] w-[150px] md:h-[50px]" onClick={() => navigate('/user/login')}>
            <p className="text-white text-xl font-semibold">Masuk</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
