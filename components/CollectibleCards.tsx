'use client'

import { useState } from 'react'

interface Card {
  id: number
  number: string
  icon: string
  title: string
  description: string
  colorHex: string
  glowRgb: string
  rare?: boolean
}

const CARDS: Card[] = [
  {
    id: 1,
    number: '01',
    icon: '🍰',
    title: 'CHEESECAKE FACTORY',
    description: 'Vale uma ida à Cheesecake Factory!',
    colorHex: '#F0B22B',
    glowRgb: '240,178,43',
  },
  {
    id: 2,
    number: '02',
    icon: '🌊',
    title: 'PARQUE AQUÁTICO',
    description: 'Vale um dia inteiro no parque aquático!',
    colorHex: '#5FB3F9',
    glowRgb: '95,179,249',
  },
  {
    id: 3,
    number: '03',
    icon: '🦕',
    title: 'DINOSSAUROS',
    description: 'Vale uma visita ao parque dos dinossauros!',
    colorHex: '#5CB85C',
    glowRgb: '92,184,92',
  },
  {
    id: 4,
    number: '04',
    icon: '🎮',
    title: 'GAMES INDOOR',
    description: 'Vale um dia de games indoor!',
    colorHex: '#9d4fe0',
    glowRgb: '157,79,224',
  },
  {
    id: 5,
    number: '05',
    icon: '🏛️',
    title: 'MUSEU',
    description: 'Vale uma visita ao museu!',
    colorHex: '#E74C3C',
    glowRgb: '231,76,60',
  },
  {
    id: 6,
    number: '06',
    icon: '🍦',
    title: 'COOKIES COM SORVETE',
    description: 'Vale cookies com sorvete!',
    colorHex: '#FFD700',
    glowRgb: '255,215,0',
    rare: true,
  },
]

// Standard gold foil border
const CARD_STYLE = {
  background:
    'linear-gradient(#1a1a2e, #1e1e34) padding-box, ' +
    'linear-gradient(135deg, #6b4a08 0%, #c9911e 20%, #F0B22B 35%, #FFF0A0 50%, #F0B22B 65%, #c9911e 80%, #6b4a08 100%) border-box',
  border: '2.5px solid transparent',
  borderRadius: '8px',
  overflow: 'hidden' as const,
}

// Rare holographic silver/rainbow border
const RARE_CARD_STYLE = {
  background:
    'linear-gradient(#10101e, #18182e) padding-box, ' +
    'linear-gradient(135deg, #aaaaaa 0%, #ffffff 15%, #ffe0f0 25%, #c0f0ff 40%, #ffffa0 55%, #ffc0e0 70%, #ffffff 85%, #aaaaaa 100%) border-box',
  border: '3px solid transparent',
  borderRadius: '8px',
  overflow: 'hidden' as const,
}

function CardFront({ onClick, rare }: { onClick: () => void; rare?: boolean }) {
  return (
    <div
      className="card-face flex flex-col cursor-pointer select-none"
      style={rare ? RARE_CARD_STYLE : CARD_STYLE}
      onClick={onClick}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-2 py-1.5 border-b"
        style={{ borderColor: rare ? 'rgba(255,255,255,0.15)' : 'rgba(240,178,43,0.25)' }}
      >
        <span
          className="font-pixel"
          style={{ fontSize: '5px', color: rare ? 'rgba(255,255,255,0.5)' : 'rgba(240,178,43,0.5)' }}
        >
          {rare ? '★' : '✦'}
        </span>
        <span
          className="font-pixel tracking-widest"
          style={{ fontSize: '5px', color: rare ? 'rgba(255,255,255,0.5)' : 'rgba(240,178,43,0.5)' }}
        >
          SÉRIE DUBAI
        </span>
        <span
          className="font-pixel"
          style={{ fontSize: '5px', color: rare ? 'rgba(255,255,255,0.5)' : 'rgba(240,178,43,0.5)' }}
        >
          {rare ? '★' : '✦'}
        </span>
      </div>

      {/* Art area */}
      <div
        className="flex-1 flex items-center justify-center relative"
        style={{
          backgroundImage: rare
            ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%),' +
              'repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)'
            : 'repeating-linear-gradient(45deg, rgba(240,178,43,0.04) 0, rgba(240,178,43,0.04) 1px, transparent 0, transparent 50%),' +
              'repeating-linear-gradient(-45deg, rgba(240,178,43,0.04) 0, rgba(240,178,43,0.04) 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px',
        }}
      >
        <div className="card-sheen absolute inset-0 pointer-events-none" />
        <div className="flex flex-col items-center gap-1 relative z-10">
          <div
            style={{
              fontSize: '34px',
              lineHeight: 1,
              filter: rare
                ? 'drop-shadow(0 0 12px rgba(255,200,0,0.7)) drop-shadow(0 0 20px rgba(200,0,255,0.4))'
                : 'drop-shadow(0 0 10px rgba(240,178,43,0.55))',
            }}
          >
            📦
          </div>
          <div
            className="font-pixel animate-pulse"
            style={{
              fontSize: '6px',
              letterSpacing: '0.2em',
              color: rare ? 'rgba(255,255,255,0.4)' : 'rgba(240,178,43,0.4)',
            }}
          >
            ???
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-2 py-1.5 border-t text-center"
        style={{ borderColor: rare ? 'rgba(255,255,255,0.15)' : 'rgba(240,178,43,0.25)' }}
      >
        <div
          className="font-pixel animate-pulse tracking-widest"
          style={{
            fontSize: '5px',
            color: rare ? 'rgba(255,255,255,0.45)' : 'rgba(240,178,43,0.5)',
          }}
        >
          CLIQUE PARA REVELAR
        </div>
      </div>
    </div>
  )
}

