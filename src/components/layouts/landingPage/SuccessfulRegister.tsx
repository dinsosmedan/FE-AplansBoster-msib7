import { Bgsuccessful } from '@/assets'

export default function SuccessfulRegister() {
  return (
    <div className="w-full bg-[#ECF0F4] flex items-center justify-center pt-[51px] pb-10">
      <div className="w-[686px] h-[540px] bg-white pt-14 shadow-xl">
        <div className="py- flex flex-col items-center justify-center gap-8">
          <img src={Bgsuccessful} alt="" />
          <p className="text-[32px] font-semibold">Tidak Ada Proses Pengajuan</p>
          <p className="text-[#8B8B8B] text-xl">Mohon Maaf, Anda Belum Melakukan Pengajuan</p>
          <p>Silahkan cek email anda untuk melakukan verifikasi</p>
        </div>
      </div>
    </div>
  )
}
