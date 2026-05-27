import { TRIP_CONFIG } from '@/lib/config'

export function Milestones() {
  const { milestones } = TRIP_CONFIG
  if (!milestones.length) return null

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <div
        className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mb-4"
        style={{ fontSize: '8px' }}
      >
        ◆ Conquistas Desbloqueadas ◆
      </div>

      <div className="flex flex-col gap-3">
        {milestones.map(m => (
          <div
            key={m.id}
            className="flex items-center gap-4 bg-mc-ui-dark border-2 border-mc-gold shadow-mc-glow-gold p-4"
          >
            {/* Trophy icon block */}
            <div
              className="flex-shrink-0 w-14 h-14 bg-mc-ui-mid border border-mc-gold/50 flex items-center justify-center"
              style={{ fontSize: '28px' }}
              aria-hidden="true"
            >
              {m.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-pixel text-mc-gold" style={{ fontSize: '8px' }}>
                  {m.title.toUpperCase()}
                </div>
                <div
                  className="font-pixel text-mc-grass border border-mc-grass/50 px-1"
                  style={{ fontSize: '6px' }}
                >
                  CONCLUÍDO
                </div>
              </div>
              <div className="font-vt text-white/80" style={{ fontSize: '17px' }}>
                {m.description}
              </div>
              <div className="font-vt text-mc-text-dim mt-0.5" style={{ fontSize: '13px' }}>
                {m.date}
              </div>
            </div>

            {/* Checkmark */}
            <div
              className="flex-shrink-0 font-pixel text-mc-grass"
              style={{ fontSize: '18px' }}
              aria-label="concluído"
            >
              ✓
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
