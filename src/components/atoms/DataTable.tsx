import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type IServiceFund, type IServiceFunds } from '@/lib/types/dayasos.type'
import { cn } from '@/lib/utils'

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export interface DJPM {
  identityNumber: string
  name: string
  gender: string
  birth: string
  areaLevel4: string
  areaLevel3: string
  serviceType: string
  assistanceAmount: string
  status: string
}

export const columns: Array<ColumnDef<IServiceFund>> = [
  {
    accessorFn: (row) => row.beneficiary.identityNumber,
    header: 'NIK'
  },
  {
    accessorFn: (row) => row.beneficiary.name,
    header: 'Nama'
  },
  {
    accessorFn: (row) => row.beneficiary.gender,
    header: 'Jenis Kelamin'
  },
  {
    accessorFn: (row) => `${row.beneficiary.birthPlace} / ${row.beneficiary.birthDate}`,
    header: 'Tempat/ Tanggal Lahir'
  },
  {
    accessorFn: (row) => row.beneficiary.address.areaLevel4?.name,
    header: 'Kelurahan'
  },
  {
    accessorFn: (row) => row.beneficiary.address.areaLevel3?.name,
    header: 'Kecamatan'
  },
  {
    accessorFn: (row) => row.serviceType.name,
    header: 'Jenis Bantuan'
  },
  {
    id: 'assistanceAmount',
    accessorFn: (row) => `${row.assistanceAmount ?? '-'}`,
    header: 'Jumlah Bantuan Disetujui',
    cell: ({ row }) => {
      return (
        <p className={cn(row.getValue('assistanceAmount') === '-' && 'flex justify-center items-center')}>
          {row.getValue('assistanceAmount')}
        </p>
      )
    }
  },
  {
    id: 'status',
    accessorFn: (row) => `${row.status ?? '-'}`,
    header: 'Batch'
  }
]

export function DataTableDemo({ data }: { data: IServiceFunds['data'] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="rounded-md border max-w-[calc(100vw-371px)]">
        <Table className="w-full scroll-custom">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <p className="w-max">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </p>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <p className="w-max">{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
