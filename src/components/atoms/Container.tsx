import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}
export default function Container({ children, className }: ContainerProps) {
  return <section className={cn('bg-white p-5 min-h-[calc(100vh-40px-104px)]', className)}>{children}</section>
}
