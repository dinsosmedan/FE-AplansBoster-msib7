import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import { useGetPublicEventTuition, useGetTuitionApplicationPublic } from '@/store/server'
import { Loading, Markdown } from '@/components'
import { useDisableBodyScroll } from '@/hooks'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { type IPublicEventTuition } from '@/lib/types/public.type'
import { type IApplication } from '@/lib/types/linjamsos.type'
import { formatToView } from '@/lib/services/formatDate'

export default function BbpUser() {
  const { id } = useParams<{ id: string }>()
  const [details, setDetails] = React.useState<IPublicEventTuition>({} as IPublicEventTuition)
  const [submissionProcessDetail, setSubmissionProcessDetail] = React.useState<IApplication>({} as IApplication)

  const { data, isLoading, isSuccess } = useGetPublicEventTuition()
  const { data: submissionProcess, isLoading: isLoadingDetails } = useGetTuitionApplicationPublic()

  useDisableBodyScroll(isLoading)

  React.useEffect(() => {
    if (id) {
      setDetails((data?.find((item) => item.id === id) as IPublicEventTuition) ?? ({} as IPublicEventTuition))
    }
  }, [isSuccess, id])

  React.useEffect(() => {
    if (id) {
      setSubmissionProcessDetail(submissionProcess?.find((item) => item.id === id) ?? ({} as IApplication))
    }
  }, [isSuccess, id])

  if (isLoading || isLoadingDetails) return <Loading />

  return (
    <section className="bg-[#F9F9F9] lg:px-10 py-[38px] pb-[200px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg pt-10 lg:pt-0">
          <p className="md:text-[26px] text-[18px] font-semibold mb-7 px-9 mt-9">Bantuan Biaya Pendidikan </p>
          <TabsList className="p-0 h-auto bg-white gap-5 px-7">
            <TabsTrigger
              value="open"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="md:text-lg font-medium">Sedang dibuka</p>
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="md:text-lg font-medium">Proses Pengajuan</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="open"
          className="mt-11 lg:flex lg:flex-row lg:justify-between grid place-items-center lg:place-items-start bg-[#F9F9F9] gap-10"
        >
          <div className="flex gap-8 lg:flex-col lg:justify-start justify-center">
            {data?.map((item, index) => (
              <CardLandingPage
                key={index}
                className={cn(
                  'lg:w-[400px] w-[90%] shadow-sm',
                  item.id === id && 'border-2 border-primary bg-[#F9F4F5]'
                )}
                quota={item.quota}
                filledQuota={item.filledQuota}
                title={item.batch}
                desc={item.eventDescription}
                btnText="Pendaftaran Pengajuan"
                icon={HiAcademicCap}
                href={`/user/bbp/${item.id}`}
              />
            ))}
          </div>
          {Object.keys(details)?.length !== 0 ? (
            <section className="flex flex-col gap-8 w-[95%] mt-5 lg:mt-0 lg:justify-start justify-center">
              <div className="bg-white rounded-lg md:px-10 px-7 md:py-14 py-9 h-fit shadow">
                <p className="font-semibold text-xl">Informasi Tentang Beasiswa</p>
                <Markdown values={details?.eventDescription} />

                <section className="flex flex-col gap-5 border-t border-zinc-200 py-3">
                  <FileDownload
                    title={`Pengumuman Beasiswa ${details?.batch}`}
                    url={details?.requiredDocuments?.scholarshipApplicationLetter?.url as string}
                    fileName={details?.requiredDocuments?.scholarshipApplicationLetter?.originalName as string}
                  />
                  <FileDownload
                    title="Biodata Mahasiswa Calon Penerima Bantuan Biaya Pendidikan"
                    url={details?.requiredDocuments?.biodata?.url as string}
                    fileName={details?.requiredDocuments?.biodata?.originalName as string}
                  />
                  <FileDownload
                    title="Template Surat Pernyataan Tidak Menerima Beasiswa/Bantuan Biaya Pendidikan Dari Sumber Lain"
                    url={details?.requiredDocuments?.nonReceiptOfScholarshipLetter?.url as string}
                    fileName={details?.requiredDocuments?.nonReceiptOfScholarshipLetter?.originalName as string}
                  />
                  <FileDownload
                    title="Template Surat Pernyataan Tidak Berstatus Sebagai Aparatur Sipil Negara (ASN)"
                    url={details?.requiredDocuments?.nonGovernmentEmployeeLetter?.url as string}
                    fileName={details?.requiredDocuments?.nonGovernmentEmployeeLetter?.originalName as string}
                  />
                </section>
              </div>
              <Link to={`/user/bbp/form/${id ?? data?.[0].id}`}>
                <Button className="w-full py-6">
                  <p className="md:text-lg">Daftar Sekarang</p>
                </Button>
              </Link>
            </section>
          ) : null}
        </TabsContent>
        <TabsContent
          value="request"
          className="lg:flex lg:flex-row lg:justify-between grid place-items-center lg:place-items-start bg-[#F9F9F9] gap-10"
        >
          <div className="flex gap-8 lg:flex-col lg:justify-start justify-center">
            {submissionProcess?.map((item, index) => (
              <CardLandingPage
                key={index}
                className={cn(
                  'lg:w-[400px] w-[90%] shadow-sm',
                  item.id === id && 'border-2 border-primary bg-[#F9F4F5]'
                )}
                title={item?.event.batch}
                desc={`${formatToView(item?.updatedAt)}`}
                btnText={item?.application_status}
                icon={HiAcademicCap}
                isHadButtonIcon={false}
                href={`/user/bbp/${item.id}`}
                btnUrl={`/user/bbp/form/edit/${item.id}`}
                disabled={item.application_status !== 'revision'}
              />
            ))}
          </div>
          {Object.keys(submissionProcessDetail).length !== 0 && (
            <section className="flex flex-col gap-8 w-[95%] mt-5 lg:mt-0 lg:justify-start justify-center">
              <div className="bg-white py-24">
                <div className="px-[90px] flex flex-row justify-center">
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      submissionProcessDetail?.application_status === 'pending'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">1</p>
                  </div>
                  <div className="flex items-center">
                    <div className="border-2 border-dashed w-[250px] h-0 border-primary" />
                  </div>
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      submissionProcessDetail?.application_status === 'processed'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">2</p>
                  </div>
                  <div className="flex items-center px-2 ">
                    <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
                  </div>
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      submissionProcessDetail?.application_status === 'rejected' ||
                        submissionProcessDetail?.application_status === 'approved' ||
                        submissionProcessDetail?.application_status === 'revision'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">3</p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center pt-3 gap-[200px] ">
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      submissionProcessDetail?.application_status === 'pending' && 'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-center">Pengajuan Terkirim</p>
                  </div>
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      submissionProcessDetail?.application_status === 'processed' && 'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-[##858585] text-center">Pengajuan Diproses</p>
                  </div>
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      (submissionProcessDetail?.application_status === 'rejected' ||
                        submissionProcessDetail?.application_status === 'approved' ||
                        submissionProcessDetail?.application_status === 'revision') &&
                        'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-[##858585] text-center max-w">Pengajuan Diterima / Ditolak</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

interface IFileDownloadProps {
  url: string
  fileName: string
  title: string
}

const FileDownload = ({ fileName, url, title }: IFileDownloadProps) => {
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.click()
  }

  return (
    <div className="md:flex gap-4 items-center justify-between w-full">
      <p className="text-base font-semibold md:max-w-[80%] w-full">{title}</p>
      <Button
        variant="outline"
        className="border-primary border-2 w-full md:w-[180px] mt-4 md:mt-0 rounded-lg gap-2 items-center"
        onClick={() => handleDownload(url, fileName)}
      >
        <p className="text-sm text-primary">Unduh</p>
        <HiArrowDownTray className="text-lg text-primary" />
      </Button>
    </div>
  )
}
