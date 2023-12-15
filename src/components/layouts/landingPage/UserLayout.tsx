import { Outlet } from 'react-router-dom'
import { FooterUser, HeaderUser } from '../..'

interface UserLayoutProps {
  children?: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <HeaderUser />
      <main className="mt-20 font-poppins min-h-[calc(100vh-80px)]">{children ?? <Outlet />}</main>
      <FooterUser />
    </>
  )
}
