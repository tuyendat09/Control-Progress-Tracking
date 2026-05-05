import { ReactNode } from 'react'

interface LandingLayoutProps {
  children: ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <p>Header nè</p>
      <main>{children}</main>
      <p>Footer nè</p>
    </>
  )
}
