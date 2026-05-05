'use client'

import { useEffect, useRef } from 'react'

const TOTAL = 2200
const RADIUS = 170
const W = 560
const H = 560
const CX = W / 2
const CY = H / 2
const REPEL_RADIUS = 95
const REPEL_FORCE = 5.5

interface Particle {
  ox: number
  oy: number
  oz: number
  vx: number
  vy: number
  size: number
  brightness: number
}

function randomSpherePoint(): Pick<Particle, 'ox' | 'oy' | 'oz'> {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return {
    ox: Math.sin(phi) * Math.cos(theta),
    oy: Math.sin(phi) * Math.sin(theta),
    oz: Math.cos(phi),
  }
}

function rotateY(x: number, y: number, z: number, a: number) {
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  return { rx: x * cos + z * sin, ry: y, rz: -x * sin + z * cos }
}

function project(x: number, y: number, z: number) {
  const fov = 420
  const scale = fov / (fov + z * RADIUS)
  return { sx: CX + x * RADIUS * scale, sy: CY + y * RADIUS * scale, scale }
}

export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = W
    canvas.height = H

    // Init particles
    const particles: Particle[] = Array.from({ length: TOTAL }, () => ({
      ...randomSpherePoint(),
      vx: 0,
      vy: 0,
      size: Math.random() * 1.4 + 0.4,
      brightness: Math.random() * 0.5 + 0.5,
    }))

    let angle = 0
    let mouseX = -9999
    let mouseY = -9999
    let isHovering = false
    let rafId: number

    function render() {
      ctx!.clearRect(0, 0, W, H)
      angle += 0.0045

      const sorted = particles.map((p) => {
        const r = rotateY(p.ox, p.oy, p.oz, angle)
        let px = CX + r.rx * RADIUS
        let py = CY + r.ry * RADIUS
        let vx = p.vx
        let vy = p.vy

        if (isHovering) {
          const dx = px - mouseX
          const dy = py - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS && dist > 0.1) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
            vx += (dx / dist) * force
            vy += (dy / dist) * force
          }
        }

        vx *= 0.85
        vy *= 0.85
        p.vx = vx
        p.vy = vy
        px += vx
        py += vy

        const proj = project(r.rx, r.ry, r.rz)
        const depth = (r.rz + 1) / 2
        return { px, py, depth, size: p.size, brightness: p.brightness, proj }
      })

      sorted.sort((a, b) => a.depth - b.depth)

      for (const p of sorted) {
        const alpha = (0.3 + p.depth * 0.7) * p.brightness
        const size = p.size * (0.5 + p.depth * 0.8) * p.proj.scale
        ctx!.fillStyle = `rgba(0,0,0,${alpha})`
        ctx!.beginPath()
        ctx!.arc(p.px, p.py, Math.max(0.3, size), 0, Math.PI * 2)
        ctx!.fill()
      }

      rafId = requestAnimationFrame(render)
    }

    function mapPointer(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect()
      mouseX = (clientX - rect.left) * (W / rect.width)
      mouseY = (clientY - rect.top) * (H / rect.height)
      isHovering = true
    }

    const onMouseMove = (e: MouseEvent) => mapPointer(e.clientX, e.clientY)
    const onMouseLeave = () => {
      isHovering = false
      mouseX = -9999
      mouseY = -9999
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) mapPointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => {
      isHovering = false
      mouseX = -9999
      mouseY = -9999
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: 'min(78vw, 78vh, 560px)',
          height: 'min(78vw, 78vh, 560px)',
          pointerEvents: 'auto',
          cursor: 'none',
          WebkitMaskImage:
            'radial-gradient(circle at center, #000 60%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          maskImage:
            'radial-gradient(circle at center, #000 60%, rgba(0,0,0,0.6) 80%, transparent 100%)',
        }}
      />
    </div>
  )
}
