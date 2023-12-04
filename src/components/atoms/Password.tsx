import { Input, type InputProps } from '../ui/input'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { Button } from '../ui/button'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

// eslint-disable-next-line react/display-name
const Password = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        className={cn(className)}
        autoComplete="on"
        type={showPassword ? 'text' : 'password'}
      />
      <Button
        type="button"
        variant="base"
        className="absolute right-0 top-1/2 mr-3 h-7 w-7 rounded-lg -translate-y-1/2 text-[#8897AD] hover:text-[#8897AD] md:mr-4 p-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <HiEyeSlash className="m-auto" /> : <HiEye className="m-auto" />}
      </Button>
    </div>
  )
})

export default Password
