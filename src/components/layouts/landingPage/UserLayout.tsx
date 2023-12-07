import { Outlet } from 'react-router-dom'
import { FooterUser, HeaderUser } from '../..'

interface UserLayoutProps {
  children?: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <HeaderUser />
      <main className="mt-24 font-poppins">{children ?? <Outlet />}</main>
      <FooterUser />
    </>
  )
}
