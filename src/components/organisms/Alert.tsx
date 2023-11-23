import { HiCheckCircle, HiExclamationTriangle } from 'react-icons/hi2'

import { useDisableBodyScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import * as React from 'react'

export interface AlertOptions {
  title: string
  description: string
  variant: 'success' | 'danger'
  submitText: string
  isLoading?: boolean
  catchOnCancel?: boolean
}

interface BaseAlertProps extends AlertOptions {
  open: boolean
  onSubmit: () => void
  onClose: () => void
}

export default function Alert({ open, onSubmit, onClose, ...rest }: BaseAlertProps) {
  const { title, description, variant, submitText } = rest

  useDisableBodyScroll(open)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (variant === 'success') {
        onSubmit()
      }
    }, 1500)

    return () => {
      clearTimeout(timeout)
    }
  }, [variant])

  return (
    <section
      className={cn(
        'fixed inset-0 z-[9999999] flex items-end justify-center p-4 transition-all duration-300 md:items-center',
        open ? 'visible bg-gray-900/75' : 'invisible'
      )}
    >
      <div
        className={cn(
          'xl:max-w-[486px] xl:w-[486px] w-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 p-8 gap-6 flex flex-col',
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
      >
        <div className="flex flex-col items-center gap-4">
          {variant === 'danger' && <HiExclamationTriangle className="text-[144px] text-primary" />}
          {variant === 'success' && <HiCheckCircle className="text-[144px] text-primary" />}

          <div className="mt-1 text-center">
            <h3 className="text-base font-bold capitalize leading-6 text-title md:text-3xl">{title}</h3>
            <p className="mt-2 text-sm text-gray-500 md:text-base">{description}</p>
          </div>
        </div>
        {variant === 'danger' && (
          <div className="flex flex-col-reverse items-center gap-4 justify-center md:flex-row">
            <Button
              variant="outline"
              className="w-full rounded-lg py-5 px-6 md:w-fit border-primary text-primary"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              className="w-full border border-primary py-5 px-6 rounded-lg capitalize md:w-fit"
              onClick={onSubmit}
            >
              {submitText}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
