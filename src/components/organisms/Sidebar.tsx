import * as React from 'react'
import {
  HiChevronRight,
  HiClipboardDocumentList,
  HiOutlineClipboardDocumentList,
  HiOutlineSquares2X2,
  HiSquares2X2
} from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

import { Logo, LogoMini } from '@/assets'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useExpandedBar } from '@/store/client/useExpandedBar'
import { MAIN_MENU, MENU_MANAJEMEN, SUB_MENU_LAYANAN } from '@/lib/data'

export default function Sidebar() {
  const [isShowSub, setIsShowSub] = React.useState(false)
  const { isMinimize, setIsMinimize } = useExpandedBar((state) => ({
    isMinimize: state.expanded,
    setIsMinimize: state.updateExpanded
  }))

  const handleShowSub = () => {
    setIsShowSub(!isShowSub)
  }

  const handleMinimize = () => {
    setIsMinimize(!isMinimize)
    setIsShowSub(false)
  }

  const handleCloseSub = () => {
    setIsShowSub(false)
  }

  return (
    <aside
      className={cn(
        'flex flex-col pt-[42px] pb-5 gap-10 border-r border-[#E9E9E9] h-screen sticky top-0 z-50',
        isMinimize ? 'w-24' : 'flex-[1.4] px-[33px]'
      )}
    >
      <div className={cn('flex items-center relative', isMinimize && 'px-[33px]')}>
        <img src={isMinimize ? LogoMini : Logo} alt="logo" className="w-full" />
        <Button
          size="icon"
          onClick={handleMinimize}
          className={cn(
            'rounded-full absolute w-6 h-6 z-[999999]',
            isMinimize ? 'right-[-12px]' : 'right-[calc(-33px-12px)]'
          )}
        >
          <HiChevronRight className={isMinimize ? '' : 'rotate-180'} />
        </Button>
      </div>
      <section className={cn('flex flex-col gap-8', !isMinimize && 'overflow-scroll no-scroll')}>
        <div className="flex flex-col gap-4">
          <Label>Main Menu</Label>
          <nav className={cn('flex flex-col gap-3', isMinimize && 'items-center')}>
            <Menu href="/" action={handleCloseSub} activeIcon={<HiSquares2X2 />} inactiveIcon={<HiOutlineSquares2X2 />}>
              Dashboard
            </Menu>

            <div className="flex flex-col gap-3 relative">
              <NavLink to="/layanan/rehabsos">
                {({ isActive }) => (
                  <Button
                    onClick={handleShowSub}
                    variant={isActive ? 'default' : 'base'}
                    className={cn('flex w-full text-xl', !isMinimize ? 'pl-8 justify-between' : 'justify-center px-3')}
                  >
                    <div className="gap-3 flex items-center">
                      {isActive ? <HiClipboardDocumentList /> : <HiOutlineClipboardDocumentList />}
                      <span className={cn('text-sm', isMinimize ? 'hidden' : 'flex')}>Layanan</span>
                    </div>
                    {!isMinimize && (
                      <HiChevronRight className={cn('text-sm text-zinc-900', isShowSub && 'rotate-90 text-white')} />
                    )}
                  </Button>
                )}
              </NavLink>
              <div
                className={cn(
                  'flex flex-col bg-white transition-all',
                  isMinimize && 'absolute shadow-md w-36 left-[calc(100%+33px)] p-1 rounded-lg z-10 gap-1',
                  isShowSub
                    ? isMinimize
                      ? 'visible opacity-100 translate-x-0'
                      : 'gap-3 w-full flex'
                    : isMinimize
                    ? 'invisible opacity-0 translate-x-[-5px]'
                    : 'hidden'
                )}
              >
                {SUB_MENU_LAYANAN.map((item, index) => (
                  <SubMenu href={item.link} action={handleCloseSub} key={index}>
                    {item.title}
                  </SubMenu>
                ))}
              </div>
            </div>

            {MAIN_MENU.map((item, index) => (
              <Menu
                href={item.link}
                action={handleCloseSub}
                activeIcon={<item.activeIcon />}
                inactiveIcon={<item.inactiveIcon />}
                key={index}
              >
                {item.title}
              </Menu>
            ))}
          </nav>
        </div>
        <div className={cn('flex flex-col gap-4', isMinimize && 'items-center')}>
          <Label>Menu Manajemen</Label>
          <nav className="flex flex-col gap-3">
            {MENU_MANAJEMEN.map((item, index) => (
              <Menu
                key={index}
                href={item.link}
                action={handleCloseSub}
                activeIcon={<item.activeIcon />}
                inactiveIcon={<item.inactiveIcon />}
              >
                {item.title}
              </Menu>
            ))}
          </nav>
        </div>
      </section>
    </aside>
  )
}

interface LabelProps {
  children: string
}

const Label = ({ children }: LabelProps) => {
  const expanded = useExpandedBar((state) => state.expanded)
  const className = 'uppercase text-[#C7C7C7] text-xs font-bold'
  return <span className={cn(className, expanded && 'text-[10px] text-center px-[33px]')}>{children}</span>
}

interface MenuProps {
  children: string
  action: () => void
  href: string
  activeIcon?: React.ReactNode
  inactiveIcon?: React.ReactNode
}

const Menu = ({ action, children, href, activeIcon, inactiveIcon }: MenuProps) => {
  const expanded = useExpandedBar((state) => state.expanded)

  return (
    <NavLink to={href} onClick={action}>
      {({ isActive }) => (
        <Button
          variant={isActive ? 'default' : 'base'}
          className={cn('flex gap-3 justify-start text-xl', !expanded ? 'pl-8 w-full ' : 'px-3')}
        >
          {isActive ? activeIcon : inactiveIcon}
          <span className={cn('text-sm truncate max-w-fit', expanded ? 'hidden' : 'flex')}>{children}</span>
        </Button>
      )}
    </NavLink>
  )
}

interface SubMenuProps {
  action: () => void
  children: string
  href: string
}

const SubMenu = ({ children, href, action }: SubMenuProps) => {
  const expanded = useExpandedBar((state) => state.expanded)

  return (
    <NavLink to={href} onClick={action}>
      {({ isActive }) => (
        <Button
          variant="base"
          className={cn('uppercase justify-start w-full', isActive && 'text-zinc-900', !expanded && 'pl-16')}
        >
          {children}
        </Button>
      )}
    </NavLink>
  )
}
