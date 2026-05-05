'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ClayBlueBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0c10',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -5,
      }}
    >
      {/* Orb top - Apple Blue nhạt */}
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 340,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(0,120,245,0.3) 0%, rgba(0,90,200,0.15) 45%, transparent 70%)',
          top: -70,
          left: '32%',
          filter: 'blur(70px)',
        }}
      />

      {/* Orb left - warm amber/orange */}
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(180,100,40,0.55) 0%, rgba(140,70,20,0.3) 35%, transparent 70%)',
          top: '50%',
          left: -80,
          transform: 'translateY(-50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Orb center right - Apple Blue #0071e3 */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(0,113,227,0.6) 0%, rgba(0,80,180,0.35) 40%, transparent 70%)',
          top: '25%',
          right: -60,
          filter: 'blur(80px)',
        }}
      />

      {/* Orb bottom right - deep navy */}
      <div
        style={{
          position: 'absolute',
          width: 360,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(0,60,160,0.4) 0%, transparent 70%)',
          bottom: -60,
          right: 80,
          filter: 'blur(60px)',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,5,10,0.65) 100%)',
        }}
      />

      {/* Noise texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}
