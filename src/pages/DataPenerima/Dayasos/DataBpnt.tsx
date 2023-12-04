import Container from '@/components/atoms/Container'
import useTitle from '@/hooks/useTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useGetNonCashFoodAssistanceBeneficiary, useGetNonCashFoodAssistanceDetail } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Action, Loading, Modal } from '@/components'

const DataBpnt = () => {
  useTitle('Data Penerima / Dayasos / Bantuan Pangan Non Tunai (BPNT) ')
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const createParams = useCreateParams()
  const { page } = useGetParams(['page'])
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const { data: NonCashFoodAssistanceBeneficiary, isLoading: isLoadingNonCash } = useGetNonCashFoodAssistanceDetail(selectedId)

  const {
    data: NonCashFoodAssistanceBeneficiarys,
    refetch,
    isFetching,
    isLoading
  } = useGetNonCashFoodAssistanceBeneficiary({
    page: parseInt(page) ?? 1
  })
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  useDisableBodyScroll(isFetching)

  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching, refetch])

  if (isLoading && isLoadingNonCash) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold text-2xl "> Bantuan Pangan Non Tunai (BPNT) </h1>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table className="mt-10">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Keanggotaan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NonCashFoodAssistanceBeneficiarys?.data?.length !== 0 ? (
              NonCashFoodAssistanceBeneficiarys?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center bg-[#F9FAFC]">{(NonCashFoodAssistanceBeneficiarys.meta.currentPage - 1) * NonCashFoodAssistanceBeneficiarys.meta.perPage + index + 1}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.type}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Action onDetail={() => showDetail(item.id)}/>
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
        {(NonCashFoodAssistanceBeneficiarys?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={NonCashFoodAssistanceBeneficiarys?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
      <Modal isShow={isShow} className='md:max-w-4xl'>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
        </Modal.Header>
        {isLoadingNonCash && <Loading />}
        <div className='grid grid-cols-3 gap-y-5'>
          <div>
              <p className="text-sm font-bold">Nama</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">NIK</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.identityNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">No. KK</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.familyCardNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.address.areaLevel3?.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.address.areaLevel4?.name}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Lengkap</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.address.fullAddress}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Pekerjaan</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.occupation}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.birthPlace} / {NonCashFoodAssistanceBeneficiary?.beneficiary.birthDate}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status DTKS</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Keanggotaan</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Usia</p>
              <p className="text-base capitalize">{NonCashFoodAssistanceBeneficiary?.beneficiary.age}</p>
            </div>
          </div>
      </Modal>
    </div>
  )
}
export default DataBpnt
