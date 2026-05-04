import AppIconBadge from './AppIconBadge'

interface LoginHeaderProps {
  iconSize?: number
  variant?: 'mobile' | 'brand'
}

export default function LoginHeader({ iconSize, variant = 'mobile' }: LoginHeaderProps) {
  if (variant === 'brand') {
    return (
      <div>
        <div className="mb-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-[32px] shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          <AppIconBadge size={iconSize ?? 128} className="h-full w-full" />
        </div>
        <h1 className="text-[48px] leading-[1.05] font-semibold tracking-[-1px] text-white">
          Control
        </h1>
        <p className="mt-3.5 max-w-95 text-[20px] leading-[1.45] font-normal tracking-[-0.4px] text-white/60">
          Track progress. Own your goals.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[18px]">
        <AppIconBadge size={iconSize ?? 64} className="h-full w-full" />
      </div>
      <div className="text-center text-[34px] leading-[1.10] font-semibold tracking-[-0.374px] text-[#1d1d1f]">
        Control
      </div>
      <div className="mt-2 text-center text-[17px] leading-[1.47] font-normal tracking-[-0.374px] text-[#7a7a7a]">
        Track progress. Own your goals.
      </div>
    </div>
  )
}
