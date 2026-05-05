'use client'

import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const PHRASES = ['Texting 1', 'Texting 2', 'Texting 3']

// Timing (seconds)
const TYPE_SPEED = 0.065 // delay between each character typed
const DELETE_SPEED = 0.038 // delay between each character deleted
const HOLD_DURATION = 1.9 // pause after fully typed
const PAUSE_BETWEEN = 0.45 // pause before typing next phrase

export default function HeroTypewriter() {
  const [text, setText] = useState('')

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 })

    PHRASES.forEach((phrase, phraseIndex) => {
      // Type characters one by one
      for (let i = 1; i <= phrase.length; i++) {
        tl.call(
          () => setText(phrase.slice(0, i)),
          undefined,
          // Stagger: each character is TYPE_SPEED after the previous
          phraseIndex === 0 ? (i - 1) * TYPE_SPEED : `+=${TYPE_SPEED}`
        )
      }

      // Hold
      tl.call(() => {}, undefined, `+=${HOLD_DURATION}`)

      // Delete characters one by one
      for (let i = phrase.length - 1; i >= 0; i--) {
        tl.call(() => setText(phrase.slice(0, i)), undefined, `+=${DELETE_SPEED}`)
      }

      // Pause before next phrase
      tl.call(() => {}, undefined, `+=${PAUSE_BETWEEN}`)
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div>
      <p
        style={{
          fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
          fontSize: 'clamp(32px, 9vw, 40px)',
          fontWeight: 600,
          letterSpacing: '-0.4px',
          textAlign: 'center',
          lineHeight: 1.2,
          backgroundImage:
            'linear-gradient(90deg, #5AC8FA 0%, #64D2FF 18%, #A8B5E0 42%, #FFB37A 70%, #FF9500 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {text}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.82em',
            background: '#FF9500',
            verticalAlign: 'middle',
            borderRadius: '1px',
            marginLeft: '1px',
            animation: 'blink 1s steps(1) infinite',
          }}
        />
      </p>

      {/* Blink keyframe — inject once */}
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  )
}
