'use client'

import { useEffect, useRef } from 'react'

interface ProgressBarProps {
  percent: number
  daysLeft: number
}

export function ProgressBar({ percent, daysLeft }: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null)
  const clamped = Math.min(100, Math.max(0, percent))

  useEffect(() => {
    if (fillRef.current) {
      // Animate the bar fill on mount
      requestAnimationFrame(() => {
        if (fillRef.current) {
          fillRef.current.style.width = `${clamped}%`
        }
      })
    }
  }, [clamped])

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <div
          className="font-pixel text-mc-grass uppercase tracking-widest"
          style={{ fontSize: '8px' }}
        >
          ▶ XP da missão
        </div>
        <div
          className="font-pixel text-mc-text-gold"
          style={{ fontSize: '8px' }}
        >
          {clamped.toFixed(1)}%
        </div>
      </div>

      {/* Bar */}
      <div className="xp-bar-bg w-full h-5 relative overflow-hidden">
        <div
          ref={fillRef}
          className="xp-bar-fill h-full"
          style={{ width: '0%', transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {/* Tick marks */}
        {[25, 50, 75].map(tick => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-black/30"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>

      {/* Sub-label */}
      <div
        className="font-vt text-mc-text-dim mt-2 flex justify-between"
        style={{ fontSize: '16px' }}
      >
        <span>Missão iniciada ✓</span>
        <span>
          {daysLeft > 0
            ? `${daysLeft} dias para o portal abrir`
            : 'Portal ativado! 🎉'}
        </span>
        <span>Dubai 🏁</span>
      </div>
    </div>
  )
}
