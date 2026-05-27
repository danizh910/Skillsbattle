import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'NewDinhard Live — Executive Briefing',
  description: 'Businessplan V1.0 — Dinhard kehrt zurück ins Leben. CHF 100\'000 Budget · 12 Monate · ZH-8474.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'NewDinhard Live — Executive Briefing',
    description: 'Ein Programm. Drei Säulen. Ein Feedback-Loop. Skills Battle 2026.',
    type: 'website',
    locale: 'de_CH',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.className} style={{ scrollBehavior: 'smooth' }}>
      <body>{children}</body>
    </html>
  )
}
