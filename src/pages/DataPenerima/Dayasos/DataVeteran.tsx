import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteVeteran, useGetVeteran } from '@/store/server'
import { Action, Loading } from '@/components'
import { useAlert } from '@/store/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const DataVeteran = () => {
  useTitle('Data Penerima / Dayasos / Veteran ')
  const { alert } = useAlert()
  const createParams = useCreateParams()
  const { q, page } = useGetParams(['q', 'page'])
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  interface FormValues {
    q: string
  }
  const forms = useForm<FormValues>({
    defaultValues: {
      q: ''
      // batch: ''
    }
  })

  const {
    data: veterans,
    refetch,
    isFetching,
    isLoading
  } = useGetVeteran({
    page: parseInt(page) ?? 1,
    q
  })
  useDisableBodyScroll(isFetching)

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({
        key: 'q',
        value: values.q !== '' ? values.q : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'q', value: '' }) // Set q to empty string if the search query is empty
    }
    await refetch()
  }
  const { mutateAsync: deleteVeteran } = useDeleteVeteran()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data Veteran',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteVeteran(id)
    })
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        <h1 className="font-bold text-2xl ">Veteran (VET)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <section className="flex items-center justify-between">
              <Select>
                <SelectTrigger className="border-primary flex gap-5 rounded-lg font-bold w-fit bg-white text-primary focus:ring-0">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=".clsx">.clsx</SelectItem>
                  <SelectItem value=".csv">.csv</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-3">
                <Button className="gap-2 border-none rounded-lg" type="submit">
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari Data</span>
                </Button>
              </div>
            </section>
          </form>
        </Form>
        <section className="border rounded-xl mt-5 overflow-hidden">
          <Table className="mt-5">
            <TableHeader className="bg-[#FFFFFF]">
              <TableRow>
                <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]"> Jenis Keanggotaan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">NPV</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Satuan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Ukuran Baju / Celana</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {veterans?.data?.length !== 0 ? (
                veterans?.data.map((veteran, index) => (
                  <TableRow key={veteran.id}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(veterans.meta.currentPage - 1) * veterans.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.beneficiary.name}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.beneficiary.identityNumber}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.isActive}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.veteranUnit}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.veteranUnit}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{veteran.uniformSize}</TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Action
                        onDelete={() => handleDelete(veteran.id)}
                        onDetail={() => console.log('detail')}
                        onEdit={() => console.log('detail')}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
        {(veterans?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={veterans?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataVeteran
