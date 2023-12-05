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
  isActive: Yup.boolean()
})

export type veteranFields = Yup.InferType<typeof veteranValidation>

export const djpmValidation = Yup.object({
  beneficiary: Yup.string().required('Penerima manfaat wajib diisi'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  serviceType: Yup.string().required('Jenis Layanan wajib diisi'),
  dutyPlace: Yup.string().required('Tempat Tugas wajib diisi').max(255, 'Tempat Tugas maksimal 255 karakter'),
  dutyAddress: Yup.string().required('Alamat Tugas wajib diisi').max(255, 'Alamat Tugas maksimal 255 karakter'),
  bankAccountNumber: Yup.string()
    .required('No Rekening Bank wajib diisi')
    .max(255, 'No Rekening Bank maksimal 255 karakter'),
  bankAccountName: Yup.string()
    .required('Nama Rekening Bank wajib diisi')
    .max(255, 'Nama Rekening Bank maksimal 255 karakter'),
  bankBranchName: Yup.string()
    .required('Kantor Cabang Bank wajib diisi')
    .max(255, 'Kantor Cabang Bank maksimal 255 karakter'),
  status: Yup.string().required('Status wajib diisi').max(255, 'Status maksimal 255 karakter'),
  budgetYear: Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY'),
  assistanceAmount: Yup.number()
})

export type djpmFields = Yup.InferType<typeof djpmValidation>

export const kubeValidation = Yup.object({
  businessName: Yup.string().required('Nama Usaha wajib diisi').max(255, 'Nama Usaha maksimal 255 karakter'),
  businessType: Yup.string().required('Jenis Usaha wajib diisi').max(255, 'Jenis Usaha maksimal 255 karakter'),
  businessAddress: Yup.string().required('Alamat Usaha wajib diisi').max(255, 'Alamat Usaha maksimal 255 karakter'),
  areaLevel3: Yup.string().required('Kecamatan wajib diisi'),
  areaLevel4: Yup.string().required('Kelurahan wajib diisi'),
  // assistanceAmount: Yup.number().required('Jumlah Bantuan wajib diisi'),
  assistanceAmount: Yup.number(),
  budgetYear: Yup.string()
    .matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY')
    .required('Tahun Anggaran wajib diisi'),
  status: Yup.string().required('Status wajib diisi').max(255, 'Status maksimal 255 karakter'),
  note: Yup.string().required('Keterangan wajib diisi').max(255, 'Catatan maksimal 255 karakter'),
  members: Yup.array().of(
    Yup.object().shape({
      nik: Yup.string(),
      beneficiary: Yup.string().required('Penerima manfaat wajib diisi'),
      position: Yup.string().required('Jabatan wajib diisi')
    })
  )
})

export type kubeFields = Yup.InferType<typeof kubeValidation>

export const hibahValidation = Yup.object({
  name: Yup.string().required('Nama Hibah wajib diisi').max(255, 'Nama Hibah maksimal 255 karakter'),
  address: Yup.string().required('Alamat wajib diisi').max(255, 'Alamat maksimal 255 karakter'),
  areaLevel3: Yup.string(),
  areaLevel4: Yup.string(),
  chairmanName: Yup.string().max(255, 'Nama Ketua maksimal 255 karakter'),
  chairmanIdentityNumber: Yup.string()
    .length(16, 'Harus tepat 16 digit')
    .matches(/^[0-9]+$/, 'Harus berisi hanya angka')
    .required('NIK Ketua wajib diisi'),
  secretaryName: Yup.string().max(255, 'Nama Sekretaris maksimal 255 karakter'),
  secretaryIdentityNumber: Yup.string()
    .length(16, 'Harus tepat 16 digit')
    .matches(/^[0-9]+$/, 'Harus berisi hanya angka')
    .required('NIK Sekretaris wajib diisi'),
  treasurerName: Yup.string().max(255, 'Nama Bendahara maksimal 255 karakter'),
  treasurerIdentityNumber: Yup.string()
    .length(16, 'Harus tepat 16 digit')
    .matches(/^[0-9]+$/, 'Harus berisi hanya angka')
    .required('Required'),
  contactNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter'),
  bankAccountNumber: Yup.string()
    .min(1, 'Nomor rekening minimal 1 karakter')
    .max(32, 'Nomor rekening maksimal 32 karakter'),
  bankName: Yup.string().max(255, 'Nama Bank maksimal 255 karakter'),
  bankAccountName: Yup.string().max(255, 'Nama Rekening Bank maksimal 255 karakter'),
  bankAccountAddress: Yup.string().max(255, 'Alamat Bank maksimal 255 karakter'),
  requestedAmount: Yup.number(),
  approvedAmount: Yup.number(),
  firstDisbursementAmount: Yup.number(),
  secondDisbursementAmount: Yup.number(),
  note: Yup.string().max(255, 'Catatan maksimal 255 karakter'),
  budgetYear: Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY')
})

export type hibahFields = Yup.InferType<typeof hibahValidation>

export const pokmasValidation = Yup.object({
  executionDate: Yup.mixed().test('executionDate', 'Tanggal Pelaksanaan wajib diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  applicantPhoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  communityName: Yup.string().required('Nama Pokmas wajib diisi').max(255, 'Nama Pokmas maksimal 255 karakter'),
  communityAddress: Yup.string().max(255, 'Alamat Pokmas maksimal 255 karakter').required('Alamat Pokmas wajib diisi'),
  communityActivityCode: Yup.string().max(255, 'Kode Kegiatan Pokmas maksimal 255 karakter'),
  communityActivityTypeDescription: Yup.string().max(255, 'Jenis Kegiatan Pokmas maksimal 255 karakter'),
  communityAssistanceType: Yup.string().max(255, 'Jenis Bantuan Pokmas maksimal 255 karakter'),
  areaLevel3: Yup.string().required('Kecamatan wajib diisi'),
  areaLevel4: Yup.string().required('Kelurahan wajib diisi'),
  requestedRabAmount: Yup.mixed().test('requestedRabAmount', 'Invalid Format', function (value) {
    return typeof value === 'number' || (!isNaN(Number(value)) && typeof value === 'string')
  }),
  requestedBansosAmount: Yup.mixed().test('requestedBansosAmount', 'Invalid Format', function (value) {
    return typeof value === 'number' || (!isNaN(Number(value)) && typeof value === 'string')
  }),
  approvedFundAmount: Yup.mixed().test('approvedFundAmount', 'Invalid Format', function (value) {
    return typeof value === 'number' || (!isNaN(Number(value)) && typeof value === 'string')
  }),
  applicationYear: Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY'),
  bankName: Yup.string().max(255, 'Nama Bank maksimal 255 karakter').required('Nama Bank wajib diisi'),
  bankAccName: Yup.string().max(255, 'Nama Rekening Bank maksimal 255 karakter'),
  bankAccNumber: Yup.string()
    .required('Nomor Rekening Bank wajib diisi')
    .max(18, 'Nomor Rekening Bank maksimal 18 karakter')
    .min(8, 'Nomor Rekening Bank minimal 8 karakter'),
  bankAccAddress: Yup.string().max(255, 'Alamat Bank maksimal 255 karakter'),
  members: Yup.array().of(
    Yup.object().shape({
      nik: Yup.string(),
      beneficiary: Yup.string().required('Penerima manfaat wajib diisi'),
      position: Yup.string().required('Jabatan wajib diisi')
    })
  ),
  statusDisimbursement: Yup.string().max(50, 'Status Pencairan maksimal 255 karakter'),
  note: Yup.string().max(255, 'Catatan maksimal 255 karakter'),
  executionPlace: Yup.string().max(255, 'Tempat Pelaksanaan maksimal 255 karakter')
})

export type pokmasFields = Yup.InferType<typeof pokmasValidation>
