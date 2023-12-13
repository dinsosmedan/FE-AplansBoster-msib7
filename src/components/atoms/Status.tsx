import { cn } from '@/lib/utils'

interface StatusProps {
  label: string
  isSuccess?: string
  isWarning?: string
  isDanger?: string
}

export default function Status({ label, isSuccess, isWarning, isDanger }: StatusProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-2 py-1 rounded-full',
        label === isSuccess && 'bg-green-100',
        label === isWarning && 'bg-yellow-100',
        label === isDanger && 'bg-red-100'
      )}
    >
      <div
        className={cn(
          'w-2 h-2 rounded-full',
          label === isSuccess && 'bg-green-600',
          label === isWarning && 'bg-yellow-600',
          label === isDanger && 'bg-red-600'
        )}
      />
      <p
        className={cn(
          'text-xs font-semibold',
          label === isSuccess && 'text-green-600',
          label === isWarning && 'text-yellow-600',
          label === isDanger && 'text-red-600'
        )}
      >
        {label}
      </p>
    </div>
  )
}