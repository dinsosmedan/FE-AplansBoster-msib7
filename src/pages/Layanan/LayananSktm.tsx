import { Container, Loading, Modal, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAlert } from '@/store/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle, HiOutlineEye } from 'react-icons/hi2'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useGetIndigencyCertificate } from '@/store/server/useService'
import useGetParams from '@/hooks/useGetParams'

export default function LayananSktm() {
  interface FormValues {
    nik: string
    tahunAnggaran: string
    jadwalAwal: string
    tahunNotifikasi: string
    jumlahPeserta: string
    batch: string
    jadwalAkhir: string
    jenisEvent: string
  }


  const { alert } = useAlert()
  const showAlert = () => {
    void alert({
      title: 'User ditambahkan',
      description: 'User berhasil ditambahkan',
      submitText: 'Oke',
      variant: 'success'
    }).then(() => {
      console.log('oke')
    })
  }

  const [isShow, setIsShow] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [search, setsearch] = useState('')
  // const [isActive, setIsActive] = React.useState('Data Pengajuan')
  const { tab } = useGetParams(['tab'])
  const { data: indigencyCertificate, isLoading, refetch } = useGetIndigencyCertificate(tab, search)

  useEffect(() => {
    refetch()
  }, [tab])

  useEffect(() => {
    refetch()
  }, [search])

  // const data = response

  // console.log(indigencyCertificate)

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  if (isLoading) {
    return <Loading />
  }



  const onSubmit = async (values: FormValues) => {
    setsearch(values.nik)
    refetch()
    // console.log(values)
  }
  return (
    <Container>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="w-12/12">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search value={field.value} onChange={field.onChange} placeholder="Masukkan Nama / NIK" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <FilterLayanan />
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Keluarahan</TableHead>
              {/* <TableHead className="text-white font-bold text-[15px] bg-primary">Tanggal Pengajuan</TableHead> */}
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status DTKS</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              indigencyCertificate.map((valsktm: any, i: any) => {
                const val = valsktm.peopleConcerned
                const status = valsktm.applicationStatus
                const color = status == 'pending' ? 'text-[#FFB60A] ' : status == 'approved' ? 'text-green-500	' : status == 'rejected' ? 'text-rose-500	' : status == 'processed' ? 'text-cyan-500	' : ''
                return (
                  <TableRow key={i} >
                    <TableCell className="text-left bg-[#F9FAFC]">{val.name}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.identityNumber}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.address.areaLevel3.name}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.address.areaLevel4.name}</TableCell>
                    {/* <TableCell className="text-center bg-[#F9FAFC]">
                      <div className="bg-[#E9FFEF] rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto">
                        <div className="w-2 h-2 rounded-full bg-[#409261]" />
                        <p className="text-[#409261] text-xs">{val.identityNumber}</p>
                      </div>
                    </TableCell> */}
                    <TableCell className="text-left bg-[#F9FAFC]">{valsktm.dtksStatus}</TableCell>
                    <TableCell className={`text-left bg-[#F9FAFC] ${color}`}>{status}</TableCell>
                    <TableCell
                      className="flex items-center justify-center text-left bg-[#F9FAFC] "
                      onClick={() => setIsShow(true)}
                    >
                      <Button className="py-6">
                        <p className="text-base font-bold pr-3">Action</p>
                        <HiOutlineExclamationCircle className="h-6 w-6" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
        <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Data Pengajuan</h3>
            <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
          </Modal.Header>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 pb-5">
                <FormField
                  name="jadwalAwal"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunNotifikasi"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK yang Bersangkutan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunAnggaran"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Sekolah/Universitas Tujuan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenjang Pendidikan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Bulan Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tahun Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenis DTKS</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jadwalAkhir"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full text-center bg-primary py-3">
                <p className="text-base font-bold text-white">Berkas </p>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT PERMOHONAN</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SCAN FOTO COPY SURAT DOMISILI DARI KELURAHAN SETEMPAT</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KARTU KELUARGA</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KTP</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">
                  SURAT KETERANGAN DARI SEKOLAH/SURAT PENGUMUMAN DARI PIHAK UNIVERSITAS
                </p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <FormField
                name="jenisEvent"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pengajuan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="jumlahPeserta"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Keterangan" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Modal.Footer>
            <Button
              variant="cancel"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" onClick={showAlert}>
              <p className="text-white font-bold">Update</p>
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
      <Pagination
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  )
}


