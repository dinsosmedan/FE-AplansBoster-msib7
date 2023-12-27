import { cn } from '@/lib/utils'
import { HiArrowRightCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { type IconType } from 'react-icons'
import { Button } from '../../ui/button'

interface CardLandingPageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  curvePosition?: 'left' | 'right'
  title: string
  desc?: string
  btnText: string
  icon: IconType
  href: string
  className?: string
  isHadButtonIcon?: boolean
  quota?: number
  filledQuota?: number
}

export default function CardLandingPage({
  curvePosition = 'left',
  title,
  desc,
  btnText,
  icon: Icon,
  href,
  className,
  isHadButtonIcon = true,
  quota,
  filledQuota,
  ...rest
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
      {quota !== undefined && filledQuota !== undefined ? (
        <div className="absolute top-4 right-4 px-2 py-1 bg-primary rounded-md">
          <p className="text-white text-sm">
            {filledQuota.toString()} / {quota.toString()}
          </p>
        </div>
      ) : null}
      {Icon && <Icon className="md:text-[68px] text-[48px] text-primary" />}
      <h3 className="font-semibold md:text-xl text-md">{title}</h3>
      {desc && (
        <article
          dangerouslySetInnerHTML={{ __html: desc }}
          className="font-medium text-sm text-[#666666] prose max-w-none truncate-2 text-base"
        />
      )}
      <Button className="gap-3 text-white md:py-7 py-6" {...rest}>
        <span className="md:text-[17px] capitalize">{btnText}</span>
        {isHadButtonIcon && <HiArrowRightCircle className="md:text-[28px]" />}
      </Button>
    </article>
  )
}
