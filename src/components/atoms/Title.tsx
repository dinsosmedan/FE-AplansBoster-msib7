import { cn } from '@/lib/utils'
import React from 'react'

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export default function Title({ children, className }: TitleProps) {
  return <h1 className={cn('text-2xl font-bold text-font', className)}>{children}</h1>
}
