import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Action, Container, Loading, Modal, Pagination } from '@/components'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { JENIS_RUMAH_IBADAH } from '@/pages/Layanan/Dayasos/RumahIbadah'

import { useDeleteWorshipPlace, useGetWorshipPlace, useGetWorshipPlaces } from '@/store/server/useDayasos'
import { useGetKecamatan, useGetKelurahan } from '@/store/server'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  q: string
  type: string
  kecamatan: string
  kelurahan: string
}

const DataRumahIbadah = () => {
  useTitle('Data Penerima / Dayasos / Rumah Ibadah (RI) ')
  const { alert } = useAlert()
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { page, q, kecamatan, kelurahan, type } = useGetParams(['page', 'q', 'type', 'kecamatan', 'kelurahan'])
  const { data: worshipPlace, isLoading: isLoadingWorshipPlace } = useGetWorshipPlace(selectedId)

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      type: '',
      kecamatan: '',
      kelurahan: ''
    }
  })

  const areaLevel3 = forms.watch('kecamatan')
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const {
    data: worshipPlaces,
    refetch,
    isFetching,
    isLoading
  } = useGetWorshipPlaces({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    type,
    q
  })
  useDisableBodyScroll(isFetching)
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const handleReset = () => {
    navigate('/data-penerima/dayasos/data-djp')
    forms.reset()
  }
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const onSubmit = async (values: FormValues) => {
    updateParam('type', values.type)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('q', values.q)

    await refetch()
  }
  const { mutateAsync: deleteWorshipPlace } = useDeleteWorshipPlace()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteWorshipPlace(id)
    })
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading && isLoadingWorshipPlace) {
    return <Loading />
  }
  return (
    <Container>
      <h1 className="font-bold text-[32px] ">Rumah Ibadah (RI)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Nama Rumah Ibadah" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Rumah Ibadah" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JENIS_RUMAH_IBADAH.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kecamatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listKecamatan?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={areaLevel3 === '' && kecamatan === ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelurahan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listKelurahan?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
              <HiArrowPath className="text-lg" />
              <span>Reset</span>
            </Button>
            <Button className="w-fit py-6 px-4 bg-primary">
              <HiMagnifyingGlass className="w-6 h-6 text-white" />
              <p className="text-white font-semibold text-sm pl-2 w-max">Cari Data</p>
            </Button>
          </div>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Rumah Ibadah</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Rumah Ibadah</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Penanggung jawab</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Handphone</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Keterangan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {worshipPlaces?.data.length !== 0 ? (
              worshipPlaces?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">
                    {(worshipPlaces.meta.currentPage - 1) * worshipPlaces.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.type}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.address}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.areaLevel3?.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.areaLevel4?.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.picName}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.picPhone}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.status}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.note}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action onDelete={() => handleDelete(item.id)} onDetail={() => showDetail(item.id)} onEdit={() => console.log('detail')} />
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
      {(worshipPlaces?.meta?.total as number) > 10 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={worshipPlaces?.meta.total as number}
          pageSize={10}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className='md:max-w-4xl'>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
        </Modal.Header>
        {isLoadingWorshipPlace && <Loading />}
        <div className='grid grid-cols-3 gap-y-5'>
          <div>
              <p className="text-sm font-bold">Nama Rumah Ibadah</p>
              <p className="text-base capitalize">{worshipPlace?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Rumah Ibadah</p>
              <p className="text-base capitalize">{worshipPlace?.type ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Rumah Ibadah</p>
              <p className="text-base capitalize">{worshipPlace?.address ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{worshipPlace?.areaLevel3?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{worshipPlace?.areaLevel4?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama PIC</p>
              <p className="text-base capitalize">{worshipPlace?.picName ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kontak PIC</p>
              <p className="text-base capitalize">{worshipPlace?.picPhone ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tahun</p>
              <p className="text-base capitalize">{worshipPlace?.year ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status</p>
              <p className="text-base capitalize">{worshipPlace?.status ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Keterangan</p>
              <p className="text-base capitalize">{worshipPlace?.note ?? '-'}</p>
            </div>
          </div>
      </Modal>
    </Container>
  )
}
export default DataRumahIbadah
