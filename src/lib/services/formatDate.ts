export const formatStringToDate = (date: string): Date => {
  const dateArray = date.split('-')
  const formattedDate = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]))
  return formattedDate
}

export const formatDateToString = (value: Date): string => {
  return `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

export const formatToView = (date: string) => {
  // Membuat objek Date dari string
  const tanggalObjek = new Date(date)

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const tanggal = tanggalObjek.getDate()
  const bulan = tanggalObjek.getMonth() // Ingat bahwa bulan dimulai dari 0 (Januari = 0)
  const tahun = tanggalObjek.getFullYear()

  // Array untuk nama bulan
  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  // Mendapatkan nama bulan dari array
  const namaBulanStr = namaBulan[bulan]

  // Format output
  const hasil = tanggal + ' ' + namaBulanStr + ' ' + tahun
  return hasil
}
