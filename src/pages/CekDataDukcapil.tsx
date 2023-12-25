import { HiArrowRight } from 'react-icons/hi2'
import { useTitle } from '@/hooks'
import * as React from 'react'

import { Loading, Modal, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { useGetIdentityCheck } from '@/store/server'
import { useToast } from '@/components/ui/use-toast'

const CekDataDukcapil = () => {
  useTitle('Cek Data Dukcapil ')
  const { toast } = useToast()
  const [NIK, setNIK] = React.useState('')
  const [isShow, setIsShow] = React.useState(false)
  const { data: identityCheck, isFetching, refetch, isSuccess, isError } = useGetIdentityCheck(NIK, false)

  React.useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'NIK tidak ditemukan',
        description: 'Maaf NIK tidak ditemukan, Terjadi kesalahan pada permintaan Anda'
      })
    }
  }, [isError])

  return (
    <>
      {isFetching && <Loading />}
      <section className="relative bg-[url('@/assets/images/bg-cekriwayat-bansos.webp')] w-full h-[412px] bg-no-repeat bg-cover">
        <div className="flex items-center gap-5 px-[99px] w-full absolute bottom-[-30px]">
          <Search
            value={NIK}
            onChange={(e) => setNIK(e.target.value)}
            placeholder="Masukkan NIK Masyarakat Disini"
            className="h-[75px] w-full"
          />
          <Button className="h-[75px] px-7 text-base font-bold" onClick={async () => await refetch()}>
            Cari
          </Button>
        </div>
      </section>

      {isSuccess && (
        <section className="bg-white rounded-xl mt-[74px] px-[100px] pt-[30px] pb-8">
          <div className="w-full grid grid-cols-4">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-base font-bold">No. KK</p>
                <p className="text-base ">{identityCheck.familyCardNumber ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">NIK</p>
                <p className="text-base ">{identityCheck.identityNumber ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Nama</p>
                <p className="text-base ">{identityCheck.name ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Alamat</p>
                <p className="text-base ">{identityCheck.address.fullAddress ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Umur</p>
                <p className="text-base ">{identityCheck.age ?? '-'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-base font-bold">Kota</p>
                <p className="text-base ">Medan</p>
              </div>
              <div>
                <p className="text-base font-bold">Kecamatan</p>
                <p className="text-base ">{identityCheck.address.areaLevel3?.name ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Kelurahan</p>
                <p className="text-base ">{identityCheck.address.areaLevel4?.name ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Agama</p>
                <p className="text-base ">{identityCheck.religion ?? '-' ?? '-'}</p>
              </div>
              <div>
                <p className=" w-max text-base font-bold">Tempat, Tanggal Lahir</p>
                <p className="text-base w-max ">
                  {identityCheck.birthPlace ?? '-'} {identityCheck.birthDate ?? '-'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-base font-bold w-max">Jenis Kelamin</p>
                <p className="text-base ">{identityCheck.gender ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Pendidikan Terakhir</p>
                <p className="text-base ">{identityCheck.lastEducation ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold">Pekerjaan</p>
                <p className="text-base ">{identityCheck.occupation ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Golongan Darah</p>
                <p className="text-base ">{identityCheck.bloodType ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Status Kawin</p>
                <p className="text-base  w-max">{identityCheck.maritalStatus ?? '-'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-base font-bold w-max">Warga Negara</p>
                <p className="text-base ">{identityCheck.citizenship ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Status Keluarga</p>
                <p className="text-base w-max">{identityCheck.familyRelationship ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Ibu Kandung</p>
                <p className="text-base ">{identityCheck.motherName ?? '-'}</p>
              </div>
              <div>
                <p className="text-base font-bold w-max">Bapak Kandung</p>
                <p className="text-base ">{identityCheck.fatherName ?? '-'}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[26px]">
            <Button
              variant="base"
              className="flex justify-center items-center gap-[11px]"
              onClick={() => setIsShow(true)}
            >
              <p className="font-bold text-primary text-base">Tampilkan Data Keluarga Terkait</p>
              <HiArrowRight className="text-primary" />
            </Button>
          </div>

          <Modal isShow={isShow} className="md:max-w-6xl max-h-[calc(100vh-50px)] overflow-y-auto scroll-custom">
            <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
              <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Data Keluarga Terkait</h3>
              <p className="text-sm text-[#A1A1A1]">List detail dari data keluarga terkait</p>
            </Modal.Header>
            <section className="flex flex-col gap-5">
              {identityCheck.familyMembers.map((identityCheck) => (
                <article className="shadow-md grid grid-cols-4 gap-5 py-8 px-7 rounded-xl" key={identityCheck.id}>
                  <div>
                    <p className="text-base font-bold">No. KK</p>
                    <p className="text-base ">{identityCheck.familyCardNumber ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold">NIK</p>
                    <p className="text-base ">{identityCheck.identityNumber ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold">Nama</p>
                    <p className="text-base ">{identityCheck.name ?? '-'}</p>
                  </div>

                  <div>
                    <p className="text-base font-bold">Umur</p>
                    <p className="text-base ">{identityCheck.age ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold">Kota</p>
                    <p className="text-base ">Medan</p>
                  </div>

                  <div>
                    <p className="text-base font-bold">Agama</p>
                    <p className="text-base ">{identityCheck.religion ?? '-' ?? '-'}</p>
                  </div>
                  <div>
                    <p className=" w-max text-base font-bold">Tempat, Tanggal Lahir</p>
                    <p className="text-base w-max ">
                      {identityCheck.birthPlace} {identityCheck.birthDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Jenis Kelamin</p>
                    <p className="text-base ">{identityCheck.gender ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Pendidikan Terakhir</p>
                    <p className="text-base ">{identityCheck.lastEducation ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold">Pekerjaan</p>
                    <p className="text-base ">{identityCheck.occupation ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Golongan Darah</p>
                    <p className="text-base ">{identityCheck.bloodType ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Status Kawin</p>
                    <p className="text-base  w-max">{identityCheck.maritalStatus ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Warga Negara</p>
                    <p className="text-base ">{identityCheck.citizenship ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Status Keluarga</p>
                    <p className="text-base w-max">{identityCheck.familyRelationship ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Ibu Kandung</p>
                    <p className="text-base ">{identityCheck.motherName ?? '-'}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold w-max">Bapak Kandung</p>
                    <p className="text-base ">{identityCheck.fatherName ?? '-'}</p>
                  </div>
                </article>
              ))}
            </section>
          </Modal>
        </section>
      )}
    </>
  )
}
export default CekDataDukcapil
