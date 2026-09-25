import Icon from './icons'
import { careerJourney, currentFocus } from '../data/experience'

const milestones = [...careerJourney, currentFocus]

// Expanding scope: each node grows a little larger than the last, ending in the
// biggest, brightest ring for the current focus — a visual echo of growing responsibility.
const glowSizes = [64, 76, 90, 104, 120, 150]
const ringSizes = [46, 54, 62, 70, 82, 102]
const dotSizes = [34, 40, 46, 52, 60, 74]
const iconClasses = ['h-4 w-4', 'h-4 w-4', 'h-5 w-5', 'h-5 w-5', 'h-6 w-6', 'h-7 w-7']

function TimelineNode({ step, i, isCurrent }: { step: (typeof milestones)[number]; i: number; isCurrent: boolean }) {
  const glow = glowSizes[i]
  const ring = ringSizes[i]
  const dot = dotSizes[i]

  return (
    <div className="relative flex shrink-0 items-center justify-center" style={{ width: glow, height: glow }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isCurrent
            ? 'radial-gradient(circle, rgba(255,194,71,0.4) 0%, rgba(255,194,71,0) 72%)'
            : 'radial-gradient(circle, rgba(11,138,140,0.28) 0%, rgba(11,138,140,0) 72%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute rounded-full border ${isCurrent ? 'border-yellow/70' : 'border-teal/40'}`}
        style={{ width: ring, height: ring }}
        aria-hidden="true"
      />
      <div
        className={`relative flex items-center justify-center rounded-full border-2 bg-charcoal ${
          isCurrent ? 'border-yellow text-yellow' : 'border-teal/70 text-teal'
        }`}
        style={{ width: dot, height: dot }}
      >
        <Icon name={step.icon} className={iconClasses[i]} />
      </div>
    </div>
  )
}

export default function CareerTimeline() {
  return (
    <div>
      {/* Desktop / tablet: horizontal line-connected timeline with expanding-scope nodes */}
      <div className="hidden md:block">
        <div className="grid grid-cols-6 gap-4">
          {milestones.map((step, i) => {
            const isCurrent = i === milestones.length - 1
            return (
              <div key={step.role} className="relative flex flex-col items-center text-center">
                <div className="relative flex w-full items-center" style={{ height: glowSizes[glowSizes.length - 1] }}>
                  <div className={`h-px flex-1 ${i === 0 ? 'bg-transparent' : 'bg-teal/25'}`} aria-hidden="true" />
                  <TimelineNode step={step} i={i} isCurrent={isCurrent} />
                  <div
                    className={`h-px flex-1 ${i === milestones.length - 1 ? 'bg-transparent' : 'bg-teal/25'}`}
                    aria-hidden="true"
                  />
                </div>

                <p
                  className={`mt-4 font-mono text-xs ${
                    isCurrent ? 'font-semibold uppercase tracking-[0.1em] text-yellow-dark' : 'text-teal-text'
                  }`}
                >
                  {step.year}
                </p>
                <p className="mt-1 font-display text-sm font-bold leading-snug text-white">{step.role}</p>
                <p className="mt-2 font-serif text-xs leading-relaxed text-white/65">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <ol className="flex flex-col md:hidden">
        {milestones.map((step, i) => {
          const isCurrent = i === milestones.length - 1
          return (
            <li key={step.role} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    isCurrent ? 'border-yellow bg-charcoal text-yellow' : 'border-teal/60 bg-charcoal text-teal'
                  }`}
                >
                  <Icon name={step.icon} className="h-4 w-4" />
                </span>
                {i < milestones.length - 1 && <span className="w-px flex-1 bg-teal/25" aria-hidden="true" />}
              </div>
              <div className="pb-8">
                <p
                  className={`font-mono text-xs ${
                    isCurrent ? 'font-semibold uppercase tracking-[0.1em] text-yellow-dark' : 'text-teal-text'
                  }`}
                >
                  {step.year}
                </p>
                <p className="mt-1 font-display text-sm font-bold text-charcoal">{step.role}</p>
                <p className="mt-1 font-serif text-xs leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
