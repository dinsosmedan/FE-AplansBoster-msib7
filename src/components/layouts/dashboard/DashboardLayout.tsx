import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../..'

export default function DashboardLayout() {
  return (
    <section className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[8] bg-[#F9F9F9]">
        <Header />
        <main className="px-6 py-6">
          <Outlet />
        </main>
      </div>
    </section>
  )
}
