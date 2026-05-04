'use client'

interface SignUpPromptProps {
  onSignUpClick?: () => void
  message?: string
  ctaLabel?: string
}

export default function SignUpPrompt({
  onSignUpClick,
  message = "Don't have an account?",
  ctaLabel = 'Sign up',
}: SignUpPromptProps) {
  return (
    <p className="mt-9 text-center text-[14px] font-normal tracking-[-0.224px] text-[#7a7a7a]">
      {message}{' '}
      <button
        type="button"
        onClick={onSignUpClick}
        className="font-semibold text-[#0066cc] hover:underline"
      >
        {ctaLabel}
      </button>
    </p>
  )
}
