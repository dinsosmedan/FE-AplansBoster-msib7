/* eslint-disable multiline-ternary */
import { HiBell } from 'react-icons/hi2'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTitleHeader } from '@/store/client/useTitleHeader'
import { useLogout } from '@/store/server'
import { useAlert } from '@/store/client'

export default function Header() {
  const { alert } = useAlert()
  const title = useTitleHeader((state) => state.title)

  // const { data: user, isLoading } = useGetMe()
  const { mutate: logout } = useLogout()
  const handleLogout = () => {
    void alert({
      title: 'Logout',
      description: 'Yakin untuk Logout?',
      submitText: 'Oke',
      variant: 'danger'
    }).then(() => logout())
  }

  return (
    <header className="h-24 flex items-center px-8 z-[20] sticky top-0 bg-white border-b border-[#E9E9E9] text-font">
      <nav className="flex items-center justify-between flex-1">
        <h2 className="font-bold text-[25px]">{title}</h2>
        <div className="flex items-center gap-6">
          <Button size="icon" variant="ghost" className="rounded-full">
            <HiBell className="text-2xl text-primary" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <div className="flex items-center gap-4">
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
                      className="w-12 h-12 object-cover rounded-[14px]"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{user?.data.name}</p>
                      <p className="text-sm text-[#8F8F8F]">{user?.data.role.name}</p>
                    </div>
                  </>
                )}
              </div> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuItem>
                <DropdownMenuLabel className="text-primary  w-[170px]">Pengaturan</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel className="text-primary" onClick={handleLogout}>
                  Keluar
                </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
