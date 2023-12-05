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
