import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../..'
import { useGetDevices } from '@/hooks'

export default function DashboardLayout() {
  const { isMobile, isTablet } = useGetDevices()
  return (
    <section className="flex min-h-screen">
      {isMobile || isTablet ? (
        <p className="m-auto text-2xl font-bold text-primary px-8 text-center">
          Maaf Halaman Ini hanya dapat dilihat dengan menggunakan Desktop atau Laptop 😢
        </p>
      ) : (
        <>
          <Sidebar />
          <div className="flex-[8] bg-[#F9F9F9]">
            <Header />
            <main className="px-6 py-6">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </section>
  )
}
