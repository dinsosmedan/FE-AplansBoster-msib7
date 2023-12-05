import { Logo, MedanBerkahLogo } from '@/assets'
import { Outlet } from 'react-router-dom'

export default function AuthUserLayout() {
  return (
    <section className="font-poppins flex py-14 flex-col justify-center items-center gap-[30px] bg-[#F9F9F9]">
      <div className="flex flex-col gap-6 items-center">
        <img src={MedanBerkahLogo} alt="medan berkah" className="w-[310px]" />
        <img src={Logo} alt="aplans boster" className="w-[461px]" />
      </div>
      <Outlet />
    </section>
  )
}
