import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { useUserPublicToken } from '@/store/client'
import { HiChevronDown, HiOutlineBell } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function HeaderUser() {
  const token = useUserPublicToken((state) => state.token)
  const user = useUserPublicToken((state) => state.user)

  return (
    <header className="h-24 fixed inset-x-0 top-0 bg-white flex items-center px-14 z-10">
      <div className="flex items-center justify-between flex-1">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[297px]" />
        </Link>
        <nav className="flex items-center gap-8 font-bold">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-primary">
              Beranda
            </Link>
            <Link to="/" className="hover:text-primary">
              Layanan Online
            </Link>
            <Link to="/user/cek-bansos" className="hover:text-primary">
              Cek Bansos
            </Link>
            {token && (
              <section className="flex items-center gap-3">
                <div className="relative rounded-full cursor-pointer">
                  <img
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover bg-[#ECF0F4]"
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                  />
                  <div className="absolute -bottom-1 -right-1 border-white border bg-[#ECF0F4] rounded-full w-5 h-5 flex">
                    <HiChevronDown className="m-auto text-sm" />
                  </div>
                </div>
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
