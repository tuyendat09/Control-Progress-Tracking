'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface PasswordInputProps {
  register: UseFormRegisterReturn
  error?: FieldError
  id?: string
  label?: string
  placeholder?: string
}

export default function PasswordInput({
  register,
  error,
  id = 'password',
  label = 'Password',
  placeholder = 'Enter your password',
}: PasswordInputProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const errorId = `${id}-error`

  const toggle = () => setVisible((v) => !v)

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-medium tracking-[-0.1px] text-[#1d1d1f]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-[52px] w-full rounded-[14px] border bg-[#f5f5f7] pr-12 pl-5 text-[16px] font-normal text-[#1d1d1f] placeholder:text-[#7a7a7a] transition-colors duration-200 outline-none',
            'hover:border-[#c8c8cd] focus:border-[#0066cc]',
            error ? 'border-red-500 focus:border-red-500' : 'border-[#e0e0e0]'
          )}
          {...register}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#7a7a7a] hover:text-[#1d1d1f]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-[12px] text-red-600">
          {error.message}
        </p>
      ) : null}
    </div>
  )
}
