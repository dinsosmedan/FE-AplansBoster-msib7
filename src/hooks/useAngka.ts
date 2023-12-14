export function formatRibuan(angka: number) {
  return angka.toLocaleString('id-ID')
}

export function hitungPersentase(array: any[]) {
  // Menghitung total jumlah elemen dalam array
  const total = array.reduce((acc, current) => acc + current, 0)

  // Menghitung persentase setiap elemen dalam array dan membulatkannya ke bilangan bulat
  const persentase = array.map((element) => Math.round((element / total) * 100))

  return persentase
}
