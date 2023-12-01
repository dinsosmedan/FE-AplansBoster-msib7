export const formatStringToDate = (date: string): Date => {
  const dateArray = date.split('-')
  const formattedDate = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]))
  return formattedDate
}
