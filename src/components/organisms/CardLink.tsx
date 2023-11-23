import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import * as React from 'react'

interface CardLayananProps {
  children: React.ReactNode
  url: string
}

export default function CardLink({ children, url }: CardLayananProps) {
  return (
    <Link to={url} className="w-[385px] h-fit flex flex-col rounded-[20px] border border-primary overflow-hidden">
      {children}
    </Link>
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
    <div className={cn('bg-primary w-[400px] h-[132px] flex justify-center items-center relative', className)}>
      <p className="font-extrabold text-[32px] text-white text-center">{title}</p>
      {children}
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
}

const Footer = ({ children }: CardLinkFooterProps) => {
  return <div className="bg-white flex h-[93px] px-10 justify-center items-center relative z-10">{children}</div>
}

CardLink.Header = Header
CardLink.Footer = Footer
