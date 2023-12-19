import { Logo, MedanBerkahLogo } from '@/assets'
import { Outlet } from 'react-router-dom'

export default function AuthUserLayout() {
  return (
    <section className="font-poppins flex py-14 flex-col justify-center items-center gap-[30px] bg-[#F9F9F9] pb-[200px]">
      <div className="flex flex-col gap-6 items-center pt-14 lg:pt-0">
        <img src={MedanBerkahLogo} alt="medan berkah" className="lg:w-[310px] w-[200px]" />
        <img src={Logo} alt="aplans boster" className="lg:w-[461px] w-[300px]" />
      </div>
      <Outlet />
    </section>
  )
}
