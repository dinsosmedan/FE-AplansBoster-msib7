import { Outlet } from 'react-router-dom'
import { FooterUser, HeaderUser } from '..'

export default function UserLayout() {
  return (
    <>
      <HeaderUser />
      <main className="mt-24 font-poppins">
        <Outlet />
      </main>
      <FooterUser />
    </>
  )
}
