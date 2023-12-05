import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function HeaderUser() {
  return (
    <header className="h-24 fixed inset-x-0 top-0 bg-white flex items-center px-14 z-10">
      <div className="flex items-center justify-between flex-1">
        <img src={Logo} alt="logo" className="w-[297px]" />
        <nav className="flex items-center gap-8 font-bold">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-primary">
              Beranda
            </Link>
            <Link to="/" className="hover:text-primary">
              Layanan Online
            </Link>
            <Link to="/" className="hover:text-primary">
              Cek Bansos
            </Link>
          </div>
          <div className="h-10 w-1 rounded-full bg-[#F5F5F5]" />
          <div className="flex items-center gap-8">
            <Link to="/user/login" className="hover:text-primary">
              Masuk
            </Link>
            <Link to="/user/register">
              <Button className="rounded-lg">Daftar</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
