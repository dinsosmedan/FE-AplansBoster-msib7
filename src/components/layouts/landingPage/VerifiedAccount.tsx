import { BgVerified, Logo, MedanBerkahLogo } from '@/assets'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function VerifiedAccount() {
  return (
    <div className="flex py-14 flex-col justify-center items-center gap-[30px] bg-[#F9F9F9]">
      <div className="flex flex-col gap-6 items-center">
        <img src={MedanBerkahLogo} alt="medan berkah" className="w-[310px]" />
        <img src={Logo} alt="aplans boster" className="w-[461px]" />
      </div>
      <div className="bg-white w-[686px] h-[535px] shadow-xl">
        <div className="flex flex-col items-center justify-center py-14 gap-6">
          <img className="w-[168px] h-[168px]" src={BgVerified} alt="" />
          <p className="text-[34px] font-semibold">Akun Terverifikasi</p>
          <p className="text-xl">Selamat, Akun anda berhasil diverifikasi</p>
          <Button className="w-[200px] h-[60px]">
            <p className="text-white text-[26px] font-semibold">Masuk</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
