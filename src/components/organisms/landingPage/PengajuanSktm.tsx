import * as React from 'react'
import { CardLandingPage, NoData } from '..'
import { BgEmpty } from '@/assets'
import { Loading } from '@/components'
import { useGetIndigencyCertificateApplicationPublic } from '@/store/server'
import { cn } from '@/lib/utils'
import { formatToView } from '@/lib/services/formatDate'
import { HiAcademicCap } from 'react-icons/hi2'
import { useGetParams } from '@/hooks'
import { type IIndigencyCertificate } from '@/lib/types/service.type'

interface PengajuanSktmProps {
  href: string
}

const handleApplicationCategoryLabel = (category: string) => {
  switch (category) {
    case 'dtks-schools':
      return 'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'
    case 'non-dtks-schools':
      return 'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'
    case 'dtks-courts':
      return 'SKTM Untuk Pelayanan ke Pengadilan Agama/LBH (Terdaftar DTKS)'
    case 'non-dtks-courts':
      return 'SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (TidakTerdaftarDTKS)'
  }
}

export default function PengajuanSktm({ href }: PengajuanSktmProps) {
  const [detail, setDetail] = React.useState<IIndigencyCertificate>({} as IIndigencyCertificate)
  const { category } = useGetParams(['category'])
  const { data, isLoading } = useGetIndigencyCertificateApplicationPublic()

  React.useEffect(() => {
    if (category) {
      const results = data?.filter((item) => item.id === category)[0]
      setDetail((results as IIndigencyCertificate) ?? ({} as IIndigencyCertificate))
    }
  }, [category])

  if (isLoading) return <Loading />

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <section className="flex flex-col gap-8">
            {data?.map((item, index) => (
              <CardLandingPage
                key={index}
                className={cn(
                  'lg:w-[400px] w-[90%] shadow-sm',
                  item.id === category && 'border-2 border-primary bg-[#F9F4F5]'
                )}
                btnText={item.applicationStatus}
                href={`${href}?category=${item.id}`}
                isHadButtonIcon={false}
                title={handleApplicationCategoryLabel(item.applicationCategory) as string}
                desc={formatToView(item.updatedAt)}
                icon={HiAcademicCap}
              />
            ))}
          </section>
          {Object.keys(detail).length !== 0 && (
            <div className="bg-white h-fit w-full pb-14">
              <div className="pt-24 px-[90px] flex flex-row justify-center">
                <div
                  className={cn(
                    'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                    detail?.applicationStatus === 'pending' ||
                      detail?.applicationStatus === 'processed' ||
                      detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision'
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
                    detail?.applicationStatus === 'processed' ||
                      detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision'
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
                    detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision'
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
                    (detail?.applicationStatus === 'pending' ||
                      detail?.applicationStatus === 'processed' ||
                      detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision') &&
                      'bg-primary text-white'
                  )}
                >
                  <p className="text-base text-center">Pengajuan Terkirim</p>
                </div>
                <div
                  className={cn(
                    'w-[135px] h-[60px] rounded-lg flex items-center',
                    (detail?.applicationStatus === 'processed' ||
                      detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision') &&
                      'bg-primary text-white'
                  )}
                >
                  <p className="text-base text-[##858585] text-center">Pengajuan Diproses</p>
                </div>
                <div
                  className={cn(
                    'w-[135px] h-[60px] rounded-lg flex items-center',
                    (detail?.applicationStatus === 'rejected' ||
                      detail?.applicationStatus === 'approved' ||
                      detail?.applicationStatus === 'revision') &&
                      'bg-primary text-white'
                  )}
                >
                  <p className="text-base text-[##858585] text-center max-w">Pengajuan Diterima / Ditolak</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <NoData
          title="Tidak Ada Proses Pengajuan"
          desc="Mohon Maaf, Anda Belum Melakukan Pengajuan"
          image={BgEmpty}
          className="w-full"
        />
      )}
    </>
  )
}
