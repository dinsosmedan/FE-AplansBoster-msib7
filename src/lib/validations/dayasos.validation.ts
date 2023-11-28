import * as Yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const worshipPlaceValidation = Yup.object({
  name: Yup.string().required('Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
  type: Yup.string().required('Tipe wajib diisi'),
  areaLevel3: Yup.string().required('Kecamatan wajib diisi'),
  areaLevel4: Yup.string().required('Kelurahan wajib diisi'),
  address: Yup.string().required('Alamat wajib diisi').max(255, 'Alamat maksimal 255 karakter'),
  picName: Yup.string().max(255, 'Nama PIC maksimal 255 karakter'),
  picPhoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter'),
  status: Yup.string().required('Status wajib diisi').max(255, 'Status maksimal 255 karakter'),
  year: Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY'),
  note: Yup.string().max(255, 'Catatan maksimal 255 karakter')
})

export type worshipPlaceFields = Yup.InferType<typeof worshipPlaceValidation>

export const veteranValidation = Yup.object({
  beneficiary: Yup.string().required('Penerima manfaat wajib diisi'),
  veteranIdentityNumber: Yup.string().max(50, 'NPV maksimal 50 karakter'),
  veteranUnit: Yup.string().max(255, 'Satuan Veteran maksimal 255 karakter'),
  uniformSize: Yup.string().max(255, 'Ukuran Seragam Veteran maksimal 255 karakter'),
  isActive: Yup.boolean(),
  areaLevel3: Yup.string(),
  areaLevel4: Yup.string(),
  address: Yup.string().required('Alamat wajib diisi').max(255, 'Alamat maksimal 255 karakter')
})

export type veteranFields = Yup.InferType<typeof veteranValidation>

export const djpmValidation = Yup.object({
  beneficiary: Yup.string().required('Penerima manfaat wajib diisi'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter'),
  serviceType: Yup.string().required('Jenis Layanan wajib diisi'),
  dutyPlace: Yup.string().required('Tempat Tugas wajib diisi').max(255, 'Tempat Tugas maksimal 255 karakter'),
  dutyAddress: Yup.string().required('Alamat Tugas wajib diisi').max(255, 'Alamat Tugas maksimal 255 karakter'),
  bankAccountNumber: Yup.string().required('No Rekening Bank wajib diisi').max(255, 'No Rekening Bank maksimal 255 karakter'),
  bankAccountName: Yup.string().required('Nama Rekening Bank wajib diisi').max(255, 'Nama Rekening Bank maksimal 255 karakter'),
  bankBranchName: Yup.string().required('Kantor Cabang Bank wajib diisi').max(255, 'Kantor Cabang Bank maksimal 255 karakter'),
  status: Yup.string().required('Status wajib diisi').max(255, 'Status maksimal 255 karakter'),
  budgetYear:  Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY'),
  assistanceAmount: Yup.number()
})

export type djpmFields = Yup.InferType<typeof djpmValidation>
