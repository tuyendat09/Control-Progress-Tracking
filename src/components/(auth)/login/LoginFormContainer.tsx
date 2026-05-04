'use client'

import { useLoginForm } from '@/hooks/useLoginForm'

import LoginFormShell from './LoginFormShell'

export default function LoginFormContainer() {
  const { form, onSubmit, isLoading } = useLoginForm()

  return <LoginFormShell form={form} onSubmit={onSubmit} isLoading={isLoading} />
}
