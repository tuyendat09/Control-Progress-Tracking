'use client'

import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export function InstallBanner() {
  const { showBanner, isIos, triggerPrompt, dismiss } = useInstallPrompt()

  if (!showBanner) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'env(safe-area-inset-bottom, 16px)',
        left: 16,
        right: 16,
        background: '#1d1d1f',
        color: 'white',
        borderRadius: 16,
        padding: '14px 16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 15 }}>Cài Control</p>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.6 }}>
            Dùng như app thật, không cần App Store
          </p>
        </div>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            opacity: 0.5,
            cursor: 'pointer',
            fontSize: 20,
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {isIos ? (
        <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
          Bấm <strong>Share</strong> → <strong>Add to Home Screen</strong>
        </p>
      ) : (
        <button
          onClick={triggerPrompt}
          style={{
            background: 'white',
            color: '#1d1d1f',
            border: 'none',
            borderRadius: 10,
            padding: '10px',
            fontWeight: 500,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Thêm vào màn hình chính
        </button>
      )}
    </div>
  )
}
