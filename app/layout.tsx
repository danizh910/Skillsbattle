import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'NewDinhard Live — Executive Briefing',
  description: 'Business Plan V1.0 — Bringing Dinhard back to life. CHF 100,000 · 12 Months · ZH-8474.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.className} style={{ scrollBehavior: 'smooth' }}>
      <body>{children}</body>
    </html>
  )
}
