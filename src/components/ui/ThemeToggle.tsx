'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'fixed top-5 right-5 z-50',
        'rounded-pill inline-flex h-11 w-11 items-center justify-center',
        'border-hairline bg-canvas text-ink border shadow-lg',
        'transition-colors duration-150',
        'hover:bg-canvas-parchment',
        'focus-visible:ring-action-blue-focus focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'dark:border-glass-border dark:bg-glass-fill-strong dark:text-glass-text',
        'dark:hover:border-glass-border-focus dark:hover:bg-glass-fill',
        'dark:backdrop-blur-md',
        className
      )}
    >
      {/* Render an empty icon slot until mounted to avoid hydration mismatch */}
      Dark
    </button>
  )
}
