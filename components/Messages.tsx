'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  "Antonio está construindo o inventário de viagem...",
  "Saldo de diamantes: 1 passagem para Dubai (ultra raro!)",
  "Bioma atual: São Paulo (selva de concreto). Destino: Dubai Desert.",
  "Status do Elytra: carregado e pronto para voar. ✈️",
  "O pai em Dubai já enchantou a cama com COMFORT X.",
  "Nível de ansiedade do pai: MÁXIMO (igual lavoura no Nether).",
  "A viagem foi registrada nos livros do bibliotecário da vila.",
  "Crafting recipe: 1× Antonio + 1× avião + Dubai = AVENTURA ÉPICA.",
  "O portal do Nether? Não. O portal para Dubai.",
  "Preparando coordenadas: X: Dubai, Y: infinito, Z: felicidade.",
  "Inventário do Antonio: cheio de energia, mala vazia (por enquanto).",
  "Aviso do servidor: Dubai não tem creepers. Só camelos e Lamborghinis.",
  "XP de felicidade do pai: aumentando a cada segundo que passa.",
  "Missão paralela: sobreviver às saudades até o dia da chegada.",
  "Aldeia de Dubai confirmou: haverá piscina, AC e pizza.",
  "Level up! Antonio subiu mais 1 nível de viajante internacional.",
  "Alerta de mob: saudade detectada. Usando poção de paciência.",
  "O Ender Dragon está menos ansioso que o pai esperando esse dia.",
  "Modo criativo ativado: criando memórias épicas em antecipação.",
  "Sistema de radar: Antonio localizado em São Paulo. ETA: em breve.",
]

interface MessagesProps {
  travelerName: string
}

export function Messages({ travelerName }: MessagesProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const message = MESSAGES[index].replace('Antonio', travelerName)

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className="font-pixel text-mc-text-dim uppercase tracking-widest mb-3 flex items-center gap-2"
        style={{ fontSize: '7px' }}
      >
        <span className="text-mc-grass animate-pulse">◆</span>
        Log da Missão
        <span className="text-mc-grass animate-pulse">◆</span>
      </div>

      {/* Message box */}
      <div className="mc-slot border border-mc-ui-light p-4 min-h-[70px] flex items-center">
        <div
          className="font-vt text-white/90 leading-relaxed transition-opacity duration-300"
          style={{
            fontSize: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <span className="text-mc-grass mr-2">[SYS]</span>
          {message}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-2">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 transition-all duration-300 ${
              i === index ? 'bg-mc-grass scale-150' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
