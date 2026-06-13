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
  // Night sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, GY)
  grad.addColorStop(0,    '#07070f')
  grad.addColorStop(0.65, '#0d1020')
  grad.addColorStop(1,    '#130d25')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CW, GY)

  // Subtle city-light amber glow at horizon
  const glow = ctx.createLinearGradient(0, GY - 38, 0, GY)
  glow.addColorStop(0, 'rgba(255,160,50,0)')
  glow.addColorStop(1, 'rgba(255,160,50,0.06)')
  ctx.fillStyle = glow
  ctx.fillRect(0, GY - 38, CW, 38)

  // Crescent moon (top right)
  ctx.fillStyle = 'rgba(255,245,200,0.9)'
  ctx.beginPath(); ctx.arc(720, 26, 19, 0, 2 * Math.PI); ctx.fill()
  ctx.fillStyle = '#07070f'
  ctx.beginPath(); ctx.arc(733, 20, 16, 0, 2 * Math.PI); ctx.fill()

  // Stars
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  for (const [sx, sy] of [
    [26,10],[72,6],[128,18],[198,8],[286,5],[368,16],[448,10],
    [528,20],[618,12],[708,22],[48,28],[148,31],[338,24],
    [498,34],[658,26],[778,10],[98,15],[418,4],[258,28],
  ] as [number,number][]) ctx.fillRect(sx, sy, 2, 2)

  ctx.fillStyle = '#0b0b22'

  // ── LEFT CLUSTER: Dubai Marina towers ────────────────────────────
  ctx.fillRect(0,   GY - 42, 20, 42)
  ctx.fillRect(3,   GY - 46, 14,  5)

  ctx.fillRect(24,  GY - 76, 14, 76)
  ctx.fillRect(27,  GY - 82,  8,  7)
  ctx.fillRect(30,  GY - 88,  4,  7)   // antenna

  ctx.fillRect(42,  GY - 90, 28, 90)
  ctx.beginPath()
  ctx.moveTo(42, GY - 90); ctx.lineTo(56, GY - 104); ctx.lineTo(70, GY - 90)
  ctx.closePath(); ctx.fill()
  ctx.fillRect(54,  GY - 110,  4,  7)  // spire

  ctx.fillRect(74,  GY - 52, 12, 52)

  ctx.fillRect(90,  GY - 78, 16, 78)
  ctx.fillRect(93,  GY - 84, 10,  7)
  ctx.fillRect(96,  GY - 90,  4,  7)

  ctx.fillRect(110, GY - 62, 22, 62)
  ctx.fillRect(113, GY - 67, 16,  6)

  ctx.fillRect(136, GY - 44, 16, 44)

  // ── BURJ AL ARAB: the iconic sail-shaped hotel ───────────────────
  const baa = 162
  ctx.fillRect(baa,     GY - 108,  4, 108)   // spine / mast
  ctx.fillRect(baa,     GY - 114,  4,   7)   // spire tip
  ctx.fillRect(baa + 4, GY -  84, 20,   4)   // helipad platform
  // Sail: billows rightward from spine
  ctx.beginPath()
  ctx.moveTo(baa + 3,      GY - 105)
  ctx.quadraticCurveTo(baa + 72, GY - 52, baa + 58, GY)
  ctx.lineTo(baa + 3, GY)
  ctx.closePath()
  ctx.fill()

  // ── MID-LEFT TOWERS: Downtown perimeter ──────────────────────────
  ctx.fillRect(236, GY - 68, 20, 68)
  ctx.fillRect(239, GY - 73, 14,  6)

  ctx.fillRect(260, GY - 85, 24, 85)
  ctx.beginPath()
  ctx.moveTo(260, GY - 85); ctx.lineTo(272, GY - 98); ctx.lineTo(284, GY - 85)
  ctx.closePath(); ctx.fill()
  ctx.fillRect(270, GY - 104,  4,  7)

  ctx.fillRect(288, GY - 58, 16, 58)

  ctx.fillRect(308, GY - 76, 22, 76)
  ctx.fillRect(311, GY - 82, 16,  7)
  ctx.fillRect(314, GY - 89, 10,  8)

  ctx.fillRect(334, GY - 96, 26, 96)
  ctx.beginPath()
  ctx.moveTo(334, GY - 96); ctx.lineTo(347, GY - 110); ctx.lineTo(360, GY - 96)
  ctx.closePath(); ctx.fill()
  ctx.fillRect(345, GY - 116,  4,  7)

  ctx.fillRect(364, GY - 64, 18, 64)
  ctx.fillRect(367, GY - 69, 12,  6)
  ctx.fillRect(386, GY - 50, 18, 50)

  // ── BURJ KHALIFA: multi-setback tapered tower ────────────────────
  const bkX = 440
  ctx.fillRect(bkX - 1,  GY - 155,  2, 30)   // ultra-thin spire
  ctx.fillRect(bkX - 3,  GY - 125,  6, 20)   // upper shaft
  ctx.fillRect(bkX - 6,  GY - 105, 12, 20)   // section 4
  ctx.fillRect(bkX - 10, GY -  85, 20, 20)   // section 3
  ctx.fillRect(bkX - 14, GY -  65, 28, 20)   // section 2
  ctx.fillRect(bkX - 19, GY -  45, 38, 20)   // section 1
  ctx.fillRect(bkX - 23, GY -  25, 46, 25)   // base plinth

  // Address Downtown Hotel (left of BK)
  ctx.fillRect(405, GY - 74, 22, 74)
  ctx.fillRect(408, GY - 80, 16,  7)
  ctx.fillRect(411, GY - 86, 10,  7)

  // Downtown flanking towers (right of BK)
  ctx.fillRect(490, GY - 60, 22, 60)
  ctx.fillRect(493, GY - 65, 16,  6)
  ctx.fillRect(516, GY - 46, 18, 46)

  ctx.fillRect(538, GY - 72, 24, 72)
  ctx.fillRect(541, GY - 78, 18,  7)
  ctx.fillRect(544, GY - 85, 12,  8)

  // ── EMIRATES TOWERS: two pointed triangular skyscrapers ──────────
  const et1 = 568
  ctx.fillRect(et1, GY - 98, 24, 98)
  ctx.beginPath()
  ctx.moveTo(et1, GY - 98); ctx.lineTo(et1 + 12, GY - 114); ctx.lineTo(et1 + 24, GY - 98)
  ctx.closePath(); ctx.fill()
  ctx.fillRect(et1 + 10, GY - 121,  4,  8)   // spire

  const et2 = 600
  ctx.fillRect(et2, GY - 82, 22, 82)
  ctx.beginPath()
  ctx.moveTo(et2, GY - 82); ctx.lineTo(et2 + 11, GY - 96); ctx.lineTo(et2 + 22, GY - 82)
  ctx.closePath(); ctx.fill()
  ctx.fillRect(et2 + 9, GY - 102,  4,  7)

  ctx.fillRect(et1, GY - 28, et2 + 22 - et1, 28)   // shared ground podium

  // ── MID-RIGHT BUILDINGS ───────────────────────────────────────────
  ctx.fillRect(628, GY - 56, 18, 56)
  ctx.fillRect(631, GY - 61, 12,  6)

  ctx.fillRect(650, GY - 72, 22, 72)
  ctx.fillRect(653, GY - 78, 16,  7)
  ctx.fillRect(656, GY - 84, 10,  7)

  ctx.fillRect(676, GY - 50, 16, 50)

  // ── DUBAI FRAME: twin pillars + top beam (open centre) ───────────
  ctx.fillRect(696, GY - 70,  9, 70)    // left pillar
  ctx.fillRect(716, GY - 70,  9, 70)    // right pillar
  ctx.fillRect(696, GY - 76, 29,  7)    // top connecting beam
  ctx.fillStyle = '#0d1020'             // sky-toned cutout for the open frame
  ctx.fillRect(705, GY - 69, 11, 62)
  ctx.fillStyle = '#0b0b22'

  // ── RIGHT EDGE ────────────────────────────────────────────────────
  ctx.fillRect(730, GY - 54, 18, 54)
  ctx.fillRect(733, GY - 59, 12,  6)

  ctx.fillRect(752, GY - 42, 20, 42)

  ctx.fillRect(776, GY - 62, 24, 62)
  ctx.fillRect(779, GY - 68, 18,  7)
  ctx.fillRect(782, GY - 74, 12,  7)
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
