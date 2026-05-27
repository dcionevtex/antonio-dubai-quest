/**
 * ================================================================
 * ⚙️  CONFIGURAÇÕES DA MISSÃO — Edite aqui
 * ================================================================
 *
 * Para trocar a data da viagem, edite apenas tripDate abaixo.
 * Formato: "YYYY-MM-DDTHH:mm:ss-HH:mm"
 *   São Paulo = UTC-3  →  "-03:00"
 *   Dubai     = UTC+4  →  "+04:00"
 *
 * Use a data/hora de PARTIDA de São Paulo.
 *
 * Para trocar o nome, origem ou destino: edite os campos abaixo.
 * ================================================================
 */

export const TRIP_CONFIG = {
  // Nome do viajante
  travelerName: 'Antonio',

  // Cidade de origem
  origin: 'São Paulo',

  // Destino épico da missão
  destination: 'Dubai',

  // 🗓️  TROQUE A DATA AQUI:
  tripDate: new Date('2026-06-25T10:00:00-03:00'),

  // Data de início da contagem regressiva (para % de progresso)
  // Pode deixar como está ou trocar para quando você anunciou a viagem
  missionStartDate: new Date('2026-04-15T00:00:00-03:00'),

  // Milestones — troque completed para true conforme forem conquistados
  milestones: [
    {
      id: 'tickets-bought',
      icon: '🎫',
      title: 'Passagens Compradas',
      description: 'São Paulo → Dubai confirmado. Sem volta agora.',
      date: 'Maio 2026',
      completed: true,
      special: false,
    },
    {
      id: 'passport-confirmed',
      icon: '📘',
      title: 'Passaporte Confirmado',
      description: 'Documento válido, foto feia, missão liberada.',
      date: 'Maio 2026',
      completed: true,
      special: false,
    },
    {
      id: 'swimwear',
      icon: '🩱',
      title: 'Roupa de Piscina',
      description: 'A piscina do hotel não vai saber o que vai acontecer.',
      date: '',
      completed: false,
    },
    {
      id: 'sunscreen',
      icon: '🧴',
      title: 'Protetor Solar',
      description: 'Dubai no verão. FPS 50. No mínimo.',
      date: '',
      completed: false,
    },
    {
      id: 'doha-surprise',
      icon: '🌙',
      title: 'Destino Surpresa Desbloqueado',
      description: '1 dia em Doha. Missão ficou épica antes mesmo de começar.',
      date: 'Maio 2026',
      completed: true,
      special: true,
    },
    {
      id: 'swimwear',
      icon: '🩱',
      title: 'Roupa de Piscina',
      description: 'A piscina do hotel não vai saber o que vai acontecer.',
      date: '',
      completed: false,
      special: false,
    },
    {
      id: 'sunscreen',
      icon: '🧴',
      title: 'Protetor Solar',
      description: 'Dubai no verão. FPS 50. No mínimo.',
      date: '',
      completed: false,
      special: false,
    },
    {
      id: 'bags-packed',
      icon: '🧳',
      title: 'Malas Prontas',
      description: 'A mala fechou. A missão está quase completa.',
      date: '',
      completed: false,
      special: false,
    },
  ],
} as const
