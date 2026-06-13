'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── Constants ────────────────────────────────────────────────────
const CW = 800
const CH = 220
const GY = 180         // ground y
const S = 4            // pixel scale
const CX = 80          // player fixed x
const CHAR_W = 8 * S   // 32px
const CHAR_H = 17 * S  // 68px
const JUMP_VEL = -13
const GRAVITY = 0.72
const BASE_SPD = 2     // slow start for kids

type Status = 'idle' | 'playing' | 'dead'

interface Obs { x: number; w: number; h: number }
interface Collect { x: number; y: number; type: 'star' | 'gift' }

interface GS {
  status: Status
  y: number
  vy: number
  ground: boolean
  obs: Obs[]
  collectibles: Collect[]
  score: number
  stars: number
  hi: number
  hiStars: number
  spd: number
  tick: number
  frame: number
  nextObs: number
  nextCollect: number
  goff: number
}

function fresh(hi = 0, hiStars = 0): GS {
  return {
    status: 'idle', y: GY - CHAR_H, vy: 0, ground: true,
    obs: [], collectibles: [],
    score: 0, stars: 0, hi, hiStars, spd: BASE_SPD,
    tick: 0, frame: 0, nextObs: 120, nextCollect: 60, goff: 0,
  }
}

// ── Static background ────────────────────────────────────────────
function renderBg(ctx: CanvasRenderingContext2D) {
  const grad = ctx.createLinearGradient(0, 0, 0, GY)
  grad.addColorStop(0, '#07070f')
  grad.addColorStop(1, '#130d25')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CW, GY)

  // Moon
  ctx.fillStyle = 'rgba(255,245,210,0.9)'
  ctx.beginPath(); ctx.arc(682, 27, 18, 0, 2 * Math.PI); ctx.fill()
  ctx.fillStyle = '#08080f'
  ctx.beginPath(); ctx.arc(694, 22, 15, 0, 2 * Math.PI); ctx.fill()

  // Stars
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  for (const [sx, sy] of [
    [38,11],[98,6],[178,19],[255,10],[348,5],[428,17],
    [528,9],[608,21],[718,12],[758,25],[68,29],[198,33],[478,23],
  ] as [number,number][]) ctx.fillRect(sx, sy, 2, 2)

  ctx.fillStyle = '#0b0b20'

  // Burj Khalifa
  const bk = 538
  ctx.fillRect(bk + 6, 4, 4, 110)
  ctx.fillRect(bk + 2, 60, 12, 40)
  ctx.fillRect(bk - 2, 80, 20, 28)
  ctx.fillRect(bk - 7, 92, 30, 18)
  ctx.fillRect(bk - 13, 102, 42, GY - 102)

  // Burj Al Arab
  ctx.beginPath()
  ctx.moveTo(282, GY); ctx.lineTo(286, 52); ctx.lineTo(316, 52); ctx.lineTo(320, GY)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(282, GY); ctx.lineTo(286, 52)
  ctx.quadraticCurveTo(258, 110, 282, GY)
  ctx.fill()

  // City blocks
  for (const [bx, bw, bh] of [
    [0,35,68],[40,26,52],[70,44,82],[120,28,60],[154,38,75],
    [196,22,46],[358,36,65],[400,28,55],[434,48,88],
    [598,38,70],[644,28,52],[678,46,76],[730,24,48],[760,36,62],
  ] as [number,number,number][]) ctx.fillRect(bx, GY - bh, bw, bh)
}

// ── Ground ───────────────────────────────────────────────────────
function drawGround(ctx: CanvasRenderingContext2D, goff: number) {
  ctx.fillStyle = '#0d0d1e'
  ctx.fillRect(0, GY, CW, CH - GY)
  ctx.fillStyle = '#F0B22B'
  ctx.fillRect(0, GY, CW, 2)
  ctx.fillStyle = 'rgba(240,178,43,0.18)'
  const sp = 28
  for (let x = -(goff % sp); x < CW; x += sp) {
    ctx.fillRect(x, GY + 6, 3, 3)
    ctx.fillRect(x + sp / 2, GY + 14, 2, 2)
  }
}

