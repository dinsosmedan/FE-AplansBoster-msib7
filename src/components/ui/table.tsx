import * as React from 'react'

import { cn } from '@/lib/utils'
import { useExpandedBar } from '@/store/client'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, containerClassName, ...props }, ref) => {
  const expanded = useExpandedBar((state) => state.expanded)

  return (
    <div
      className={cn(
        'relative w-full overflow-y-auto',
        expanded ? `max-w-[calc(100vw-193px)]` : `max-w-[calc(100vw-390px)]`,
        containerClassName
      )}
    >
      <table ref={ref} className={cn('w-full caption-bottom text-sm overflow-x-auto', className)} {...props} />
    </div>
  )
})
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-zinc-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-zinc-800/50', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-center align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 dark:text-zinc-400',
        className
      )}
      {...props}
    >
      <div className="w-max mx-auto">{props.children}</div>
    </th>
  )
)
TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  position?: 'center' | 'left' | 'right'
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, position = 'left', ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
      <div
        className={cn(
          'w-max',
          position === 'left' && '',
          position === 'center' && 'mx-auto',
          position === 'right' && 'ml-auto'
        )}
      >
        {props.children}
      </div>
    </td>
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-zinc-500 dark:text-zinc-400', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
