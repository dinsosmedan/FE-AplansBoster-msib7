import { HiChevronRight, HiLockClosed, HiUser } from 'react-icons/hi2'
import { Link, Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <div className="min-h-[1500px] bg-[#F9F9F9] lg:min-h-[1000px] pb-20 mb-20 ">
      <div className="bg-[url('@/assets/images/bg-profile.svg')] h-[275px] lg:relative">
        <div className="pt-[200px] rounded-lg z-10 lg:mx-10  lg:flex lg:flex-row lg:gap-10">
          <div className="md:py-[53px] py-10  h-[100%] bg-white lg:w-[486px] w-[90%] mx-auto flex flex-col items-center md:px-16 px-5 shadow-sm rounded-lg">
            <img
              className="w-[155px] h-[155px] rounded-full object-cover mb-10"
              src={'https://ui-avatars.com/api/?background=fce9ee&color=dd2153&bold=true&name=kontol'}
              alt=""
            />
            <div className="flex justify-between w-full items-center hover:bg-[#F6F6F6] rounded-lg py-3 px-3 ">
              <div className="flex flex-row items-center gap-5 w-full">
                <div className="bg-red-600/10 rounded-full h-[44px] w-[44px] flex items-center justify-center ">
                  <HiUser className="w-5 h-6 text-primary" />
                </div>
                <div className="flex items-center">
                  <Link to={'/user/profile'}>
                    <p className="text-md ">Profile</p>
                  </Link>
                </div>
              </div>
              <HiChevronRight />
            </div>
            <div className="flex justify-between w-full items-center hover:bg-[#F6F6F6] rounded-lg py-3 px-3 ">
              <div className="flex flex-row items-center gap-5 w-full">
                <div className="bg-red-600/10 rounded-full h-[44px] w-[44px] flex items-center justify-center ">
                  <HiLockClosed className="w-5 h-6 text-primary" />
                </div>
                <div className="flex items-center">
                  <Link to={'/user/profile/change-password'}>
                    <p className="text-md">Ubah Password</p>
                  </Link>
                </div>
              </div>
              <HiChevronRight />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
