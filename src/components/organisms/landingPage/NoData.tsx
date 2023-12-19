import { cn } from '@/lib/utils'

interface NoDataProps {
  title: string
  desc: string
  image: string
  className?: string
}

export default function NoData({ title, desc, image, className }: NoDataProps) {
  return (
    <section className={cn('bg-white py-5 md:px-32 px-5', className)}>
      <div className="flex flex-col justify-center items-center">
        <img src={image} alt="not-found-bansos" className="w-44" />
        <h1 className="font-bold text-2xl text-center mt-9">{title}</h1>
        <p className="text-[#8B8B8B] max-w-[476px] text-center mt-3 text-[15px]">{desc}</p>
      </div>
    </section>
  )
}
