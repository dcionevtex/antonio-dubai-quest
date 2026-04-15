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
  tripDate: new Date('2026-06-26T10:00:00-03:00'),

  // Data de início da contagem regressiva (para % de progresso)
  // Pode deixar como está ou trocar para quando você anunciou a viagem
  missionStartDate: new Date('2026-04-15T00:00:00-03:00'),
} as const
