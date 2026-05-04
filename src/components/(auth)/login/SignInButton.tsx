'use client'

import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SignInButtonProps {
  isLoading: boolean
  disabled?: boolean
  label?: string
}

export default function SignInButton({
  isLoading,
  disabled,
  label = 'Sign In',
}: SignInButtonProps) {
  const isDisabled = isLoading || disabled

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={cn(
        'mt-6 flex h-[52px] w-full items-center justify-center rounded-full bg-[#0066cc] text-[16px] font-medium tracking-[-0.2px] text-white transition-colors duration-200',
        'hover:bg-[#0058b3]',
        'disabled:cursor-not-allowed disabled:opacity-70'
      )}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : (
        label
      )}
    </button>
  )
}
