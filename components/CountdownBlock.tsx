'use client'

import { useEffect, useRef } from 'react'

type BlockColor = 'green' | 'blue' | 'gold' | 'red'

interface CountdownBlockProps {
  value: number
  label: string
  sublabel: string
  color: BlockColor
}

const colorConfig: Record<BlockColor, {
  border: string
  glow: string
  text: string
  bg: string
  icon: string
  iconBg: string
}> = {
  green: {
    border: 'border-mc-grass',
    glow: 'shadow-mc-glow-green',
    text: 'text-mc-grass',
    bg: 'bg-mc-grass/5',
    icon: '🌿',
    iconBg: 'bg-mc-grass/20',
  },
  blue: {
    border: 'border-mc-diamond',
    glow: 'shadow-mc-glow-blue',
    text: 'text-mc-diamond',
    bg: 'bg-mc-diamond/5',
    icon: '💎',
    iconBg: 'bg-mc-diamond/20',
  },
  gold: {
    border: 'border-mc-gold',
    glow: 'shadow-mc-glow-gold',
    text: 'text-mc-gold',
    bg: 'bg-mc-gold/5',
    icon: '⭐',
    iconBg: 'bg-mc-gold/20',
  },
  red: {
    border: 'border-mc-redstone',
    glow: 'shadow-mc-glow-red',
    text: 'text-mc-redstone',
    bg: 'bg-mc-redstone/5',
    icon: '⚡',
    iconBg: 'bg-mc-redstone/20',
  },
}

export function CountdownBlock({ value, label, sublabel, color }: CountdownBlockProps) {
  const c = colorConfig[color]
  const prevValueRef = useRef(value)
  const numRef = useRef<HTMLDivElement>(null)

  // Animate number when it changes
  useEffect(() => {
    if (prevValueRef.current !== value && numRef.current) {
      numRef.current.classList.remove('animate-number-pop')
      // Force reflow
      void numRef.current.offsetHeight
      numRef.current.classList.add('animate-number-pop')
    }
    prevValueRef.current = value
  }, [value])

  const displayValue = String(value).padStart(2, '0')

  return (
    <div
      className={`
        mc-slot relative flex flex-col items-center justify-center
        ${c.border} ${c.glow} ${c.bg}
        px-4 py-5 md:px-6 md:py-7
        min-w-[76px] md:min-w-[130px]
        select-none
      `}
      style={{ border: '2px solid' }}
    >
      {/* Icon badge */}
      <div className={`w-8 h-8 flex items-center justify-center mb-2 ${c.iconBg} text-lg`}>
        {c.icon}
      </div>

      {/* Number */}
      <div
        ref={numRef}
        className={`font-pixel ${c.text} tabular-nums leading-none`}
        style={{ fontSize: 'clamp(28px, 6vw, 52px)' }}
      >
        {displayValue}
      </div>

      {/* Label */}
      <div
        className="font-pixel text-white/80 mt-2 text-center tracking-wider uppercase"
        style={{ fontSize: '8px' }}
      >
        {label}
      </div>

      {/* Sub-label */}
      <div
        className="font-vt text-white/40 mt-1 text-center"
        style={{ fontSize: '13px' }}
      >
        {sublabel}
      </div>

      {/* Corner pixel decoration */}
      <div className={`absolute top-1 left-1 w-1 h-1 ${c.text.replace('text-', 'bg-')} opacity-60`} />
      <div className={`absolute top-1 right-1 w-1 h-1 ${c.text.replace('text-', 'bg-')} opacity-60`} />
      <div className={`absolute bottom-1 left-1 w-1 h-1 ${c.text.replace('text-', 'bg-')} opacity-60`} />
      <div className={`absolute bottom-1 right-1 w-1 h-1 ${c.text.replace('text-', 'bg-')} opacity-60`} />
    </div>
  )
}
