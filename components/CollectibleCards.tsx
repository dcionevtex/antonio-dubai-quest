'use client'

import { useState } from 'react'

interface Card {
  id: number
  icon: string
  title: string
  description: string
  color: 'gold' | 'diamond' | 'grass'
}

const CARDS: Card[] = [
  {
    id: 1,
    icon: '🍰',
    title: 'CHEESECAKE FACTORY',
    description: 'Vale uma ida à Cheesecake Factory!',
    color: 'gold',
  },
  {
    id: 2,
    icon: '🌊',
    title: 'PARQUE AQUÁTICO',
    description: 'Vale um dia inteiro no parque aquático!',
    color: 'diamond',
  },
  {
    id: 3,
    icon: '🦕',
    title: 'DINOSSAUROS',
    description: 'Vale uma visita ao parque dos dinossauros!',
    color: 'grass',
  },
]

const colorMap = {
  gold: {
    border: 'border-mc-gold',
    shadow: 'shadow-mc-glow-gold',
    title: 'text-mc-gold',
    badge: 'text-mc-gold border-mc-gold/60',
  },
  diamond: {
    border: 'border-mc-diamond',
    shadow: 'shadow-mc-glow-blue',
    title: 'text-mc-diamond',
    badge: 'text-mc-diamond border-mc-diamond/60',
  },
  grass: {
    border: 'border-mc-grass',
    shadow: 'shadow-mc-glow-green',
    title: 'text-mc-grass',
    badge: 'text-mc-grass border-mc-grass/60',
  },
}

function ChestFront({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="card-face flex flex-col items-center justify-center bg-mc-ui-dark border-2 border-mc-gold/50 cursor-pointer select-none hover:border-mc-gold hover:shadow-mc-glow-gold transition-all duration-300"
      onClick={onClick}
    >
      {/* Pixel chest */}
      <div className="animate-float mb-2">
        <div
          className="relative border-2 border-mc-gold/70"
          style={{
            width: '52px',
            height: '48px',
            background: 'linear-gradient(180deg, #7a4220 0%, #5a2e12 45%, #3d1e0a 100%)',
            boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.55), inset 2px 2px 0 rgba(255,255,255,0.12)',
          }}
        >
          {/* Lid separator line */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '42%', height: '2px', background: 'rgba(240,178,43,0.5)' }}
          />
          {/* Lock clasp */}
          <div
            className="absolute bg-mc-gold border border-mc-gold-dark"
            style={{ width: '11px', height: '9px', top: '39%', left: '50%', transform: 'translateX(-50%)' }}
          />
        </div>
        {/* Chest feet */}
        <div className="flex justify-between" style={{ marginTop: '1px' }}>
          <div className="bg-mc-gold/70" style={{ width: '9px', height: '4px' }} />
          <div className="bg-mc-gold/70" style={{ width: '9px', height: '4px' }} />
        </div>
      </div>

      <div
        className="font-pixel text-mc-gold/80 animate-pulse"
        style={{ fontSize: '6px', letterSpacing: '0.05em' }}
      >
        ABRIR
      </div>
    </div>
  )
}

function PrizeBack({ card }: { card: Card }) {
  const c = colorMap[card.color]
  return (
    <div
      className={`card-back flex flex-col items-center justify-center bg-mc-ui-dark border-2 ${c.border} ${c.shadow} p-2 text-center`}
    >
      <div style={{ fontSize: '38px', lineHeight: 1 }} className="mb-1">
        {card.icon}
      </div>
      <div
        className={`font-pixel ${c.title} mb-1`}
        style={{ fontSize: '6px', lineHeight: '1.6' }}
      >
        {card.title}
      </div>
      <div
        className="font-vt text-white/85 leading-snug"
        style={{ fontSize: '13px' }}
      >
        {card.description}
      </div>
      <div
        className={`font-pixel border px-1 mt-2 ${c.badge}`}
        style={{ fontSize: '5px' }}
      >
        DESBLOQUEADO
      </div>
    </div>
  )
}

export function CollectibleCards() {
  const [flipped, setFlipped] = useState([false, false, false])

  function open(i: number) {
    if (flipped[i]) return
    setFlipped(prev => prev.map((v, j) => (j === i ? true : v)))
  }

  const openedCount = flipped.filter(Boolean).length

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
          ? 'Clique nos baús para revelar seus brindes!'
          : openedCount < 3
          ? `${3 - openedCount} baú${3 - openedCount > 1 ? 's' : ''} ainda por abrir...`
          : 'Todos os brindes desbloqueados! 🎉'}
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4" style={{ height: '180px' }}>
        {CARDS.map((card, i) => (
          <div key={card.id} className="card-chest">
            <div className={`card-inner${flipped[i] ? ' card-flipped' : ''}`}>
              <ChestFront onClick={() => open(i)} />
              <PrizeBack card={card} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
