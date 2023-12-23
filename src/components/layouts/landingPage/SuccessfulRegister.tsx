import { Bgsuccessful } from '@/assets'

export default function SuccessfulRegister() {
  return (
    <div className="w-full flex items-center justify-center pt-[51px]  pb-10">
      <div className="md:w-[686px] w-[90%] md:h-[560px] bg-white pt-14 shadow-lg rounded-xl">
        <div className="py- flex flex-col items-center justify-center text-center px-10 pb-20 md:p-0">
          <img src={Bgsuccessful} alt="" />
          <p className="text-xl font-semibold pt-10 pb-5">Selamat, anda telah membuat akun</p>
          <p className="text-[#8B8B8B] md:text-md text-sm">Akun Anda Belum Terverifikasi</p>
          <p className="text-[#8B8B8B] md:text-md text-sm">Silahkan cek email anda untuk melakukan verifikasi</p>
        </div>
      </div>
    </div>
  )
}
