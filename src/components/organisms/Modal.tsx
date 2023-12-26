import { HiXMark } from 'react-icons/hi2'

import { useDisableBodyScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ImSpinner2 } from 'react-icons/im'

interface ModalProps {
  isShow: boolean
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

const Loading = () => {
  return (
    <div className="min-h-[500px] flex">
      <ImSpinner2 className="animate-spin m-auto text-3xl text-primary" />
    </div>
  )
}

const Modal = ({ isShow, children, className, isLoading }: ModalProps) => {
  useDisableBodyScroll(isShow)

  return (
    <section
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 px-[18px] transition-all duration-300 md:px-0',
        isShow ? 'visible bg-gray-900/75' : 'invisible'
      )}
    >
      <article
        className={cn(
          'w-full overflow-hidden rounded-lg px-8 pb-8 bg-white shadow-xl transition-all duration-300 md:max-w-xl flex flex-col gap-6',
          'max-h-[calc(100vh-50px)] overflow-y-auto',
          isShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className
        )}
      >
        {isLoading ? <Loading /> : children}
      </article>
    </section>
  )
}

interface ModalHeaderProps {
  children: React.ReactNode
  setIsShow: (value: boolean) => void
  className?: string
}

const Header = ({ children, setIsShow, className }: ModalHeaderProps) => {
  const handleClose = () => {
    setIsShow(false)
  }

  return (
    <div className="flex items-start justify-between pt-8 pb-4 sticky top-0 bg-white border-b border-zinc-200 z-10">
      <div className={className}>{children}</div>
      <Button variant="outline" size="icon" onClick={handleClose}>
        <HiXMark className="text-lg text-font" />
      </Button>
    </div>
  )
}

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

const Footer = ({ children, className }: ModalFooterProps) => {
  return <div className={cn('flex gap-3 justify-end', className)}>{children}</div>
}

Modal.Header = Header
Modal.Footer = Footer

export default Modal