// const response = [
//   {
//     "id": "9ad1dd93-f2dc-478b-bc92-0aa3757b4ad6",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:26:03+07:00",
//     "updatedAt": "2023-12-11T09:26:03+07:00"
//   },
//   {
//     "id": "9ad1ddcd-6f94-4012-b2b5-344105704b7a",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:26:40+07:00",
//     "updatedAt": "2023-12-11T09:26:40+07:00"
//   },
//   {
//     "id": "9ad1de7d-76c2-4615-aae7-679145f5f106",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "approved",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:28:36+07:00",
//     "updatedAt": "2023-12-11T09:28:36+07:00"
//   },
//   {
//     "id": "9ad1de9b-6833-441e-b6e5-0b13b6ae2d01",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "approved",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:28:55+07:00",
//     "updatedAt": "2023-12-11T09:28:55+07:00"
//   },
//   {
//     "id": "9ad1e21b-0ae3-430b-aace-3e299afc8b1d",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "approved",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:38:42+07:00",
//     "updatedAt": "2023-12-11T09:38:42+07:00"
//   },
//   {
//     "id": "9ad1e250-114f-4cee-b42b-72ff972a8460",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "rejected",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:39:17+07:00",
//     "updatedAt": "2023-12-11T09:39:17+07:00"
//   },
//   {
//     "id": "9ad1e268-8adb-4758-87a5-edb40176a9da",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "rejected",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:39:33+07:00",
//     "updatedAt": "2023-12-11T09:39:33+07:00"
//   },
//   {
//     "id": "9ad1e351-efa0-4bc9-97c3-a75b56929716",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "rejected",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:42:06+07:00",
//     "updatedAt": "2023-12-11T09:42:06+07:00"
//   },
//   {
//     "id": "9ad1e3a7-017a-40ec-bc9a-e746c6b46843",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "processed",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:43:02+07:00",
//     "updatedAt": "2023-12-11T09:43:02+07:00"
//   },
//   {
//     "id": "9ad1e3b4-e451-4e0f-a4bf-22bfccda93dd",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "processed",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:43:11+07:00",
//     "updatedAt": "2023-12-11T09:43:11+07:00"
//   },
//   {
//     "id": "9ad1e3ef-70e2-4f2a-b1bc-94c3355fd9b6",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "processed",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:43:49+07:00",
//     "updatedAt": "2023-12-11T09:43:49+07:00"
//   },
//   {
//     "id": "9ad1e405-1384-4f12-a602-794da8fcacba",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "processed",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:44:03+07:00",
//     "updatedAt": "2023-12-11T09:44:03+07:00"
//   },
//   {
//     "id": "9ad1e415-1e27-43c4-8ef0-c47da5a5cc62",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:44:14+07:00",
//     "updatedAt": "2023-12-11T09:44:14+07:00"
//   },
//   {
//     "id": "9ad1e433-d9d3-4a0b-93dc-9b594c00fa17",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:44:34+07:00",
//     "updatedAt": "2023-12-11T09:44:34+07:00"
//   },
//   {
//     "id": "9ad1e458-a5c6-4512-beac-9796e6f2c050",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "non-dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:44:58+07:00",
//     "updatedAt": "2023-12-11T09:44:58+07:00"
//   },
//   {
//     "id": "9ad1e4ba-ebf1-4353-b177-2816e32c628c",
//     "user": {
//       "id": "9ad1dafb-79f5-4244-b1a2-0a0a7f042667",
//       "employeeIdentityNumber": "113333555555",
//       "name": "Dev Aplans Boster",
//       "phoneNumber": null,
//       "isActive": true,
//       "email": "aplans-dev@example.com",
//       "role": {
//         "id": "9ad1dafa-f478-476e-9f5b-9c9b68678d3d",
//         "name": "Developer",
//         "permissions": [
//           {
//             "id": "9ad1daf9-8334-4d58-944a-a77392eecec1",
//             "name": "Pemberdayaan Sosial dan Penanganan Fakir Miskin",
//             "slugName": "dayasos-pfm",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-85bb-45bc-b1b1-c2d8b7295b9c",
//             "name": "Perlindungan dan Jaminan Sosial",
//             "slugName": "linjamsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8771-402c-b15c-b5e0e8a928b1",
//             "name": "Rehabilitasi Sosial",
//             "slugName": "rehabsos",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-892e-47fb-a43e-30d99d17c6d2",
//             "name": "User Management",
//             "slugName": "user-management",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           },
//           {
//             "id": "9ad1daf9-8ae7-482f-9ee1-0779d0a74cf9",
//             "name": "Role",
//             "slugName": "role",
//             "isPermitted": true,
//             "createdAt": "2023-12-11T09:18:46+07:00",
//             "updatedAt": "2023-12-11T09:18:46+07:00"
//           }
//         ],
//         "createdAt": "2023-12-11T09:18:47+07:00",
//         "updatedAt": "2023-12-11T09:18:47+07:00"
//       },
//       "createdAt": "2023-12-11T09:18:47+07:00",
//       "updatedAt": "2023-12-11T09:18:47+07:00"
//     },
//     "applicant": {
//       "id": "9ad1dafd-17a9-47da-9ffe-a6dc05bad857",
//       "identityNumber": "1207266006110000",
//       "familyCardNumber": "1207260806120018",
//       "name": "MAINALIJANTI",
//       "address": {
//         "fullAddress": "JL. CHAIDIR LINGK. VI",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "a1fac871-641d-420a-a651-fe0c46afe510",
//           "name": "Nelayan Indah",
//           "bpsName": "NELAYAN INDAH",
//           "kemendagriName": "NELAYAN INDAH",
//           "bpsCode": "1275190006",
//           "kemendagriCode": "12.71.13.1005",
//           "kemendagriSpecificCode": "1005",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": "2011-06-20",
//       "age": 12,
//       "birthPlace": "TJ. SELAMAT",
//       "gender": "PEREMPUAN",
//       "lastEducation": null,
//       "religion": null,
//       "occupation": "BELUM DI TENTUKAN",
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": "ANAK",
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": "JUMIA",
//       "isDtks": true,
//       "createdAt": "2023-12-11T09:18:48+07:00",
//       "updatedAt": "2023-12-11T09:18:48+07:00"
//     },
//     "peopleConcerned": {
//       "id": "9ad1db22-feb2-4559-abc7-50000b4db261",
//       "identityNumber": "1207261203650007",
//       "familyCardNumber": "1271131702160012",
//       "name": "TOMPAK SINAGA/TUMPKA SINAGA",
//       "address": {
//         "fullAddress": "JALAN TUNA 7 LINGK IX",
//         "areaLevel3": {
//           "id": "b4b5b918-1d86-49d0-a354-6da4f2edd603",
//           "name": "Medan Labuhan",
//           "bpsName": "MEDAN LABUHAN",
//           "kemendagriName": "MEDAN LABUHAN",
//           "bpsCode": "1275190",
//           "kemendagriCode": "12.71.13",
//           "kemendagriSpecificCode": "13",
//           "type": "level_3",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         },
//         "areaLevel4": {
//           "id": "b661688f-055d-4252-b704-a8f221dbffca",
//           "name": "Tangkahan",
//           "bpsName": "TANGKAHAN",
//           "kemendagriName": "TANGKAHAN",
//           "bpsCode": "1275190002",
//           "kemendagriCode": "12.71.13.1006",
//           "kemendagriSpecificCode": "1006",
//           "type": "level_4",
//           "createdAt": "2023-12-11T09:18:45+07:00",
//           "updatedAt": "2023-12-11T09:18:45+07:00"
//         }
//       },
//       "birthDate": null,
//       "age": null,
//       "birthPlace": null,
//       "gender": null,
//       "lastEducation": null,
//       "religion": null,
//       "occupation": null,
//       "maritalStatus": null,
//       "citizenship": null,
//       "familyRelationship": null,
//       "bloodType": null,
//       "fatherName": null,
//       "motherName": null,
//       "isDtks": null,
//       "createdAt": "2023-12-11T09:19:13+07:00",
//       "updatedAt": "2023-12-11T09:19:13+07:00"
//     },
//     "certificateDestination": "Sekolah",
//     "issueDate": null,
//     "issueYear": null,
//     "statusDtks": "dtks",
//     "applicationStatus": "pending",
//     "petitionLetterPath": null,
//     "domicileLetterPath": null,
//     "familyCardPath": null,
//     "idCardPath": null,
//     "educationLevel": null,
//     "schoolLetterPath": null,
//     "salarySlipPath": null,
//     "localsApprovalLetterPath": null,
//     "lowIncomeLetterPath": null,
//     "frontViewHousePath": null,
//     "sittingViewPath": null,
//     "chamberViewHousePath": null,
//     "kitchenViewHousePath": null,
//     "note": null,
//     "createdAt": "2023-12-11T09:46:02+07:00",
//     "updatedAt": "2023-12-11T09:46:02+07:00"
//   }
// ]