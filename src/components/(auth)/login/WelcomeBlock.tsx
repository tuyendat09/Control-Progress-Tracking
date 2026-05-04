interface WelcomeBlockProps {
  title?: string
  subtitle?: string
}

export default function WelcomeBlock({
  title = 'Welcome back',
  subtitle = 'Sign in to continue.',
}: WelcomeBlockProps) {
  return (
    <div>
      <h2 className="text-[28px] font-semibold leading-[1.14] tracking-[-0.374px] text-[#1d1d1f] lg:text-[32px] lg:tracking-[-0.6px]">
        {title}
      </h2>
      <p className="mt-1.5 text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#7a7a7a] lg:mt-2">
        {subtitle}
      </p>
    </div>
  )
}
