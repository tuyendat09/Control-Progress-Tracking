'use client'

import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

import type { LoginFormValues } from '@/components/(auth)/login/hook/useLoginForm'

import AppleSignInButton from './AppleSignInButton'
import EmailInput from './EmailInput'
import ForgotPasswordLink from './ForgotPasswordLink'
import OrDivider from './OrDivider'
import PasswordInput from './PasswordInput'
import SignInButton from './SignInButton'
import SignUpPrompt from './SignUpPrompt'
import WelcomeBlock from './WelcomeBlock'

interface LoginFormShellProps {
  form: UseFormReturn<LoginFormValues>
  onSubmit: SubmitHandler<LoginFormValues>
  isLoading: boolean
  onForgotPassword?: () => void
  onAppleSignIn?: () => void
  onSignUpClick?: () => void
  showWelcome?: boolean
}

export default function LoginFormShell({
  form,
  onSubmit,
  isLoading,
  onForgotPassword,
  onAppleSignIn,
  onSignUpClick,
  showWelcome = true,
}: LoginFormShellProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      {showWelcome ? <WelcomeBlock /> : null}

      <div className="mt-8 flex flex-col gap-3.5 lg:mt-9">
        <EmailInput register={register('email')} error={errors.email} />
        <PasswordInput register={register('password')} error={errors.password} />
      </div>

      <ForgotPasswordLink onClick={onForgotPassword} />

      <SignInButton isLoading={isLoading} />

      <OrDivider />

      <AppleSignInButton onClick={onAppleSignIn} />

      <SignUpPrompt onSignUpClick={onSignUpClick} />
    </form>
  )
}
