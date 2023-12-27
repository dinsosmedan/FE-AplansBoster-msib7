import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormField, Form, FormItem, FormControl, FormLabel } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'

import { DTKS_DEFAULT_VALUES } from '@/lib/defaultValues'
import { Container, Loading, Pagination, SearchSelect } from '@/components'
import { useGetDTKS, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { useCreateParams, useDeleteParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'

interface DtksParams {
  kecamatan: string
  kelurahan: string
  nama: string
  nik: string
  kk: string
  bpnt: boolean | string
  blt: boolean | string
  pbi: boolean | string
  pkh: boolean | string
}

export default function DataDtks() {
  useTitle('Data DTKS')
  const forms = useForm<DtksParams>({
    defaultValues: DTKS_DEFAULT_VALUES
  })

  const navigate = useNavigate()
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)

  const createParams = useCreateParams()
  const deleteParams = useDeleteParams()
  const { kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh, page } = useGetParams([
    'kecamatan',
    'kelurahan',
    'nama',
    'nik',
    'kk',
    'bpnt',
    'blt',
    'pbi',
    'pkh',
    'page'
  ])

  const {
    data: dtks,
    isLoading,
    isFetching,
    refetch
  } = useGetDTKS({
    kecamatan,
    kelurahan,
    nama,
    nik,
    kk,
    bpnt: Boolean(bpnt),
    blt: Boolean(blt),
    pbi: Boolean(pbi),
    pkh: Boolean(pkh),
    page: parseInt(page) ?? 1
  })

  function shouldDisplayResetButton(variant: 'with-page' | 'without-page' = 'without-page') {
    if (variant === 'with-page') return kecamatan || kelurahan || nama || nik || kk || bpnt || blt || pbi || pkh || page
    return kecamatan || kelurahan || nama || nik || kk || bpnt || blt || pbi || pkh
  }

  React.useEffect(() => {
    if (shouldDisplayResetButton()) {
      forms.reset({ kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh })
    }
  }, [kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh, page])

  useDisableBodyScroll(isFetching || isLoading)

  const onSubmit = async (values: DtksParams) => {
    Object.keys(values).forEach((key) => {
      if (values[key as keyof DtksParams] !== '' && values[key as keyof DtksParams] !== undefined) {
        createParams({ key, value: values[key as keyof DtksParams] as string })
      } else {
        deleteParams(key)
      }
    })
    deleteParams('page')
    await refetch()
  }

  const handleReset = () => {
    forms.reset(DTKS_DEFAULT_VALUES)
    navigate('/data-dtks')
  }

  if (isLoading) return <Loading />

  return (
    <Container className="px-8">
      {isFetching && <Loading />}
      <Form {...forms}>
        <form className="flex gap-[18px] flex-col" onSubmit={forms.handleSubmit(onSubmit)}>
          <section className="grid grid-cols-2 gap-5">
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="w-[580px]"
                      placeholder="Pilih Kecamatan"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kelurahan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      disabled={!areaLevel3 || !listKelurahan}
                      width="w-[580px]"
                      placeholder="Pilih Kelurahan"
                      options={
                        listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>

          <section className="grid grid-cols-3 gap-5">
            <FormField
              name="nama"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan NIK" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kk"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan No KK" />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          <section className="flex justify-between items-center py-4 px-3">
            <div className="flex items-center gap-5">
              <FormField
                name="bpnt"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>BPNT</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                name="blt"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>BLT BBM</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                name="pbi"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>PBI</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                name="pkh"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>PKH</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3">
              {shouldDisplayResetButton('with-page') && (
                <Button className="gap-3 py-6 text-primary" type="button" variant="outline" onClick={handleReset}>
                  <HiArrowPath className="text-xl" />
                  <span>Reset</span>
                </Button>
              )}
              <Button className="gap-3 py-6" type="submit">
                <HiMagnifyingGlass className="text-xl" />
                <span>Cari Data</span>
              </Button>
            </div>
          </section>
        </form>
      </Form>

      <section className="mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px]">No</TableHead>
              <TableHead className="text-white font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px]">NO. KK</TableHead>
              <TableHead className="text-white font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-white font-bold text-[15px]">BPNT</TableHead>
              <TableHead className="text-white font-bold text-[15px]">BLT BBM</TableHead>
              <TableHead className="text-white font-bold text-[15px]">PBI</TableHead>
              <TableHead className="text-white font-bold text-[15px]">PKH</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dtks?.data?.length !== 0 ? (
              dtks?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {(dtks.meta.currentPage - 1) * dtks.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.identityNumber}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.familyCardNumber}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.name}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.address.fullAddress}</TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.assistances.bpnt ? 'Ya' : 'Tidak'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.assistances.bltbbm ? 'Ya' : 'Tidak'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.assistances.pbi ? 'Ya' : 'Tidak'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.assistances.pkh ? 'Ya' : 'Tidak'}
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
        {(dtks?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={dtks?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </section>
    </Container>
  )
}
