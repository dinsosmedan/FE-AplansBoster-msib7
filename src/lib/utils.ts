import { toast } from '@/components/ui/use-toast'
import { type AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type IErrorResponse } from './types/user.type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPriceID = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}

export const bytesToSize = (bytes: number): string => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return '0 Byte'

  const i: number = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

export const handleOnError = (error: AxiosError, message?: string) => {
  const errorResponse = error.response?.data as IErrorResponse

  if (errorResponse !== undefined) {
    toast({
      variant: 'destructive',
      title: message ?? errorResponse.message ?? 'Gagal',
      description: 'Terjadi masalah dengan permintaan Anda.'
    })
  }
}

export const isFile = (file: File | string) => {
  if (Array.isArray(file) && file.length > 0 && file[0] instanceof File) {
    return true
  }
  return false
}