function CardBack({ card, onClick }: { card: Card; onClick: () => void }) {
  const isRare = !!card.rare

  const borderColor = isRare ? 'rgba(255,255,255,0.2)' : `${card.colorHex}40`
  const glowShadow = isRare
    ? undefined // handled by CSS animation class
    : `0 0 18px rgba(${card.glowRgb},0.45), 0 0 40px rgba(${card.glowRgb},0.18)`
  const radialBg = isRare
    ? 'radial-gradient(ellipse at center, rgba(255,215,0,0.15) 0%, rgba(200,0,255,0.08) 50%, transparent 70%)'
    : `radial-gradient(ellipse at center, rgba(${card.glowRgb},0.12) 0%, transparent 70%)`

  return (
    <div
      className={`card-back flex flex-col cursor-pointer select-none${isRare ? ' card-rare-back' : ''}`}
      style={{ ...(isRare ? RARE_CARD_STYLE : CARD_STYLE), boxShadow: glowShadow }}
      onClick={onClick}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-2 py-1.5 border-b"
        style={{
          borderColor,
          background: isRare
            ? 'rgba(255,255,255,0.04)'
            : `rgba(${card.glowRgb},0.08)`,
        }}
      >
        {isRare ? (
          <>
            <span className="font-pixel rare-text" style={{ fontSize: '5px' }}>★</span>
            <span className="font-pixel rare-text tracking-widest" style={{ fontSize: '5px' }}>
              FIGURINHA RARA
            </span>
            <span className="font-pixel rare-text" style={{ fontSize: '5px' }}>★</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '5px', color: card.colorHex }} className="font-pixel">◆</span>
            <span style={{ fontSize: '5px', color: card.colorHex }} className="font-pixel tracking-widest">
              DESBLOQUEADO
            </span>
            <span style={{ fontSize: '5px', color: card.colorHex }} className="font-pixel">◆</span>
          </>
        )}
      </div>

      {/* Icon area */}
      <div className="flex items-center justify-center py-3 relative" style={{ background: radialBg }}>
        {isRare && (
          <div className="absolute inset-0 card-holo-overlay pointer-events-none" />
        )}
        {isRare && (
          <span
            className="absolute top-1 left-2 font-pixel rare-text"
            style={{ fontSize: '7px' }}
          >
            ✦
          </span>
        )}
        {isRare && (
          <span
            className="absolute top-1 right-2 font-pixel rare-text"
            style={{ fontSize: '7px' }}
          >
            ✦
          </span>
        )}
        <div
          style={{
            fontSize: '40px',
            lineHeight: 1,
            filter: isRare ? 'drop-shadow(0 0 8px rgba(255,215,0,0.8)) drop-shadow(0 0 16px rgba(200,0,255,0.5))' : undefined,
          }}
        >
          {card.icon}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 pb-1 text-center gap-1">
        <div
          className={`font-pixel${isRare ? ' rare-text' : ''}`}
          style={{ fontSize: '6px', lineHeight: '1.6', color: isRare ? undefined : card.colorHex }}
        >
          {card.title}
        </div>
        <div className="font-vt text-white/80 leading-snug" style={{ fontSize: '12px' }}>
          {card.description}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-2 py-1.5 border-t flex justify-end"
        style={{ borderColor }}
      >
        <span
          className={`font-pixel${isRare ? ' rare-text' : ' text-mc-text-dim'}`}
          style={{ fontSize: '5px' }}
        >
          #{card.number}/06
        </span>
      </div>
    </div>
  )
}

export function CollectibleCards() {
  const [flipped, setFlipped] = useState(CARDS.map(() => false))

  function toggle(i: number) {
    setFlipped(prev => prev.map((v, j) => (j === i ? !v : v)))
  }

  const openedCount = flipped.filter(Boolean).length
  const total = CARDS.length

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.85s' }}>
      <div
        className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mb-1"
        style={{ fontSize: '8px' }}
      >
        ◆ Colecionáveis ◆
      </div>
      <div
        className="font-vt text-center text-white/40 mb-4"
        style={{ fontSize: '15px' }}
      >
        {openedCount === 0
          ? 'Clique nos cards para revelar seus brindes!'
          : openedCount < total
          ? `${openedCount}/${total} cards revelados...`
          : 'Coleção completa!'}
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4" style={{ gridAutoRows: '210px' }}>
        {CARDS.map((card, i) => (
          <div key={card.id} className="card-chest">
            <div className={`card-inner${flipped[i] ? ' card-flipped' : ''}`}>
              <CardFront onClick={() => toggle(i)} rare={card.rare} />
              <CardBack card={card} onClick={() => toggle(i)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
