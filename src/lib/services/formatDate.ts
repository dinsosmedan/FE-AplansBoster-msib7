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

export const waktuLalu = (waktuDiberikan: any) => {
  // Waktu saat ini
  const waktuSekarang: any = new Date()

  // Hitung selisih waktu dalam milidetik
  const selisihWaktuMs = waktuSekarang - waktuDiberikan

  // Hitung selisih waktu dalam detik, menit, jam, hari, minggu, bulan, dan tahun
  const detikLalu = Math.floor(selisihWaktuMs / 1000)
  const menitLalu = Math.floor(detikLalu / 60)
  const jamLalu = Math.floor(menitLalu / 60)
  const hariLalu = Math.floor(jamLalu / 24)
  const mingguLalu = Math.floor(hariLalu / 7)
  const bulanLalu = Math.floor(hariLalu / 30) // Perkiraan bulan, tidak akurat untuk semua kasus
  const tahunLalu = Math.floor(hariLalu / 365) // Perkiraan tahun, tidak akurat untuk semua kasus

  if (tahunLalu > 0) {
    return `${tahunLalu} Tahun yang Lalu`
  } else if (bulanLalu > 0) {
    return `${bulanLalu} Bulan yang Lalu`
  } else if (mingguLalu > 0) {
    return `${mingguLalu} Minggu yang Lalu`
  } else if (hariLalu > 0) {
    return `${hariLalu} Hari yang Lalu`
  } else if (jamLalu > 0) {
    return `${jamLalu} Jam yang Lalu`
  } else if (menitLalu > 0) {
    return `${menitLalu} Menit yang Lalu`
  } else {
    return `${detikLalu} Detik yang Lalu`
  }
}

// Contoh penggunaan
// const waktuDiberikan = new Date("2023-12-17T04:45:38+00:00")
