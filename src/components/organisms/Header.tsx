import { HiBell } from 'react-icons/hi2'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetMe, useLogout } from '@/store/server'
import { useAlert, useTitleHeader } from '@/store/client'
import { Breadcrumbs, Loading } from '..'
import { Skeleton } from '../ui/skeleton'

export default function Header() {
  const { alert } = useAlert()
  const { title, breadcrumbs, isHadBreadcrumbs } = useTitleHeader((state) => ({
    title: state.title,
    isHadBreadcrumbs: state.isHadBreadcrumbs,
    breadcrumbs: state.breadcrumbs
  }))

  const { data: user, isLoading } = useGetMe()
  const { mutate: logout, isLoading: isLoadingLogout } = useLogout()

  const handleLogout = () => {
    void alert({
      title: 'Logout',
      description: 'Yakin untuk Logout?',
      submitText: 'Oke',
      variant: 'danger'
    }).then(() => logout())
  }

  console.log(user)

  return (
    <>
      {isLoadingLogout && <Loading />}
      <header className="h-24 flex items-center px-8 z-[20] sticky top-0 bg-white border-b border-[#E9E9E9] text-font">
        <nav className="flex items-center justify-between flex-1">
          <div className="flex flex-col">
            <h4 className="font-bold text-2xl">{title}</h4>
            {isHadBreadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
          </div>
          <div className="flex items-center gap-6">
            <Button size="icon" variant="ghost" className="rounded-full">
              <HiBell className="text-2xl text-primary" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <Skeleton className="w-12 h-12 rounded-[14px]" />
                      <div className="flex flex-col gap-3">
                        <Skeleton className="w-[120px] h-3 rounded-[14px]" />
                        <Skeleton className="w-[80px] h-3 rounded-[14px]" />
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://source.unsplash.com/random/900×700/?man"
                        alt="profile"
                        loading="lazy"
                        className="w-12 h-12 object-cover rounded-[14px]"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">{user?.data.name}</p>
                        <p className="text-sm text-[#8F8F8F] text-left">{user?.data.role.name}</p>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5">
                <DropdownMenuItem>
                  <button onClick={handleLogout} className="flex-1 w-full text-left">
                    <DropdownMenuLabel className="text-primary">Keluar</DropdownMenuLabel>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
    </>
  )
}
