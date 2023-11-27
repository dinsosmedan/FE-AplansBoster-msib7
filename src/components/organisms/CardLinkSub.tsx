import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import * as React from 'react'
import { LucidePlus } from 'lucide-react'

interface CardLayananProps {
  children: React.ReactNode
}

export default function CardLinkSub({ children }: CardLayananProps) {
  return <div className="w-[385px] flex flex-col rounded-[20px] border border-primary overflow-hidden">{children}</div>
}

interface CardLinkSubHeaderProps {
  title: string
  deskripsi?: string
}

const Header = ({ title, deskripsi }: CardLinkSubHeaderProps) => {
  return (
    <div className={cn('bg-primary w-[400px] h-[200px] flex flex-col gap-5 justify-center items-center relative')}>
      <p className="font-extrabold text-[32px] text-white text-center p-5">{title}</p>
      <p className="font-normal text-[16px] pb-[40px] text-white text-center">{deskripsi}</p>
    </div>
  )
}

interface CardLinkSubFooterProps {
  url: string
}

const Footer = ({ url }: CardLinkSubFooterProps) => {
  return (
    <>
      <Link to={url}>
        <div className="bg-white flex p-5  gap-3 justify-center items-center text-lg text-primary text-center">
          <LucidePlus className="text-xl" />
          <p className="font-bold">Input Data</p>
        </div>
      </Link>
    </>
  )
}

CardLinkSub.Header = Header
CardLinkSub.Footer = Footer
