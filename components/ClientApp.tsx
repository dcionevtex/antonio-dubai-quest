'use client'

import { useState, useEffect } from 'react'
import { TRIP_CONFIG } from '@/lib/config'
import { getDailyImage } from '@/lib/images'
import { StarBackground } from './StarBackground'
import { DailyImage } from './DailyImage'
import { CountdownBlock } from './CountdownBlock'
import { ProgressBar } from './ProgressBar'
import { Messages } from './Messages'
import { Milestones } from './Milestones'
import { CollectibleCards } from './CollectibleCards'
import { RunnerGame } from './RunnerGame'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeTimeLeft(): TimeLeft {
  const diff = TRIP_CONFIG.tripDate.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function computeProgress(): number {
  const start = TRIP_CONFIG.missionStartDate.getTime()
  const end = TRIP_CONFIG.tripDate.getTime()
  const now = Date.now()
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
}

export function ClientApp() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [arrived, setArrived] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dailyImage = getDailyImage()
  const progress = mounted ? computeProgress() : 0

  // Mount + initial achievement pop
  useEffect(() => {
    setMounted(true)
    setTimeLeft(computeTimeLeft())

    const timer = setTimeout(() => {
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 4500)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  // Countdown tick
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      const next = computeTimeLeft()
      setTimeLeft(next)
      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        setArrived(true)
        clearInterval(interval)
      }
    }, 1_000)
    return () => clearInterval(interval)
  }, [mounted])

  const { travelerName, origin, destination, tripDate } = TRIP_CONFIG

  const tripDateLabel = tripDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <StarBackground />

      {/* Achievement pop */}
      {showAchievement && (
        <div
          className="fixed top-4 right-4 z-50 bg-mc-ui-dark border-2 border-mc-gold shadow-mc-glow-gold p-3 max-w-xs animate-achievement-slide"
          aria-live="polite"
        >
          <div className="font-pixel text-mc-gold mb-1" style={{ fontSize: '7px' }}>
            🏆 ACHIEVEMENT UNLOCKED
          </div>
          <div className="font-vt text-white/90" style={{ fontSize: '18px' }}>
            Acessou: {travelerName}&apos;s Dubai Quest!
          </div>
          <div className="font-vt text-mc-text-dim mt-1" style={{ fontSize: '14px' }}>
            +100 XP de Saudade
          </div>
        </div>
      )}

      {/* Main layout */}
      <main className="relative z-10 min-h-screen px-4 py-10 md:py-14 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">

          {/* ── Header ────────────────────────────────────────────────── */}
          <header className="text-center animate-fade-in">
            {/* Nether portal glow frame */}
            <div className="inline-block relative mb-5">
              <div className="portal-shimmer border border-mc-nether/60 animate-portal-pulse px-6 py-4">
                <div
                  className="font-pixel text-white leading-relaxed animate-pulse-glow"
                  style={{ fontSize: 'clamp(10px, 3vw, 18px)' }}
                >
                  A GRANDE MISSÃO DE
                </div>
                <div
                  className="font-pixel text-mc-diamond mt-1 animate-pulse-glow"
                  style={{ fontSize: 'clamp(16px, 5vw, 30px)' }}
                >
                  {travelerName.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Flight path */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="font-pixel text-mc-text-dim uppercase"
                style={{ fontSize: '8px' }}
              >
                {origin}
              </span>
              <div className="flex items-center gap-1">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-mc-nether/60" />
                <span className="text-xl animate-plane-fly">✈️</span>
                <div className="h-px w-10 bg-gradient-to-r from-mc-nether/60 to-transparent" />
              </div>
              <span
                className="font-pixel text-mc-gold uppercase"
                style={{ fontSize: '8px' }}
              >
                {destination}
              </span>
            </div>

            {/* Trip date pill */}
            <div className="inline-flex items-center gap-2 bg-mc-ui-dark border border-white/10 px-4 py-2">
              <span
                className="font-pixel text-mc-text-dim"
                style={{ fontSize: '7px' }}
              >
                PORTAL ABRE EM:
              </span>
              <span
                className="font-pixel text-mc-grass"
                style={{ fontSize: '7px' }}
              >
                {tripDateLabel}
              </span>
            </div>
          </header>

          {/* ── Daily Image ───────────────────────────────────────────── */}
          <section className="animate-fade-in border border-mc-ui-light" style={{ animationDelay: '0.2s' }}>
            <DailyImage image={dailyImage} />
          </section>

          {/* ── Countdown ─────────────────────────────────────────────── */}
          <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div
              className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mb-5"
              style={{ fontSize: '8px' }}
            >
              ◆ Contagem regressiva da missão ◆
            </div>

            {arrived ? (
              <div className="text-center py-8">
                <div
                  className="font-pixel text-mc-gold animate-pulse-glow"
                  style={{ fontSize: 'clamp(14px, 4vw, 24px)' }}
                >
                  🎉 ANTONIO CHEGOU! 🎉
                </div>
                <div className="font-vt text-white/70 mt-3" style={{ fontSize: '22px' }}>
                  A missão foi um sucesso épico. Dubai aguardava!
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                <CountdownBlock
                  value={timeLeft.days}
                  label="Dias"
                  sublabel="days"
                  color="green"
                />
                <CountdownBlock
                  value={timeLeft.hours}
                  label="Horas"
                  sublabel="hours"
                  color="blue"
                />
                <CountdownBlock
                  value={timeLeft.minutes}
                  label="Min"
                  sublabel="minutes"
                  color="gold"
                />
                <CountdownBlock
                  value={timeLeft.seconds}
                  label="Seg"
                  sublabel="seconds"
                  color="red"
                />
              </div>
            )}
          </section>

          {/* ── Progress bar ──────────────────────────────────────────── */}
          <section
            className="bg-mc-ui-dark border border-mc-ui-light p-4 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <ProgressBar percent={progress} daysLeft={timeLeft.days} />
          </section>

          {/* ── Mission stats ─────────────────────────────────────────── */}
          <section
            className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            {[
              { label: 'Nível', value: 'LENDÁRIO', color: 'text-mc-gold' },
              { label: 'Classe', value: 'Aventureiro', color: 'text-mc-diamond' },
              { label: 'Destino', value: destination, color: 'text-mc-grass' },
              { label: 'Status', value: arrived ? 'CHEGOU!' : 'Em rota', color: arrived ? 'text-mc-gold' : 'text-mc-redstone' },
            ].map(stat => (
              <div
                key={stat.label}
                className="mc-slot border border-mc-ui-light p-3 text-center"
              >
                <div className="font-pixel text-mc-text-dim mb-1" style={{ fontSize: '6px' }}>
                  {stat.label}
                </div>
                <div className={`font-vt font-bold ${stat.color}`} style={{ fontSize: '18px' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </section>

          {/* ── Collectible Cards ─────────────────────────────────────── */}
          <CollectibleCards />

          {/* ── Runner Game ───────────────────────────────────────────── */}
          <RunnerGame />

          {/* ── Milestones ────────────────────────────────────────────── */}
          <Milestones />

          {/* ── Rotating messages ─────────────────────────────────────── */}
          <section className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Messages travelerName={travelerName} />
          </section>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <footer className="text-center pb-4 animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="font-pixel text-mc-text-dim" style={{ fontSize: '7px' }}>
              Feito com ❤️ &amp; Redstone • {origin} → {destination}
            </div>
            <div className="font-vt text-white/25 mt-1" style={{ fontSize: '13px' }}>
              Powered by love, Java Edition and parental anxiety
            </div>
          </footer>

        </div>
      </main>
    </>
  )
}
