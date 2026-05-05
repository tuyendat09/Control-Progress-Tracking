'use client'

import Input from '@/components/ui/Input'
import { useState } from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'

export default function SignUpForm() {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const isActive = isFocused && value.length > 0

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 bg-black/10 backdrop-blur-xs transition-opacity duration-200 ease-in-out ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="relative z-50 w-full">
        <Input
          placeholder="Enter your email"
          className="w-full"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className="absolute top-1/2 right-4 size-6 -translate-y-1/2 cursor-pointer">
          <IoArrowForwardCircleOutline className="size-full" />
        </button>
      </div>
    </>
  )
}