// ── Boy ──────────────────────────────────────────────────────────
function drawBoy(ctx: CanvasRenderingContext2D, cy: number, frame: number, dead: boolean) {
  const x = CX
  const f = Math.floor(frame / 5) % 4
  const air = cy < GY - CHAR_H - 1

  ctx.fillStyle = '#DDB688'; ctx.fillRect(x + 2*S, cy, 4*S, 4*S)
  ctx.fillStyle = '#2C1A0E'
  ctx.fillRect(x + 2*S, cy, 4*S, S)
  ctx.fillRect(x + 2*S, cy, S, 2*S)
  ctx.fillRect(x + 5*S, cy, S, 2*S)

  ctx.fillStyle = dead ? '#FF3333' : '#1a0a00'
  ctx.fillRect(x + 3*S, cy + 2*S, S, S)
  ctx.fillRect(x + 5*S, cy + 2*S, S, S)

  ctx.fillStyle = '#FFD700'; ctx.fillRect(x + S, cy + 4*S, 6*S, 5*S)
  ctx.fillStyle = '#009C3B'; ctx.fillRect(x + S, cy + 6*S, 6*S, S)

  const aswing = air ? 0 : (f < 2 ? -S : S)
  ctx.fillStyle = '#DDB688'
  ctx.fillRect(x, cy + 4*S + aswing, S, 3*S)
  ctx.fillRect(x + 7*S, cy + 4*S - aswing, S, 3*S)

  ctx.fillStyle = '#009C3B'; ctx.fillRect(x + S, cy + 9*S, 6*S, 3*S)

  ctx.fillStyle = '#DDB688'
  if (air) {
    ctx.fillRect(x + S, cy + 12*S, 2*S, 2*S)
    ctx.fillRect(x + 4*S, cy + 12*S, 2*S, 2*S)
    ctx.fillStyle = '#1A0A00'
    ctx.fillRect(x, cy + 14*S, 3*S, S)
    ctx.fillRect(x + 3*S, cy + 14*S, 3*S, S)
  } else {
    const l1 = f % 2 === 0 ? S : 0
    const l2 = f % 2 === 0 ? 0 : S
    ctx.fillRect(x + S, cy + 12*S, 2*S, 3*S + l1)
    ctx.fillRect(x + 4*S, cy + 12*S, 2*S, 3*S + l2)
    ctx.fillStyle = '#1A0A00'
    ctx.fillRect(x, cy + 15*S + l1, 3*S, S)
    ctx.fillRect(x + 3*S, cy + 15*S + l2, 3*S, S)
  }
}

// ── Small camel (visual height ≈ 22px, collision 16px) ───────────
function drawCamel(ctx: CanvasRenderingContext2D, ox: number) {
  const y = GY
  ctx.fillStyle = '#C19A6B'
  ctx.fillRect(ox + 2, y - 12, 20, 8)
  ctx.fillRect(ox + 5, y - 20, 10, 9)
  ctx.fillRect(ox + 7, y - 18, 6, 5)
  ctx.fillRect(ox + 18, y - 17, 4, 7)
  ctx.fillRect(ox + 19, y - 22, 6, 6)
  ctx.fillRect(ox + 23, y - 19, 4, 3)
  ctx.fillRect(ox + 4,  y - 4, 3, 6)
  ctx.fillRect(ox + 10, y - 4, 3, 6)
  ctx.fillRect(ox + 16, y - 4, 3, 6)
  ctx.fillRect(ox + 20, y - 4, 3, 6)
  ctx.fillStyle = '#1A0A00'; ctx.fillRect(ox + 22, y - 20, 1, 1)
  ctx.fillStyle = '#8B6010'; ctx.fillRect(ox, y - 10, 2, 5)
}

// ── Star collectible ─────────────────────────────────────────────
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(cx - 1, cy - 5, 2, 10) // vertical
  ctx.fillRect(cx - 5, cy - 1, 10, 2) // horizontal
  ctx.fillRect(cx - 3, cy - 3, 2, 2)  // diag TL
  ctx.fillRect(cx + 1, cy - 3, 2, 2)  // diag TR
  ctx.fillRect(cx - 3, cy + 1, 2, 2)  // diag BL
  ctx.fillRect(cx + 1, cy + 1, 2, 2)  // diag BR
  ctx.fillStyle = 'rgba(255,215,0,0.35)'
  ctx.fillRect(cx - 6, cy - 6, 12, 12) // soft outer glow (faint square)
}

