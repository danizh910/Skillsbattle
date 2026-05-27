'use client'

import { useState } from 'react'

const CREAM = '#F5F0E8'
const FOREST = '#1B4332'
const CORAL = '#E76F51'

/* ─────────────────── data ─────────────────── */

const pillars = [
  {
    pillar: 'PILLAR 01',
    category: 'Physical',
    title: 'Pop-up Programme',
    short: 'Empty storefronts become rotating stages for merchants and founders.',
    expanded:
      '6-week residencies, light-touch leases. CHF 2k subsidy/slot. 24 slots/year. Target: 3 permanent tenants by Month 12. Each pillar is testable in 90 days.',
  },
  {
    pillar: 'PILLAR 02',
    category: 'Digital',
    title: 'Digital Visibility',
    short: "A live village layer — what's open, what's on, where to go.",
    expanded:
      'Google My Business for all 22 SMEs. @newdinhard TikTok/Instagram. 5–8 micro-influencers retainer model. Digital Coach 0.4 FTE. No app download required — PWA web app.',
  },
  {
    pillar: 'PILLAR 03',
    category: 'Financial',
    title: 'Ecosystem Financing',
    short: 'Micro-grants, matched community capital, re-investing royalty.',
    expanded:
      'Crossiety community platform CHF 13k/year. KMU listing fee CHF 40/month. Self-funded by Year 2. Seed pool CHF 60k from Gemeinde + kantonal Wirtschaftsförderung.',
  },
]

