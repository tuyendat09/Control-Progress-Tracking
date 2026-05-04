'use client'

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface EmailInputProps {
  register: UseFormRegisterReturn
  error?: FieldError
  id?: string
  label?: string
  placeholder?: string
}

export default function EmailInput({
  register,
  error,
  id = 'email',
  label = 'Email',
  placeholder = 'Email address',
}: EmailInputProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-medium tracking-[-0.1px] text-[#1d1d1f]"
      >
        {label}
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-[52px] w-full rounded-[14px] border bg-[#f5f5f7] px-5 text-[16px] font-normal text-[#1d1d1f] placeholder:text-[#7a7a7a] transition-colors duration-200 outline-none',
          'hover:border-[#c8c8cd] focus:border-[#0066cc]',
          error ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0]'
        )}
        {...register}
      />
      {error ? (
        <p id={errorId} className="text-[12px] text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  )
}
