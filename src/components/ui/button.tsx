/* eslint-disable @typescript-eslint/indent */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ImSpinner2 } from 'react-icons/im'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex relative items-center justify-center rounded-xl text-sm font-medium transition-colors outline-none ring-0 disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-zinc-50 hover:bg-[#C21D49] disabled:bg-primary/80',
        destructive: 'bg-red-500 text-zinc-50 hover:bg-red-600 disabled:bg-red-500/80',
        outline: 'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-primary disabled:bg-white/80',
        secondary: 'bg-zinc-100 text-primary hover:bg-zinc-200 disabled:bg-zinc-100/80',
        ghost: 'hover:bg-zinc-100 hover:text-primary disabled:bg-white/80',
        link: 'text-primary underline-offset-4 hover:underline disabled:text-primary/80',
        base: 'bg-white text-primary hover:bg-zinc-100 hover:text-primary disabled:bg-white/80',
        cancel: 'bg-zinc-200 text-[#898989] hover:bg-zinc-300 disabled:bg-zinc-200/80'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const loadingVariants = cva('flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full', {
  variants: {
    variant: {
      default: 'text-zinc-50',
      destructive: 'text-zinc-50',
      outline: 'text-black',
      secondary: 'text-primary',
      ghost: 'text-black',
      link: 'text-primary',
      base: 'text-primary',
      cancel: 'text-[#898989]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'pointer-events-none disabled:text-transparent'
        )}
        disabled={props.disabled || loading}
        ref={ref}
        {...props}
      >
        {props.children}
        {loading && (
          <div className={cn(loadingVariants({ variant }))}>
            <ImSpinner2 className="animate-spin m-auto" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
