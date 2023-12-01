import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
export default function Breadcrumbs() {
  const location = useLocation()
  const { pathname } = location
  const segments = pathname.split('/')

  let url = ''
  const pathArray = location.pathname.split('/')

  const breadcrumbLinks = segments.map((segment, index) => {
    if (segment !== '') url += `/${segment}`

    return (
      <Link key={index} to={url} className="font-bold text-lg text-font/50 capitalize group">
        {segment === '' ? (
          location.pathname === '/' ? (
            ''
          ) : (
            <span className="hover:underline">Home</span>
          )
        ) : (
          <>
            <span> / </span>
            <span
              className={cn(segment === pathArray[pathArray.length - 1] && 'text-primary', 'group-hover:underline')}
            >
              {segment.replace(/-/g, ' ')}
            </span>
          </>
        )}
      </Link>
    )
  })

  return breadcrumbLinks
}
