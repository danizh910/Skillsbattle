'use client'

import { useState, useEffect, useRef } from 'react'

const CREAM = '#F5F0E8'
const FOREST = '#1B4332'
const CORAL = '#E76F51'
const AMBER = '#F4A261'

/* ─────────────────── static data ─────────────────── */

const PULSE_TARGETS = [22, 3, 680]
const PULSE_LABELS = ['Händler erreicht', 'Festmieter', 'App-Nutzer']

const pillars = [
  {
    pillar: 'SÄULE 01',
    category: 'Physisch',
    title: 'Pop-up-Programm',
    short: 'Leerstehende Ladenlokale werden zur rotierenden Bühne für Händler und Gründer.',
    expanded:
      '6-Wochen-Residenzen, schlanke Mietverträge. CHF 2k Subvention/Slot. 24 Slots/Jahr. Ziel: 3 feste Mieter bis Monat 12. Jede Säule ist in 90 Tagen testbar.',
  },
  {
    pillar: 'SÄULE 02',
    category: 'Digital',
    title: 'Digitale Sichtbarkeit',
    short: 'Ein lebendiger Dorf-Layer — was offen ist, was läuft, wo man hingehen kann.',
    expanded:
      'Google My Business für alle 22 KMU. @newdinhard TikTok/Instagram. 5–8 Micro-Influencer im Retainer-Modell. Digital Coach 0.4 FTE. Kein App-Download nötig — PWA-Web-App.',
  },
  {
    pillar: 'SÄULE 03',
    category: 'Finanziell',
    title: 'Ökosystem-Finanzierung',
    short: 'Mikrozuschüsse, gemeinschaftliches Kapital, reinvestierender Royalty.',
    expanded:
      'Crossiety Community-Plattform CHF 13k/Jahr. KMU-Listinggebühr CHF 40/Monat. Ab Jahr 2 selbstfinanziert. Startkapital CHF 60k von Gemeinde + kantonaler Wirtschaftsförderung.',
  },
]

const evidence = [
  {
    stat: '160+',
    label: 'Crossiety-Gemeinden',
    sub: 'Aktive Gemeinden in CH/DE/LI auf der Crossiety-Plattform',
  },
  {
    stat: '75%',
    label: 'Adoptionsrate',
    sub: 'Einwohner-Adoptionsrate in der Gemeinde Lohn SH',
  },
  {
    stat: '7×',
    label: 'Mehr Klicks',
    sub: 'Mehr Klicks mit vollständigem Google-Unternehmensprofil',
  },
]

const phases = [
  {
    quarter: 'Q1',
    label: 'GRUNDSTEIN',
    items: [
      'MOUs mit 7 Vermietern',
      'Design + Recherche',
      'Startkapital gesichert',
      'Wöchentlicher Digest',
      'Monatliche Retro',
      'Vierteljährliche öffentliche Überprüfung',
    ],
  },
  {
    quarter: 'Q2',
    label: 'START',
    items: [
      'Kohorte 1 · 6 Mieter × 6 Wo.',
      'PWA v0 entwickeln',
      'Gutscheinbuch wird lanciert',
      'App für Einwohner live',
    ],
  },
  {
    quarter: 'Q3',
    label: 'ITERATION',
    items: [
      'Kohorte 2 · 6 Mieter × 6 Wo.',
      'Öffentliche Beta 12 Händler',
      'v1.0 Vorbestellung & Events live',
      'Erste Royalty eingezogen',
      '100 Gutscheinbücher verkauft',
    ],
  },
  {
    quarter: 'Q4',
    label: 'WACHSTUM',
    items: [
      'Kohorte 3 · 6 Mieter × 6 Wo.',
      'v1.0 Vorbestellung & Events live',
      'Erste Royalty eingezogen',
      'App für Einwohner live',
      'Jahres-Retro für den Gemeinderat',
    ],
  },
]

/* ─────────────────── helpers ─────────────────── */

function fmt(n: number) {
  return new Intl.NumberFormat('de-CH').format(n)
}

function fmtCHF(n: number) {
  return `CHF ${fmt(n)}`
}

/* ─────────────────── Reveal hook + component ─────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function Reveal({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────── atoms ─────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="text-xs tracking-[0.25em] uppercase mb-4 font-bold"
      style={{ color: FOREST, opacity: 0.5 }}
    >
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-t" style={{ borderColor: `${FOREST}20` }} />
}

/* ─────────────────── page ─────────────────── */

