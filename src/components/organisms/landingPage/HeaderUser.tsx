import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAlert, useUserPublicToken } from '@/store/client'
import { useLogoutPublic } from '@/store/server'
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import {
  HiChevronDown,
  HiChevronRight,
  HiCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function HeaderUser() {
  const { alert } = useAlert()
  const token = useUserPublicToken((state) => state.token)
  const user = useUserPublicToken((state) => state.user)

  const { mutate: logout } = useLogoutPublic()

  const handleLogout = () => {
    void alert({
      title: 'Logout',
      description: 'Yakin untuk Logout?',
      submitText: 'Oke',
      variant: 'danger'
    }).then(() => logout())
  }

  return (
    <header className="h-24 fixed inset-x-0 top-0 bg-white flex items-center px-14 z-50 font-poppins">
      <div className="flex items-center justify-between flex-1">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[297px]" />
        </Link>
        <nav className="flex items-center gap-8 font-semibold">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-primary">
              Beranda
            </Link>
            {token && (
              <Link to="/" className="hover:text-primary">
                Riwayat Pengajuan
              </Link>
            )}
            <Link to="/user/cek-bansos" className="hover:text-primary">
              Cek Bansos
            </Link>
            {token && (
              <section className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="relative rounded-full cursor-pointer">
                      <img
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover bg-[#ECF0F4]"
                        src={`https://ui-avatars.com/api/?name=${user?.name}`}
                      />
                      <div className="absolute -bottom-1 -right-1 border-white border bg-[#ECF0F4] rounded-full w-5 h-5 flex">
                        <HiChevronDown className="m-auto text-sm" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[300px] rounded-xl px-5 py-6 mt-8 mr-24">
                    <DropdownMenuItem>
                      <DropdownMenuLabel className="flex items-center justify-between outline-none border-none ring-0 hover:bg-zinc-100 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-[22px]">
                          <div className="flex w-11 h-11 rounded-full bg-[#FCE9EE]">
                            <HiCog6Tooth className="m-auto text-primary text-3xl" />
                          </div>
                          <p className="font-poppins font-medium text-[#494949]">Pengaturan</p>
                        </div>
                        <HiChevronRight className="text-2xl text-[#484848]" />
                      </DropdownMenuLabel>
                    </DropdownMenuItem>
                    <div className="w-full h-[1px] my-[14px] bg-[#E0E0E0]" />
                    <DropdownMenuItem>
                      <DropdownMenuLabel
                        className="flex items-center gap-[22px] outline-none border-none ring-0 hover:bg-zinc-100 rounded-lg cursor-pointer"
                        onClick={handleLogout}
                      >
                        <div className="flex w-11 h-11 rounded-full bg-[#FCE9EE]">
                          <HiOutlineArrowRightOnRectangle className="m-auto text-primary text-2xl" />
                        </div>
                        <p className="font-poppins font-medium text-[#494949]">Keluar</p>
                      </DropdownMenuLabel>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="base" size="icon" className="rounded-full">
                  <div className="relative">
                    <HiOutlineBell className="text-primary text-2xl" />
                    <div className="bg-[#FF0000] w-2 h-2 rounded-full absolute top-0 right-1" />
                  </div>
                </Button>
              </section>
            )}
          </div>
          {!token && (
            <>
              <div className="h-10 w-1 rounded-full bg-[#F5F5F5]" />
              <div className="flex items-center gap-8">
                <Link to="/user/login" className="hover:text-primary">
                  Masuk
                </Link>
                <Link to="/user/register">
                  <Button className="rounded-lg">Daftar</Button>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