// ── Gift collectible ─────────────────────────────────────────────
function drawGift(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.fillStyle = '#FF6B6B'
  ctx.fillRect(cx - 7, cy - 6, 14, 10)  // box body
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(cx - 1, cy - 6, 2, 10)   // vertical ribbon
  ctx.fillRect(cx - 7, cy - 2, 14, 2)   // horizontal ribbon
  // Bow
  ctx.fillRect(cx - 5, cy - 9, 4, 3)
  ctx.fillRect(cx + 1, cy - 9, 4, 3)
  ctx.fillRect(cx - 1, cy - 10, 2, 4)
  ctx.fillStyle = '#FF6B6B'
  ctx.fillRect(cx - 7, cy - 8, 14, 2)   // box lid top
}

// ── Obstacle collision ───────────────────────────────────────────
function hitsObs(cy: number, o: Obs): boolean {
  return (
    CX + 12          < o.x + o.w - 4 &&
    CX + CHAR_W - 12 > o.x + 4 &&
    cy + CHAR_H - 10 > GY - o.h
  )
}

// ── Collectible collection ───────────────────────────────────────
const COL_R = 10 // collection radius
function touchesCollect(cy: number, c: Collect): boolean {
  const px = CX + CHAR_W / 2
  const py = cy + CHAR_H / 2
  return Math.abs(px - c.x) < COL_R + 8 && Math.abs(py - c.y) < COL_R + 16
}