const phases = [
  {
    quarter: 'Q1',
    label: 'FOUNDATION',
    items: [
      'MOUs with 7 landlords',
      'Design + research',
      'Seed pool secured',
      'Weekly digest',
      'Monthly retro',
      'Quarterly public review',
    ],
  },
  {
    quarter: 'Q2',
    label: 'LAUNCH',
    items: [
      'Cohort 1 · 6 tenants × 6 wks',
      'Build v0 PWA',
      'Voucher book launches',
      'App live for residents',
    ],
  },
  {
    quarter: 'Q3',
    label: 'ITERATE',
    items: [
      'Cohort 2 · 6 tenants × 6 wks',
      'Public beta 12 merchants',
      'v1.0 pre-order & events live',
      'First royalty collected',
      '100 voucher books sold',
    ],
  },
  {
    quarter: 'Q4',
    label: 'SCALE',
    items: [
      'Cohort 3 · 6 tenants × 6 wks',
      'v1.0 pre-order & events live',
      'First royalty collected',
      'App live for residents',
      'Year-1 retro to Council',
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

/* ─────────────────── shared atoms ─────────────────── */

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
  return <hr style={{ borderColor: `${FOREST}20` }} className="border-t" />
}

/* ─────────────────── page ─────────────────── */

export default function Page() {
  const [openPillar, setOpenPillar] = useState<number | null>(null)
  const [openPhase, setOpenPhase] = useState<number | null>(null)

  const [kmu, setKmu] = useState(30)
  const [adoption, setAdoption] = useState(20)
  const [conversion, setConversion] = useState(3)

  const platformRevenue = kmu * 40 * 12
  const activeResidents = adoption * 80
  const newTenants = conversion

  return (
    <main
      className="min-h-screen antialiased"
      style={{ backgroundColor: CREAM, color: FOREST }}
    >
      {/* ═══════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col px-6 md:px-16 lg:px-24 pt-7 pb-10">
        {/* top label */}
        <div className="flex-none mb-auto">
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-bold"
            style={{ color: FOREST, opacity: 0.45 }}
          >
            NEWDINHARD LIVE · Business Plan V1.0
          </span>
        </div>

        {/* headline */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <h1
            className="font-black leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 14rem)' }}
          >
            <span className="block" style={{ color: FOREST }}>
              Bringing
            </span>
            <span className="block" style={{ color: FOREST }}>
              Dinhard
            </span>
            <span className="block" style={{ color: CORAL }}>
              back to life.
            </span>
          </h1>
        </div>

        {/* metadata row */}
        <div className="flex-none">
          <Divider />
          <div className="flex flex-wrap gap-x-10 gap-y-2 mt-6 text-sm" style={{ color: FOREST }}>
            {[
              ['Budget', 'CHF 100,000'],
              ['Horizon', '12 Months'],
              ['Location', 'ZH · CH-8474'],
              ['Residents', '8,000'],
            ].map(([key, val]) => (
              <span key={key}>
                <span style={{ opacity: 0.5 }}>{key} · </span>
                <span className="font-bold">{val}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. THE DIAGNOSIS
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <SectionLabel>THE DIAGNOSIS</SectionLabel>
        <h2
          className="font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          A village that is quiet, but not empty.
        </h2>

        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { stat: '–38%', label: 'Foot traffic', sub: 'Weekday avg 2019→2025' },
            { stat: '7', label: 'Ground-floor vacancies', sub: 'Vacant or under-used units' },
            {
              stat: 'CHF 0',
              label: 'Digital revenue',
              sub: 'No local merchant sells online to catchment area',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="py-12 pr-8"
              style={{
                borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                borderBottom: i < 2 ? `1px solid ${FOREST}20` : undefined,
                paddingLeft: i > 0 ? '2rem' : undefined,
              }}
            >
              <div
                className="font-black leading-none mb-5"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: CORAL }}
              >
                {item.stat}
              </div>
              <div className="font-bold text-lg mb-1">{item.label}</div>
              <div className="text-sm" style={{ opacity: 0.55 }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. THE PROGRAMME
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <SectionLabel>THE PROGRAMME</SectionLabel>
        <h2
          className="font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          One programme. Three pillars. One feedback loop.
        </h2>

        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => {
            const isOpen = openPillar === i
            return (
              <div
                key={i}
                className="cursor-pointer"
                style={{
                  borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                  borderBottom: i < 2 ? `1px solid ${FOREST}20` : undefined,
                }}
                onClick={() => setOpenPillar(isOpen ? null : i)}
              >
                <div className={`py-10 pr-8 ${i > 0 ? 'md:pl-8' : ''}`}>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase font-bold mb-3"
                    style={{ opacity: 0.45 }}
                  >
                    {p.pillar} / {p.category}
                  </div>
                  <div className="text-xl font-black mb-3">{p.title}</div>
                  <p className="text-sm leading-relaxed mb-5" style={{ opacity: 0.65 }}>
                    {p.short}
                  </p>

                  {/* expandable detail */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? '240px' : '0',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <div
                      className="pt-5 pb-2 text-sm leading-relaxed border-t"
                      style={{ borderColor: `${FOREST}20` }}
                    >
                      {p.expanded}
                    </div>
                  </div>

                  {/* toggle label */}
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase font-black mt-5"
                    style={{ color: CORAL }}
                  >
                    {isOpen ? '↑ CLOSE' : '↓ EXPAND'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. KPI CALCULATOR
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <SectionLabel>THE NUMBERS</SectionLabel>
        <h2
          className="font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          Move the sliders. See the model.
        </h2>

        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Slider 1 — KMU */}
          <div className="py-12 pr-8">
            <SliderBlock
              label="KMU paying listing fee"
              min={10}
              max={60}
              step={1}
              value={kmu}
              onChange={setKmu}
              minLabel="10"
              maxLabel="60"
              output={fmtCHF(platformRevenue)}
              outputSub="Annual platform revenue"
            />
          </div>

          {/* Slider 2 — Adoption */}
          <div
            className="py-12 pr-8 md:pl-8 border-t md:border-t-0"
            style={{ borderLeft: `1px solid ${FOREST}20`, borderTop: `1px solid ${FOREST}20` }}
          >
            <SliderBlock
              label="Community adoption rate"
              min={5}
              max={70}
              step={1}
              value={adoption}
              onChange={setAdoption}
              minLabel="5%"
              maxLabel="70%"
              output={`${fmt(activeResidents)} residents`}
              outputSub="Active platform users"
            />
          </div>

          {/* Slider 3 — Conversion */}
          <div
            className="py-12 pr-8 md:pl-8 border-t md:border-t-0"
            style={{ borderLeft: `1px solid ${FOREST}20`, borderTop: `1px solid ${FOREST}20` }}
          >
            <SliderBlock
              label="Pop-up → permanent conversion"
              min={0}
              max={12}
              step={1}
              value={conversion}
              onChange={setConversion}
              minLabel="0"
              maxLabel="12"
              output={`${newTenants} new tenant${newTenants !== 1 ? 's' : ''}`}
              outputSub="New storefronts filled"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. 12-MONTH ROADMAP
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t" style={{ borderColor: `${FOREST}20` }}>
        <SectionLabel>THE ARC</SectionLabel>
        <h2
          className="font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          A clear twelve-month arc.
        </h2>

        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-4">
          {phases.map((ph, i) => {
            const isOpen = openPhase === i
            return (
              <div
                key={i}
                className="cursor-pointer"
                style={{
                  borderLeft: i > 0 ? `1px solid ${FOREST}20` : undefined,
                  borderBottom: i < 3 ? `1px solid ${FOREST}20` : undefined,
                }}
                onClick={() => setOpenPhase(isOpen ? null : i)}
              >
                <div className={`py-10 pr-6 ${i > 0 ? 'md:pl-6' : ''}`}>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2"
                    style={{ opacity: 0.45 }}
                  >
                    {ph.quarter}
                  </div>
                  <div className="text-lg font-black mb-4">{ph.label}</div>

                  {/* expandable items */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? '360px' : '0',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <ul
                      className="pt-5 border-t space-y-2"
                      style={{ borderColor: `${FOREST}20` }}
                    >
                      {ph.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <span style={{ color: CORAL, lineHeight: '1.5' }}>·</span>
                          <span style={{ opacity: 0.75 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="text-[10px] tracking-[0.25em] uppercase font-black mt-5"
                    style={{ color: CORAL }}
                  >
                    {isOpen ? '↑ CLOSE' : '↓ EXPAND'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer style={{ backgroundColor: FOREST, color: CREAM }}>
        <div className="px-6 md:px-16 lg:px-24 py-24">
          <p
            className="font-black leading-tight mb-16"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            One village,<br />back on its feet.
          </p>
          <div
            className="border-t pt-8 flex flex-col md:flex-row justify-between gap-3 text-sm"
            style={{ borderColor: `${CREAM}25`, opacity: 0.6 }}
          >
            <span>Skills Battle 2026 · EDB · NewDinhard Digital 2027</span>
            <span>Full business plan available on request</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ─────────────────── SliderBlock component ─────────────────── */

function SliderBlock({
  label,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
  output,
  outputSub,
}: {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  minLabel: string
  maxLabel: string
  output: string
  outputSub: string
}) {
  return (
    <div>
      <div className="text-sm font-bold mb-6" style={{ color: FOREST }}>
        {label}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full mb-3"
      />

      <div
        className="flex justify-between text-xs mb-10"
        style={{ color: FOREST, opacity: 0.4 }}
      >
        <span>{minLabel}</span>
        <span className="font-bold" style={{ opacity: 1, color: CORAL }}>
          {value}
        </span>
        <span>{maxLabel}</span>
      </div>

      <div
        className="font-black leading-none mb-2 transition-all duration-150"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: FOREST }}
      >
        {output}
      </div>
      <div
        className="text-[10px] tracking-[0.2em] uppercase font-bold"
        style={{ color: FOREST, opacity: 0.45 }}
      >
        {outputSub}
      </div>
    </div>
  )
}
