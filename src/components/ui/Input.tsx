import { Input, type InputProps } from '@heroui/react'

import { cn } from '@/lib/utils'

export default function CustomInput({ className, ...props }: InputProps) {
  return (
    <Input
      className={cn('bg-glass-fill rounded-full border border-white/5', className)}
      {...props}
    />
  )
}
