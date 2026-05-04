interface OrDividerProps {
  label?: string
}

export default function OrDivider({ label = 'or' }: OrDividerProps) {
  return (
    <div className="mt-7 flex items-center gap-3" role="separator" aria-label={label}>
      <div className="h-px flex-1 bg-[#e0e0e0]" aria-hidden="true" />
      <span className="text-[13px] font-normal tracking-[-0.224px] text-[#7a7a7a]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#e0e0e0]" aria-hidden="true" />
    </div>
  )
}
