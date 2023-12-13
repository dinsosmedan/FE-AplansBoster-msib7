import { HiChevronRight, HiLockClosed, HiUser } from 'react-icons/hi2'
import { Link, Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <div className="min-h-screen">
      <div className="bg-[url('@/assets/images/bg-profile.svg')] h-[275px] relative">
        <div className="absolute top-[207px] rounded-lg z-10 ml-10 flex flex-row gap-10">
          <div className="py-[53px]  h-[446px] bg-white w-[486px] flex flex-col items-center px-16 shadow-xl rounded-lg">
            <img
              className="w-[155px] h-[155px] rounded-full object-cover mb-10"
              src={'https://ui-avatars.com/api/?name=krisna'}
              alt=""
            />
            <div className="flex justify-between w-full items-center hover:bg-[#F6F6F6] rounded-lg py-3 px-3 ">
              <div className="flex flex-row items-center gap-5 w-full">
                <div className="bg-red-600/10 rounded-full h-[44px] w-[44px] flex items-center justify-center ">
                  <HiUser className="w-5 h-6 text-primary" />
                </div>
                <div className="flex items-center">
                  <Link to={'/user/profile'}>
                    <p className="text-xl ">Profile</p>
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
                    <p className="text-xl">Ubah Password</p>
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
