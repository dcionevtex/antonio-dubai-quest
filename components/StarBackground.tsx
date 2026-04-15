'use client'

// Deterministic star positions based on index — no randomness, no hydration mismatch
function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 97 + 13) % 1000) / 10,       // 0–99.9%
    y: ((i * 67 + 41) % 1000) / 10,        // 0–99.9%
    size: i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
    delay: ((i * 37) % 300) / 100,          // 0–3s
    duration: 1.5 + ((i * 23) % 200) / 100, // 1.5–3.5s
    opacity: i % 5 === 0 ? 0.9 : i % 3 === 0 ? 0.7 : 0.5,
  }))
}

const STARS = generateStars(120)

export function StarBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Base gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04040c] via-mc-night to-mc-night-mid" />

      {/* Stars */}
      {STARS.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-none animate-star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Very subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}
