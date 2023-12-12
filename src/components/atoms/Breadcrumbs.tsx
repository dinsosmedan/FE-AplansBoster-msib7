import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import * as React from 'react'

export interface IBreadcrumbs {
  url: string
  label: string
}

interface BreadcrumbsProps {
  breadcrumbs?: IBreadcrumbs[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-1">
      <Link to="/data-penerima" className="text-[13px] font-semibold text-font/40 hover:underline">
        Data Penerima
      </Link>
      {breadcrumbs?.slice(0, 2).map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <span className="text-font/40"> / </span>
          <Link
            key={breadcrumb.url}
            to={breadcrumb.url}
            className={cn(
              'text-[13px] text-font/50 hover:underline',
              index === breadcrumbs.length - 1 ? 'text-font font-bold' : 'text-font/40 font-semibold'
            )}
          >
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}
