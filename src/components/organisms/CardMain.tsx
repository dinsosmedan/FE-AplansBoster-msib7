import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

interface CardMainProps {
  title: string
  subTitle: string
  urlImage: string
  description: string
  href: string
}

export default function CardMain({ title, subTitle, urlImage, description, href }: CardMainProps) {
  return (
    <div className="w-[100%] bg-primary rounded-lg flex flex-col overflow-hidden group justify-between">
      <div className="ml-4 mt-3">
        <p className="font-extrabold text-white text-2xl">{title}</p>
        <p className="text-base text-white/70 text-sm">{subTitle}</p>
      </div>
      <div className="relative overflow-hidden group my-2">
        <img
          className="object-cover w-full h-[250px] py-2 transition-transform transform scale-110 group-hover:scale-150 ease-in-out duration-300 brightness-80 group-hover:brightness-110"
          src={urlImage}
          alt=""
        />
      </div>
      <p className="text-[13px] text-white/70 text-left mx-5">{description}</p>
      <div className="flex justify-end my-3">
        <Link to={href}>
          <Button
            variant="outline"
            className="w-[110px] h-[40px] rounded-xl bg-white my-4 mr-5 group-hover:bg-white/90 transition duration-300"
          >
            <p className="font-bold text-sm text-primary">Buka Data</p>
          </Button>
        </Link>
      </div>
    </div>
  )
}
