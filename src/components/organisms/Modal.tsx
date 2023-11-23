import { HiXMark } from 'react-icons/hi2'

import { useDisableBodyScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface ModalProps {
  isShow: boolean
  children: React.ReactNode
}

const Modal = ({ isShow, children }: ModalProps) => {
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
          'w-full overflow-hidden rounded-lg p-8 bg-white shadow-xl transition-all duration-300 md:max-w-xl flex flex-col gap-6',
          isShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        {children}
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
    <div className="flex items-start justify-between">
      <div className={className}>{children}</div>
      <Button variant="outline" size="icon" onClick={handleClose}>
        <HiXMark className="text-lg text-font" />
      </Button>
    </div>
  )
}

interface ModalFooterProps {
  children: React.ReactNode
}

const Footer = ({ children }: ModalFooterProps) => {
  return <div className="flex gap-3 justify-end">{children}</div>
}

Modal.Header = Header
Modal.Footer = Footer

export default Modal
