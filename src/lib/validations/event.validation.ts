import * as Yup from 'yup'

export const eventValidation = Yup.object({
  eventType: Yup.string().required('Jenis kegiatan harus diisi'),
  eventDescription: Yup.string(),
  startDate: Yup.mixed().test('startDate', 'Tanggal mulai harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  endDate: Yup.mixed().test('startDate', 'Tanggal akhir harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  isActive: Yup.boolean().required('Status aktif harus diisi'),
  quota: Yup.number().required('Kuota harus diisi'),
  batch: Yup.string().required('Batch harus diisi'),
  scholarshipAnnouncementLetter: Yup.mixed().required('Surat pengumuman beasiswa harus diupload'),
  biodata: Yup.mixed().required('Biodata harus diupload'),
  scholarshipApplicationLetter: Yup.mixed().required('Surat permohonan beasiswa harus diupload'),
  nonReceiptOfScholarshipLetter: Yup.mixed().required('Surat tidak menerima beasiswa harus diupload'),
  nonGovernmentEmployeeLetter: Yup.mixed().required('Surat tidak pegawai negeri harus diupload')
})

export type eventFields = Yup.InferType<typeof eventValidation>
