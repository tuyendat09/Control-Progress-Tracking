'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import api from '@/lib/axios'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginFormValues = z.infer<typeof loginSchema>

interface UseLoginFormResult {
  form: UseFormReturn<LoginFormValues>
  onSubmit: SubmitHandler<LoginFormValues>
  isLoading: boolean
}

export function useLoginForm(): UseLoginFormResult {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    setIsLoading(true)
    try {
      await api.post('/auth/login', values)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading }
}
