'use client'

interface AppleSignInButtonProps {
  onClick?: () => void
  label?: string
}

export default function AppleSignInButton({
  onClick,
  label = 'Continue with Apple',
}: AppleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#272729] text-[16px] font-medium tracking-[-0.2px] text-white transition-colors duration-200 hover:bg-[#242426]"
    >
      <span className="-mt-0.5 text-[20px] leading-none" aria-hidden="true">

      </span>
      {label}
    </button>
  )
}
