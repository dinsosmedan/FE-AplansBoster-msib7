import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import * as React from 'react'

interface CardLayananProps {
  children: React.ReactNode
  className?: string
}

export default function CardLink({ children, className }: CardLayananProps) {
  return (
    <article
      className={cn('w-[385px] h-fit flex flex-col rounded-[20px] border border-primary overflow-hidden', className)}
    >
      {children}
    </article>
  )
}

interface CardLinkHeaderProps {
  title: string
  className?: string
  children?: React.ReactNode
  circlePosition?: 'top' | 'bottom'
}

const Header = ({ title, className, children, circlePosition }: CardLinkHeaderProps) => {
  return (
    <div className={cn('bg-primary w-full h-[132px] flex justify-center items-center relative', className)}>
      <p className="relative z-20 font-extrabold text-[30px] text-white text-center">{title}</p>
      <div className="relative z-10">{children}</div>
      <div
        className={cn(
          'w-[196px] h-[196px] rounded-full bg-[#D71F50] absolute z-0',
          circlePosition === 'top'
            ? '-translate-y-1/2 top-[-50%-48px] right-[24px] translate-x-1/2'
            : 'translate-y-1/2 bottom-[-50%-48px] left-[24px] -translate-x-1/2'
        )}
      />
    </div>
  )
}

interface CardLinkFooterProps {
  children: React.ReactNode
  href: string
}

const Footer = ({ children, href }: CardLinkFooterProps) => {
  return (
    <Link
      to={href}
      className=" hover:bg-zinc-100 bg-white flex h-[93px] px-10 justify-center items-center relative z-10"
    >
      {children}
    </Link>
  )
}

CardLink.Header = Header
CardLink.Footer = Footer
