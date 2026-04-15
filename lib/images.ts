/**
 * Biblioteca de imagens diárias com tema Minecraft.
 *
 * Como funciona:
 *   - A imagem muda uma vez por dia (baseada no dia do ano).
 *   - O mesmo dia sempre mostra a mesma imagem.
 *   - A imagem só muda à meia-noite.
 *
 * Como adicionar/trocar imagens:
 *   Opção A — Imagens locais (recomendado para controle total):
 *     1. Coloque o arquivo em /public/images/nome.jpg
 *     2. Adicione um objeto com url: '/images/nome.jpg'
 *
 *   Opção B — Picsum.photos (grátis, estável, sem API key):
 *     Use https://picsum.photos/seed/{SEMENTE}/1200/600
 *     A mesma semente sempre retorna a mesma foto.
 *
 *   Opção C — Qualquer URL pública estável.
 */

export interface MinecraftImage {
  url: string
  biome: string        // Nome do "bioma" (aparece no HUD)
  caption: string      // Texto principal da imagem
  subCaption: string   // Detalhe secundário
}

export const MINECRAFT_IMAGES: MinecraftImage[] = [
  {
    url: 'https://picsum.photos/seed/mc-forest-deep/1200/600',
    biome: 'Floresta Encantada',
    caption: 'Antonio prepara o inventário para a grande jornada...',
    subCaption: 'Nível de aventura: LENDÁRIO ⚔️',
  },
  {
    url: 'https://picsum.photos/seed/mc-mountain-epic/1200/600',
    biome: 'Pico das Tempestades',
    caption: 'Nem as montanhas param essa missão!',
    subCaption: 'Altitude do plano: máxima 🏔️',
  },
  {
    url: 'https://picsum.photos/seed/mc-desert-gold/1200/600',
    biome: 'Deserto Dourado',
    caption: 'Coordenadas de Dubai: carregadas com sucesso.',
    subCaption: 'Bioma destino desbloqueado 🏜️',
  },
  {
    url: 'https://picsum.photos/seed/mc-ocean-deep/1200/600',
    biome: 'Oceano da Saudade',
    caption: 'Atravessando mares de emoção até Dubai...',
    subCaption: 'Nível de saudade: full bars 🌊',
  },
  {
    url: 'https://picsum.photos/seed/mc-cave-diamonds/1200/600',
    biome: 'Minas de Diamante',
    caption: 'Recurso raro encontrado: 1 visita do Antonio.',
    subCaption: 'Raridade: LENDÁRIO 💎',
  },
  {
    url: 'https://picsum.photos/seed/mc-jungle-thick/1200/600',
    biome: 'Selva Tropical',
    caption: 'Antonio navega pela selva de São Paulo...',
    subCaption: 'Destino: deserto dourado de Dubai 🌿',
  },
  {
    url: 'https://picsum.photos/seed/mc-castle-stone/1200/600',
    biome: 'Castelo dos Laços',
    caption: 'Fortalecendo os vínculos antes da grande aventura.',
    subCaption: 'HP do pai: cheio de amor ❤️',
  },
  {
    url: 'https://picsum.photos/seed/mc-sky-portal/1200/600',
    biome: 'Dimensão dos Portais',
    caption: 'O portal está sendo ativado...',
    subCaption: 'Destino: Dubai. ETA: em breve! 🌀',
  },
  {
    url: 'https://picsum.photos/seed/mc-sunset-epic/1200/600',
    biome: 'Pôr do Sol Épico',
    caption: 'Cada dia que passa: mais perto da grande aventura!',
    subCaption: 'Missão em progresso... ☀️',
  },
  {
    url: 'https://picsum.photos/seed/mc-tundra-snow/1200/600',
    biome: 'Tundra Gelada',
    caption: 'Nem o inverno esfria essa expectativa!',
    subCaption: 'Temperatura do coração: em chamas 🔥',
  },
  {
    url: 'https://picsum.photos/seed/mc-nether-hot/1200/600',
    biome: 'Nether Dimension',
    caption: 'O Nether é quente, mas Dubai é diferente.',
    subCaption: 'Blazes não incluídos no pacote 🌋',
  },
  {
    url: 'https://picsum.photos/seed/mc-river-calm/1200/600',
    biome: 'Vale do Rio Tranquilo',
    caption: 'Seguindo o fluxo direto até Dubai...',
    subCaption: 'Corrente de felicidade ativada 🏞️',
  },
  {
    url: 'https://picsum.photos/seed/mc-bamboo-green/1200/600',
    biome: 'Floresta de Bambu',
    caption: 'Antonio craftando memórias para a vida toda.',
    subCaption: 'Storage: lotado de expectativa 🎋',
  },
  {
    url: 'https://picsum.photos/seed/mc-ruins-ancient/1200/600',
    biome: 'Ruínas Ancestrais',
    caption: 'Até as ruínas sabem: algo épico vem aí.',
    subCaption: 'Lore descoberto: Dubai Quest 🏛️',
  },
  {
    url: 'https://picsum.photos/seed/mc-night-stars/1200/600',
    biome: 'Noite das Estrelas',
    caption: 'Contando estrelas até o dia da chegada...',
    subCaption: 'Cada estrela = 1 memória futura ✨',
  },
  {
    url: 'https://picsum.photos/seed/mc-savanna-warm/1200/600',
    biome: 'Savana Dourada',
    caption: 'A savana dourada: aquecimento para Dubai!',
    subCaption: 'Bioma challenge aceito 🦁',
  },
  {
    url: 'https://picsum.photos/seed/mc-flower-meadow/1200/600',
    biome: 'Pradaria das Flores',
    caption: 'Colhendo momentos especiais para compartilhar.',
    subCaption: 'Drops raros: memórias épicas 🌸',
  },
  {
    url: 'https://picsum.photos/seed/mc-mesa-red/1200/600',
    biome: 'Mesa de Argila Vermelha',
    caption: 'Formações vermelhas como tapete de chegada!',
    subCaption: 'VIP arrival mode activated 🏜️',
  },
  {
    url: 'https://picsum.photos/seed/mc-crystal-caves/1200/600',
    biome: 'Cavernas de Cristal',
    caption: 'Cada hora é um cristal guardado para a aventura.',
    subCaption: 'Amethyst shards collected: growing 💜',
  },
  {
    url: 'https://picsum.photos/seed/mc-waterfall-huge/1200/600',
    biome: 'Cachoeira Épica',
    caption: 'Água não falta em Dubai! (Tem piscina, tá?)',
    subCaption: 'Hydration: AC + pool 🏊',
  },
  {
    url: 'https://picsum.photos/seed/mc-birch-forest/1200/600',
    biome: 'Floresta de Bétula',
    caption: 'Paz e expectativa antes da grande aventura.',
    subCaption: 'Mental health: excelente 🌳',
  },
  {
    url: 'https://picsum.photos/seed/mc-dark-forest/1200/600',
    biome: 'Floresta do Carvalho Negro',
    caption: 'No escuro da floresta brilha a luz da saudade.',
    subCaption: 'Light level: puro amor 🌲',
  },
  {
    url: 'https://picsum.photos/seed/mc-end-dimension/1200/600',
    biome: 'The End',
    caption: 'The End é próximo... do começo da aventura!',
    subCaption: 'End crystal: ativado 🔮',
  },
  {
    url: 'https://picsum.photos/seed/mc-sunrise-new/1200/600',
    biome: 'Amanhecer Épico',
    caption: 'Um novo dia nasce. Mais perto de Dubai.',
    subCaption: 'Sun rising on Dubai time 🌅',
  },
  {
    url: 'https://picsum.photos/seed/mc-temple-jungle/1200/600',
    biome: 'Templo da Selva',
    caption: 'Templos antigos guardam segredos desta missão.',
    subCaption: 'Loot: experiências memoráveis 🏯',
  },
  {
    url: 'https://picsum.photos/seed/mc-village-cozy/1200/600',
    biome: 'Vila dos Amigos',
    caption: 'Aldeões confirmaram: essa viagem vai ser incrível.',
    subCaption: 'Todos os NPCs aprovam 🏘️',
  },
  {
    url: 'https://picsum.photos/seed/mc-storm-epic/1200/600',
    biome: 'Tempestade Épica',
    caption: 'Chuva de emoções se aproximando!',
    subCaption: 'Weather forecast: sunny in Dubai ⛈️',
  },
  {
    url: 'https://picsum.photos/seed/mc-plains-vast/1200/600',
    biome: 'Planícies Imensas',
    caption: 'Espaço de sobra para sonhar grande.',
    subCaption: 'Map size: infinite 🌾',
  },
  {
    url: 'https://picsum.photos/seed/mc-ravine-deep/1200/600',
    biome: 'Ravina Profunda',
    caption: 'Profundidade dos sentimentos: sem limite.',
    subCaption: 'Depth: bedrock level 🪨',
  },
  {
    url: 'https://picsum.photos/seed/mc-mushroom-island/1200/600',
    biome: 'Ilha dos Cogumelos',
    caption: 'Bioma raro desbloqueado: visita do Antonio!',
    subCaption: 'Rarity: ultra rare 🍄',
  },
]

/**
 * Retorna a imagem do dia.
 * Muda à meia-noite. O mesmo refresh no mesmo dia retorna sempre a mesma imagem.
 */
export function getDailyImage(): MinecraftImage {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000)
  return MINECRAFT_IMAGES[dayOfYear % MINECRAFT_IMAGES.length]
}
