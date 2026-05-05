import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'
import { InstallBanner } from '@/components/pwa/InstallBanner'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import GradientBackground from '@/components/ui/GradientBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Control Client',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <GradientBackground />
            <InstallBanner />
            <ServiceWorkerRegister />
            {children}
            <ThemeToggle />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
