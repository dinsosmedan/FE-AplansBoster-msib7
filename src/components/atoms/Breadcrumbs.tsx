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
      {breadcrumbs?.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <span className="text-font/40">/</span>}
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
