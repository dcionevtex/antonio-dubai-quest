import type { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "A Grande Missão de Antonio 🎮",
  description: "Countdown épico para a visita de Antonio a Dubai — uma aventura Minecraft no mundo real.",
  openGraph: {
    title: "A Grande Missão de Antonio",
    description: "Falta pouco para atravessar o portal até Dubai!",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${pressStart.variable} ${vt323.variable}`}>
      <body className="font-vt bg-mc-night text-white antialiased min-h-screen">
        {/* CRT scanline effect */}
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
