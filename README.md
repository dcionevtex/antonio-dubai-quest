# Antonio's Dubai Quest 🎮

Countdown épico em estilo Minecraft para a visita de Antonio a Dubai.

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

---

## Como trocar a data da viagem

Edite **apenas este arquivo**: [`lib/config.ts`](lib/config.ts)

```ts
tripDate: new Date('2026-07-10T10:00:00-03:00'),
//                   ^^^^^^^^^^^ YYYY-MM-DD
//                              ^^^^^^^^ HH:mm:ss
//                                       ^^^^^^ timezone offset (São Paulo = -03:00)
```

Se quiser trocar o nome ou destino, edite os campos acima também.

---

## Como trocar/adicionar imagens diárias

Edite o array `MINECRAFT_IMAGES` em [`lib/images.ts`](lib/images.ts).

**Opção A — Imagens locais (máximo controle):**
1. Coloque a imagem em `/public/images/nome-da-imagem.jpg`
2. Adicione ao array:
```ts
{
  url: '/images/nome-da-imagem.jpg',
  biome: 'Nome do Bioma',
  caption: 'Texto principal da imagem',
  subCaption: 'Detalhe secundário 🎮',
},
```

**Opção B — Picsum.photos (grátis, sem API key, estável):**
```ts
{
  url: 'https://picsum.photos/seed/minha-semente/1200/600',
  // A mesma semente sempre retorna a mesma foto
  biome: 'Meu Bioma',
  caption: 'Minha legenda',
  subCaption: 'Detalhe',
},
```

A imagem muda automaticamente à meia-noite (baseado no dia do ano).

---

## Deploy no Vercel

### 1. Criar repositório no GitHub

```bash
cd "caminho/para/antonio-dubai-quest"
git init
git add .
git commit -m "feat: antonio dubai quest inicial"
git remote add origin https://github.com/SEU_USUARIO/antonio-dubai-quest.git
git push -u origin main
```

### 2. Publicar no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New → Project**
3. Importe o repositório do GitHub
4. Clique em **Deploy**

Pronto. O Vercel detecta Next.js automaticamente. Nenhuma configuração adicional necessária.

### 3. Trocar a data após o deploy

Edite `lib/config.ts`, faça commit e push. O Vercel faz o re-deploy automaticamente.

---

## Estrutura do projeto

```
.
├── app/
│   ├── globals.css       ← Estilos globais + efeito CRT
│   ├── layout.tsx        ← Fontes + metadata
│   └── page.tsx          ← Página principal
├── components/
│   ├── ClientApp.tsx     ← App principal (countdown logic)
│   ├── CountdownBlock.tsx← Bloco de contagem estilo Minecraft
│   ├── DailyImage.tsx    ← Imagem diária com HUD overlay
│   ├── Messages.tsx      ← Mensagens rotativas
│   ├── ProgressBar.tsx   ← Barra XP de progresso
│   └── StarBackground.tsx← Fundo animado de estrelas
├── lib/
│   ├── config.ts         ← ⚙️  Data, nome, destino (edite aqui)
│   └── images.ts         ← 🖼️  Biblioteca de imagens diárias
└── public/
    └── images/           ← Pasta para imagens locais
```

---

## Stack

- [Next.js 14](https://nextjs.org) — App Router
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- Fontes: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) + [VT323](https://fonts.google.com/specimen/VT323) via Google Fonts

---

Feito com ❤️ e Redstone. São Paulo → Dubai.
