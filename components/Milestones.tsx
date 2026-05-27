import { TRIP_CONFIG } from '@/lib/config'

type Milestone = typeof TRIP_CONFIG.milestones[number]

function CompletedCard({ m }: { m: Milestone }) {
  const isSpecial = m.special

  const borderClass = isSpecial
    ? 'border-2 border-mc-nether shadow-mc-glow-nether'
    : 'border-2 border-mc-gold shadow-mc-glow-gold'

  const iconBorderClass = isSpecial
    ? 'border border-mc-nether/60'
    : 'border border-mc-gold/50'

  const titleClass = isSpecial ? 'text-mc-nether-light' : 'text-mc-gold'

  const badgeClass = isSpecial
    ? 'text-mc-nether-light border-mc-nether/60'
    : 'text-mc-grass border-mc-grass/50'

  const badgeLabel = isSpecial ? 'ÉPICO' : 'CONCLUÍDO'

  const checkClass = isSpecial ? 'text-mc-nether-light' : 'text-mc-grass'

  return (
    <div className={`flex items-center gap-4 bg-mc-ui-dark ${borderClass} p-4`}>
      <div
        className={`flex-shrink-0 w-14 h-14 bg-mc-ui-mid ${iconBorderClass} flex items-center justify-center`}
        style={{ fontSize: '28px' }}
        aria-hidden="true"
      >
        {m.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <div className={`font-pixel ${titleClass}`} style={{ fontSize: '8px' }}>
            {m.title.toUpperCase()}
          </div>
          <div
            className={`font-pixel border px-1 ${badgeClass}`}
            style={{ fontSize: '6px' }}
          >
            {badgeLabel}
          </div>
        </div>
        <div className="font-vt text-white/80" style={{ fontSize: '17px' }}>
          {m.description}
        </div>
        {m.date && (
          <div className="font-vt text-mc-text-dim mt-0.5" style={{ fontSize: '13px' }}>
            {m.date}
          </div>
        )}
      </div>

      <div
        className={`flex-shrink-0 font-pixel ${checkClass}`}
        style={{ fontSize: '18px' }}
        aria-label="concluído"
      >
        ✓
      </div>
    </div>
  )
}

function LockedCard({ m }: { m: Milestone }) {
  return (
    <div className="flex items-center gap-4 bg-mc-ui-mid border border-mc-ui-light p-4 opacity-50">
      <div
        className="flex-shrink-0 w-14 h-14 bg-mc-ui-dark border border-mc-ui-light flex items-center justify-center grayscale"
        style={{ fontSize: '28px' }}
        aria-hidden="true"
      >
        {m.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-pixel text-mc-text-dim" style={{ fontSize: '8px' }}>
            {m.title.toUpperCase()}
          </div>
          <div
            className="font-pixel text-mc-redstone border border-mc-redstone/40 px-1"
            style={{ fontSize: '6px' }}
          >
            BLOQUEADO
          </div>
        </div>
        <div className="font-vt text-white/50" style={{ fontSize: '17px' }}>
          {m.description}
        </div>
      </div>

      <div
        className="flex-shrink-0 font-pixel text-mc-text-dim"
        style={{ fontSize: '18px' }}
        aria-label="bloqueado"
      >
        🔒
      </div>
    </div>
  )
}

export function Milestones() {
  const { milestones } = TRIP_CONFIG
  if (!milestones.length) return null

  const done = milestones.filter(m => m.completed)
  const locked = milestones.filter(m => !m.completed)

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <div
        className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mb-4"
        style={{ fontSize: '8px' }}
      >
        ◆ Log de Missão ◆
      </div>

      <div className="flex flex-col gap-3">
        {done.map(m => (
          <CompletedCard key={m.id} m={m} />
        ))}

        {locked.length > 0 && (
          <>
            <div
              className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mt-2 mb-1"
              style={{ fontSize: '7px' }}
            >
              — próximas conquistas —
            </div>
            {locked.map(m => (
              <LockedCard key={m.id} m={m} />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