export default function Page() {
  const [scrollPct, setScrollPct] = useState(0)
  const [pulseCounts, setPulseCounts] = useState([0, 0, 0])
  const [openPillar, setOpenPillar] = useState<number | null>(null)
  const [openPhase, setOpenPhase] = useState<number | null>(null)
  const [kmu, setKmu] = useState(30)
  const [adoption, setAdoption] = useState(20)
  const [conversion, setConversion] = useState(3)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const duration = 1800
    let raf: ReturnType<typeof requestAnimationFrame>
    const timer = setTimeout(() => {
      const startTime = performance.now()
      function tick() {
        const elapsed = performance.now() - startTime
        const t = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        setPulseCounts(PULSE_TARGETS.map(target => Math.round(target * ease)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, 600)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [])

  const platformRevenue = kmu * 40 * 12
  const activeResidents = adoption * 80
  const newTenants = conversion
  const healthPct = Math.min(((kmu / 30 + adoption / 20 + conversion / 3) / 3) * 100, 100)
  const healthStatus = healthPct < 50 ? 'Kritisch' : healthPct < 90 ? 'Auf Kurs' : 'Ziel erreicht'
  const healthColor = healthPct < 50 ? CORAL : healthPct < 90 ? AMBER : FOREST

  return (
    <main className="min-h-screen antialiased" style={{ backgroundColor: CREAM, color: FOREST }}>

      {/* ── STICKY PROGRESS BAR ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, height: '3px',
          width: `${scrollPct}%`, backgroundColor: CORAL,
          zIndex: 50, transition: 'width 60ms linear', pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════
          1. HERO
      ══════════════════════════════ */}
      <section className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24 pt-7 pb-10">
        <div className="flex-none mb-auto">
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-bold"
            style={{ color: FOREST, opacity: 0.45 }}
          >
            NEWDINHARD LIVE · Businessplan V1.0
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center py-16">
          <Reveal>
            <h1
              className="font-black leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 14rem)' }}
            >
              <span className="block" style={{ color: FOREST }}>Dinhard</span>
              <span className="block" style={{ color: FOREST }}>kehrt zurück</span>
              <span className="block" style={{ color: CORAL }}>ins Leben.</span>
            </h1>
          </Reveal>
        </div>

        <Reveal delay={200} className="flex-none">
          <Divider />
          <div className="flex flex-wrap gap-x-10 gap-y-2 mt-6 text-sm" style={{ color: FOREST }}>
            {[
              ['Budget', "CHF 100'000"],
              ['Horizont', '12 Monate'],
              ['Standort', 'ZH · CH-8474'],
              ['Einwohner', "8'000"],
            ].map(([key, val]) => (
              <span key={key}>
                <span style={{ opacity: 0.5 }}>{key} · </span>
                <span className="font-bold">{val}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-6">
            <div className="flex items-center gap-2">
              <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CORAL }} />
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ opacity: 0.4 }}>Live</span>
            </div>
            {PULSE_TARGETS.map((_, i) => (
              <span key={i} className="text-xs" style={{ color: FOREST }}>
                <span className="font-black text-sm" style={{ color: CORAL }}>{pulseCounts[i]}</span>
                {' '}
                <span style={{ opacity: 0.6 }}>{PULSE_LABELS[i]}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          2. DIE DIAGNOSE
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>DIE DIAGNOSE</SectionLabel>
          <h2 className="font-bold leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            Ein Dorf, das still ist — aber nicht leer.
          </h2>
        </Reveal>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { stat: '–38%', label: 'Fussgängerfrequenz', sub: 'Wochentags-Durchschnitt 2019→2025' },
            { stat: '7', label: 'Erdgeschoss-Leerstände', sub: 'Leerstehende oder ungenutzte Einheiten' },
            { stat: 'CHF 0', label: 'Digitaler Umsatz', sub: 'Kein lokaler Händler verkauft online an das Einzugsgebiet' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className="py-12 pr-8"
                style={{
                  borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                  borderBottom: i < 2 ? `1px solid ${FOREST}20` : undefined,
                  paddingLeft: i > 0 ? '2rem' : undefined,
                }}
              >
                <div className="font-black leading-none mb-5" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: CORAL }}>
                  {item.stat}
                </div>
                <div className="font-bold text-lg mb-1">{item.label}</div>
                <div className="text-sm" style={{ opacity: 0.55 }}>{item.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          3. DAS PROGRAMM
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>DAS PROGRAMM</SectionLabel>
          <h2 className="font-bold leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            Ein Programm. Drei Säulen. Ein Feedback-Loop.
          </h2>
        </Reveal>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => {
            const isOpen = openPillar === i
            return (
              <Reveal key={i} delay={i * 120}>
                <div
                  className="cursor-pointer h-full"
                  style={{
                    borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                    borderBottom: i < 2 ? `1px solid ${FOREST}20` : undefined,
                  }}
                  onClick={() => setOpenPillar(isOpen ? null : i)}
                >
                  <div className={`py-10 pr-8 ${i > 0 ? 'md:pl-8' : ''}`}>
                    <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-3" style={{ opacity: 0.45 }}>
                      {p.pillar} / {p.category}
                    </div>
                    <div className="text-xl font-black mb-3">{p.title}</div>
                    <p className="text-sm leading-relaxed mb-5" style={{ opacity: 0.65 }}>{p.short}</p>
                    <div
                      className="overflow-hidden"
                      style={{ maxHeight: isOpen ? '240px' : '0', transition: 'max-height 0.35s ease' }}
                    >
                      <div className="pt-5 pb-2 text-sm leading-relaxed border-t" style={{ borderColor: `${FOREST}20` }}>
                        {p.expanded}
                      </div>
                    </div>
                    <div className="text-[10px] tracking-[0.25em] uppercase font-black mt-5" style={{ color: CORAL }}>
                      {isOpen ? '↑ SCHLIESSEN' : '↓ MEHR'}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════
          4. DIE BELEGE
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>DIE BELEGE</SectionLabel>
          <h2 className="font-bold leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            Bewährt. Gemessen. Replizierbar.
          </h2>
        </Reveal>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {evidence.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className="py-12 pr-8"
                style={{
                  borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                  borderBottom: i < 2 ? `1px solid ${FOREST}20` : undefined,
                  paddingLeft: i > 0 ? '2rem' : undefined,
                }}
              >
                <div className="font-black leading-none mb-5" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: FOREST }}>
                  {item.stat}
                </div>
                <div className="font-bold text-lg mb-1">{item.label}</div>
                <div className="text-sm" style={{ opacity: 0.55 }}>{item.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          5. DIE ZAHLEN
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>DIE ZAHLEN</SectionLabel>
          <h2 className="font-bold leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            Schieberegler bewegen. Modell sehen.
          </h2>
        </Reveal>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Reveal className="py-12 pr-8">
            <SliderBlock
              label="KMU zahlen Listinggebühr"
              min={10} max={60} step={1} value={kmu} onChange={setKmu}
              minLabel="10" maxLabel="60"
              output={fmtCHF(platformRevenue)} outputSub="Jährlicher Plattformumsatz"
            />
          </Reveal>
          <Reveal
            delay={120}
            className="py-12 pr-8 md:pl-8"
            style={{ borderLeft: `1px solid ${FOREST}20`, borderTop: `1px solid ${FOREST}20` }}
          >
            <SliderBlock
              label="Community-Adoptionsrate"
              min={5} max={70} step={1} value={adoption} onChange={setAdoption}
              minLabel="5%" maxLabel="70%"
              output={`${fmt(activeResidents)} Nutzer`} outputSub="Aktive Plattformnutzer"
            />
          </Reveal>
          <Reveal
            delay={240}
            className="py-12 pr-8 md:pl-8"
            style={{ borderLeft: `1px solid ${FOREST}20`, borderTop: `1px solid ${FOREST}20` }}
          >
            <SliderBlock
              label="Pop-up → Dauervermietung"
              min={0} max={12} step={1} value={conversion} onChange={setConversion}
              minLabel="0" maxLabel="12"
              output={`${newTenants} Mieter`} outputSub="Neue feste Ladenlokale"
            />
          </Reveal>
        </div>

        {/* Programme health indicator */}
        <Reveal delay={100}>
          <div className="mt-4 pt-12 border-t" style={{ borderColor: `${FOREST}20` }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.25em] uppercase font-bold" style={{ opacity: 0.5 }}>
                Programmstatus
              </span>
              <span className="text-sm font-black tracking-wide" style={{ color: healthColor, transition: 'color 0.4s ease' }}>
                {healthStatus}
              </span>
            </div>
            <div className="w-full h-[3px] relative" style={{ backgroundColor: `${FOREST}15` }}>
              <div
                style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${healthPct}%`, backgroundColor: healthColor,
                  transition: 'width 0.35s ease, background-color 0.4s ease',
                }}
              />
            </div>
            <div className="flex justify-between mt-3 text-[10px] tracking-widest uppercase" style={{ opacity: 0.35 }}>
              <span>Kritisch</span><span>Auf Kurs</span><span>Ziel erreicht</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          6. DER BOGEN
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>DER BOGEN</SectionLabel>
          <h2 className="font-bold leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            Ein klarer Zwölf-Monats-Bogen.
          </h2>
        </Reveal>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-4">
          {phases.map((ph, i) => {
            const isOpen = openPhase === i
            return (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="cursor-pointer h-full"
                  style={{
                    borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                    borderBottom: i < 3 ? `1px solid ${FOREST}20` : undefined,
                  }}
                  onClick={() => setOpenPhase(isOpen ? null : i)}
                >
                  <div className={`py-10 pr-6 ${i > 0 ? 'md:pl-6' : ''}`}>
                    <div className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ opacity: 0.45 }}>
                      {ph.quarter}
                    </div>
                    <div className="text-lg font-black mb-4">{ph.label}</div>
                    <div
                      className="overflow-hidden"
                      style={{ maxHeight: isOpen ? '360px' : '0', transition: 'max-height 0.35s ease' }}
                    >
                      <ul className="pt-5 border-t space-y-2" style={{ borderColor: `${FOREST}20` }}>
                        {ph.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <span style={{ color: CORAL, lineHeight: '1.5' }}>·</span>
                            <span style={{ opacity: 0.75 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-[10px] tracking-[0.25em] uppercase font-black mt-5" style={{ color: CORAL }}>
                      {isOpen ? '↑ SCHLIESSEN' : '↓ MEHR'}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <Reveal>
          <SectionLabel>ENTSCHEID</SectionLabel>
          <p
            className="font-bold leading-tight mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', maxWidth: '36rem' }}
          >
            Entscheid gefragt bis<br />
            <span style={{ color: CORAL }}>15. Juni 2026.</span><br />
            Erste Ladenfläche öffnet<br />
            12. September 2026.
          </p>
          <CtaButton href="#">Vollständiger Businessplan →</CtaButton>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ backgroundColor: FOREST, color: CREAM }}>
        <div className="px-6 md:px-16 lg:px-24 py-24">
          <Reveal>
            <p
              className="font-black leading-tight mb-16"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              Ein Dorf,<br />wieder auf den Beinen.
            </p>
          </Reveal>
          <div
            className="border-t pt-8 flex flex-col md:flex-row justify-between gap-3 text-sm"
            style={{ borderColor: `${CREAM}25`, opacity: 0.6 }}
          >
            <span>Skills Battle 2026 · EDB · NewDinhard Digital 2027</span>
            <span>Vollständiger Businessplan auf Anfrage erhältlich</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ─────────────────── SliderBlock ─────────────────── */

function SliderBlock({
  label, min, max, step, value, onChange,
  minLabel, maxLabel, output, outputSub,
}: {
  label: string; min: number; max: number; step: number
  value: number; onChange: (v: number) => void
  minLabel: string; maxLabel: string; output: string; outputSub: string
}) {
  return (
    <div>
      <div className="text-sm font-bold mb-6" style={{ color: FOREST }}>{label}</div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full mb-3"
      />
      <div className="flex justify-between text-xs mb-10" style={{ color: FOREST, opacity: 0.4 }}>
        <span>{minLabel}</span>
        <span className="font-bold" style={{ opacity: 1, color: CORAL }}>{value}</span>
        <span>{maxLabel}</span>
      </div>
      <div
        className="font-black leading-none mb-2"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: FOREST, transition: 'all 0.15s ease' }}
      >
        {output}
      </div>
      <div className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: FOREST, opacity: 0.45 }}>
        {outputSub}
      </div>
    </div>
  )
}

/* ─────────────────── CtaButton ─────────────────── */

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="cta-btn inline-block text-sm font-black tracking-[0.15em] uppercase px-8 py-4 border-2"
      style={{ borderColor: CORAL, color: FOREST }}
    >
      {children}
    </a>
  )
}
