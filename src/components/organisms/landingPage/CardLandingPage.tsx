import { cn } from '@/lib/utils'
import { HiArrowRightCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { type IconType } from 'react-icons'
import { Button } from '../../ui/button'

interface CardLandingPageProps {
  curvePosition?: 'left' | 'right'
  title: string
  desc?: string
  btnText: string
  icon: IconType
  href: string
  className?: string
  isHadButtonIcon?: boolean
}

export default function CardLandingPage({
  curvePosition = 'left',
  title,
  desc,
  btnText,
  icon: Icon,
  href,
  className,
  isHadButtonIcon = true
}: CardLandingPageProps) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(href)}
      className={cn(
        'p-7 flex flex-col gap-[18px] justify-between rounded-xl bg-white bg-no-repeat hover:shadow-2xl shadow-zinc-500/30 transition-shadow cursor-pointer duration-300 relative z-10',
        curvePosition === 'left'
          ? "bg-[url('@/assets/images/line-curve.svg')]"
          : "bg-[url('@/assets/images/line-curve-right.svg')]",
        className
      )}
    >
      {Icon && <Icon className="text-[68px] text-primary" />}
      <h3 className="font-semibold text-xl">{title}</h3>
      {desc && <p className="font-medium  text-[#666666]">{desc}</p>}
      <Button className="gap-3 text-white py-7">
        <span className="text-[17px]">{btnText}</span>
        {isHadButtonIcon && <HiArrowRightCircle className="text-[28px]" />}
      </Button>
    </article>
  )
}
