import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { HiChevronRight } from 'react-icons/hi2'

import { MAIN_MENU, MENU_MANAJEMEN } from '@/lib/data'
import { useExpandedBar } from '@/store/client'
import { Logo, LogoMini } from '@/assets'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const { isMinimize, setIsMinimize } = useExpandedBar((state) => ({
    isMinimize: state.expanded,
    setIsMinimize: state.updateExpanded
  }))

  const handleMinimize = () => {
    setIsMinimize(!isMinimize)
  }

  return (
    <aside
      className={cn(
        'flex flex-col pt-[42px] gap-10 border-r border-[#E9E9E9] h-screen sticky top-0 z-50',
        isMinimize ? 'w-24' : 'w-[300px] px-[33px]'
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
      <section className={cn('flex flex-col gap-8 pb-5', !isMinimize && 'overflow-scroll no-scroll')}>
        <div className="flex flex-col gap-4">
          <Label>Main Menu</Label>
          <nav className={cn('flex flex-col gap-3', isMinimize && 'items-center')}>
            {MAIN_MENU.map((item, index) => (
              <Menu href={item.link} activeIcon={<item.activeIcon />} inactiveIcon={<item.inactiveIcon />} key={index}>
                {item.title}
              </Menu>
            ))}
          </nav>
        </div>
        <div className={cn('flex flex-col gap-4', isMinimize && 'items-center')}>
          <Label>Menu Manajemen</Label>
          <nav className="flex flex-col gap-3">
            {MENU_MANAJEMEN.map((item, index) => (
              <Menu key={index} href={item.link} activeIcon={<item.activeIcon />} inactiveIcon={<item.inactiveIcon />}>
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
  href: string
  activeIcon?: React.ReactNode
  inactiveIcon?: React.ReactNode
}

const Menu = ({ children, href, activeIcon, inactiveIcon }: MenuProps) => {
  const expanded = useExpandedBar((state) => state.expanded)

  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <Button
          variant={isActive ? 'default' : 'base'}
          className={cn('flex gap-3 justify-start text-xl', !expanded ? 'pl-8 w-full' : 'px-3')}
        >
          {isActive ? activeIcon : inactiveIcon}
          <span className={cn('text-sm truncate max-w-fit', expanded ? 'hidden' : 'flex')}>{children}</span>
        </Button>
      )}
    </NavLink>
  )
}
