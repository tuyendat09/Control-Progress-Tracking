import LoginHeader from './LoginHeader'

interface BrandFeature {
  title: string
  description: string
}

const FEATURES: ReadonlyArray<BrandFeature> = [
  {
    title: 'Daily focus, made simple',
    description: 'Pick three things that matter. Ignore everything else.',
  },
  {
    title: 'Progress you can see',
    description: 'Streaks, charts, and weekly reviews — without the noise.',
  },
  {
    title: 'Yours, end-to-end',
    description: 'Encrypted by default. Your goals stay on your devices.',
  },
]

export default function BrandPanel() {
  return (
    <aside className="hidden h-full flex-col justify-between overflow-hidden bg-[#1d1d1f] px-18 py-20 text-white lg:flex">
      <div className="relative z-10">
        <LoginHeader variant="brand" />
      </div>

      <ul className="relative z-10 flex flex-col gap-5">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="border-l-2 border-[rgba(0,102,204,0.4)] pl-4 tracking-[-0.2px] text-white/85"
          >
            <strong className="mb-0.5 block text-[15px] font-semibold text-white">
              {feature.title}
            </strong>
            <span className="block text-[13px] leading-[1.5] text-white/55">
              {feature.description}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