// ── Component ────────────────────────────────────────────────────
export function RunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgRef     = useRef<HTMLCanvasElement | null>(null)
  const gsRef     = useRef<GS>(fresh())
  const [ui, setUi] = useState<{ status: Status; score: number; stars: number; hi: number; hiStars: number }>({
    status: 'idle', score: 0, stars: 0, hi: 0, hiStars: 0,
  })

  const action = useCallback(() => {
    const gs = gsRef.current
    if (gs.status === 'idle' || gs.status === 'dead') {
      const hi = gs.hi
      const hiStars = gs.hiStars
      const next = fresh(hi, hiStars)
      next.status = 'playing'
      Object.assign(gsRef.current, next)
      setUi({ status: 'playing', score: 0, stars: 0, hi, hiStars })
    } else if (gs.status === 'playing' && gs.ground) {
      gs.vy = JUMP_VEL
      gs.ground = false
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const bgC = document.createElement('canvas')
    bgC.width = CW; bgC.height = CH
    renderBg(bgC.getContext('2d')!)
    bgRef.current = bgC

    let rafId: number

    function loop() {
      const gs = gsRef.current

      if (gs.status === 'playing') {
        gs.tick++
        gs.frame++
        gs.spd = BASE_SPD + gs.tick * 0.0003  // very gentle ramp
        gs.goff += gs.spd
        gs.score = Math.floor(gs.tick / 5)

        // Physics
        if (!gs.ground) {
          gs.vy += GRAVITY
          gs.y += gs.vy
          if (gs.y >= GY - CHAR_H) {
            gs.y = GY - CHAR_H; gs.vy = 0; gs.ground = true
          }
        }

        // Spawn obstacle
        gs.nextObs--
        if (gs.nextObs <= 0) {
          gs.obs.push({ x: CW + 10, w: 28, h: 16 })
          gs.nextObs = 220 + Math.random() * 160  // lots of breathing room
        }

        // Spawn collectible (star or gift, at ground or mid-air)
        gs.nextCollect--
        if (gs.nextCollect <= 0) {
          const isStar = Math.random() < 0.5
          // Stars can float mid-air (fun to jump for), gifts stay low
          const yPos = isStar
            ? (Math.random() < 0.5 ? GY - 60 : GY - 20)  // mid-air or ground
            : GY - 18                                       // gift always low
          gs.collectibles.push({ x: CW + 10, y: yPos, type: isStar ? 'star' : 'gift' })
          gs.nextCollect = 80 + Math.random() * 90
        }

        // Move obstacles
        for (const o of gs.obs) o.x -= gs.spd
        gs.obs = gs.obs.filter(o => o.x + o.w > -10)

        // Move collectibles + check collection
        let collected = false
        for (const c of gs.collectibles) {
          c.x -= gs.spd
          if (!collected && touchesCollect(gs.y, c)) {
            gs.stars++
            gs.score += 5
            if (gs.stars > gs.hiStars) gs.hiStars = gs.stars
            c.x = -999  // mark for removal
            collected = true
          }
        }
        gs.collectibles = gs.collectibles.filter(c => c.x > -50)

        // Obstacle collision
        if (gs.obs.some(o => hitsObs(gs.y, o))) {
          gs.status = 'dead'
          if (gs.score > gs.hi) gs.hi = gs.score
          setUi({ status: 'dead', score: gs.score, stars: gs.stars, hi: gs.hi, hiStars: gs.hiStars })
        }

        if (gs.tick % 15 === 0) {
          setUi({ status: 'playing', score: gs.score, stars: gs.stars, hi: gs.hi, hiStars: gs.hiStars })
        }
      }

      // Draw
      if (bgRef.current) ctx.drawImage(bgRef.current, 0, 0)
      drawGround(ctx, gs.goff)
      for (const o of gs.obs) drawCamel(ctx, o.x)
      for (const c of gs.collectibles) {
        if (c.type === 'star') drawStar(ctx, c.x, c.y)
        else drawGift(ctx, c.x, c.y)
      }
      drawBoy(ctx, gs.y, gs.frame, gs.status === 'dead')

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); action() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [action])

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.95s' }}>
      <div
        className="font-pixel text-center text-mc-text-dim uppercase tracking-widest mb-3"
        style={{ fontSize: '8px' }}
      >
        ◆ Antonio&apos;s Run ◆
      </div>

      <div className="relative border-2 border-mc-gold/40" style={{ lineHeight: 0 }}>
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="w-full block"
          style={{ imageRendering: 'pixelated', cursor: 'pointer', touchAction: 'none' }}
          onClick={action}
          onTouchStart={(e) => { e.preventDefault(); action() }}
        />

        {/* Idle */}
        {ui.status === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 gap-2">
            <div className="font-pixel text-mc-gold" style={{ fontSize: 'clamp(9px, 2.5vw, 13px)' }}>
              ANTONIO&apos;S RUN
            </div>
            <div className="font-vt text-white/60" style={{ fontSize: 'clamp(13px, 3.5vw, 17px)' }}>
              Desvie dos camelos · Colete estrelas e presentes
            </div>
            <div className="font-vt text-mc-gold/70" style={{ fontSize: 'clamp(12px, 3vw, 15px)' }}>
              TAP para começar
            </div>
          </div>
        )}

        {/* Dead */}
        {ui.status === 'dead' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 gap-1">
            <div className="font-pixel text-mc-redstone" style={{ fontSize: 'clamp(8px, 2.5vw, 12px)' }}>
              GAME OVER
            </div>
            <div className="font-vt text-white/75" style={{ fontSize: 'clamp(12px, 3.5vw, 17px)' }}>
              Score: {ui.score} &nbsp;·&nbsp; ⭐ {ui.stars}
            </div>
            <div className="font-vt text-mc-text-dim" style={{ fontSize: 'clamp(11px, 2.5vw, 14px)' }}>
              Recorde: {ui.hi} pts · ⭐ {ui.hiStars}
            </div>
            <div className="font-vt text-mc-gold mt-1" style={{ fontSize: 'clamp(12px, 3vw, 15px)' }}>
              TAP para reiniciar
            </div>
          </div>
        )}

        {/* HUD */}
        {ui.status === 'playing' && (
          <div className="absolute top-2 right-2 font-pixel text-mc-gold/80 flex flex-col items-end gap-1"
            style={{ fontSize: 'clamp(5px, 1.5vw, 7px)' }}>
            <span>{String(ui.score).padStart(5, '0')}</span>
            <span style={{ color: '#FFD700' }}>⭐ {ui.stars}</span>
          </div>
        )}
      </div>
    </section>
  )
}
