'use client'

import Image from 'next/image'
import { MinecraftImage } from '@/lib/images'

interface DailyImageProps {
  image: MinecraftImage
}

export function DailyImage({ image }: DailyImageProps) {
  return (
    <div className="w-full rounded-none overflow-hidden relative group" style={{ height: '320px' }}>
      {/* The image */}
      <Image
        src={image.url}
        alt={image.biome}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
        unoptimized // picsum doesn't need next/image optimization
      />

      {/* Dark gradient overlay for text readability */}
      <div className="hud-overlay absolute inset-0" />

      {/* Top-left HUD: biome name */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div
          className="px-2 py-1 bg-black/80 border border-mc-grass/70 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}
        >
          <div className="w-2 h-2 bg-mc-grass animate-pulse" />
          <span className="text-mc-grass uppercase tracking-widest">{image.biome}</span>
        </div>
      </div>

      {/* Top-right HUD: coordinates (decorative) */}
      <div className="absolute top-3 right-3">
        <div
          className="px-2 py-1 bg-black/80 border border-white/20 text-white/60"
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
        >
          X: 3122 Y: 64 Z: 7891
        </div>
      </div>

      {/* Bottom overlay: caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white font-bold leading-snug mb-1"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '22px' }}
        >
          {image.caption}
        </p>
        <p
          className="text-mc-text-dim"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '16px' }}
        >
          {image.subCaption}
        </p>
      </div>

      {/* Bottom-right: "screenshot" tag */}
      <div className="absolute bottom-3 right-3">
        <div
          className="px-2 py-1 bg-black/60 text-white/40 border border-white/10"
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '6px' }}
        >
          F2 · SCREENSHOT DO DIA
        </div>
      </div>
    </div>
  )
}
