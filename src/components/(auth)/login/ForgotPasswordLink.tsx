'use client'

interface ForgotPasswordLinkProps {
  onClick?: () => void
  label?: string
}

export default function ForgotPasswordLink({
  onClick,
  label = 'Forgot password?',
}: ForgotPasswordLinkProps) {
  return (
    <div className="mt-3.5 text-right">
      <button
        type="button"
        onClick={onClick}
        className="text-[14px] font-medium tracking-[-0.224px] text-[#0066cc] hover:underline"
      >
        {label}
      </button>
    </div>
  )
}
