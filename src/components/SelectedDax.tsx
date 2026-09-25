import { useState } from 'react'

export type DaxMeasure = {
  name: string
  formula: string
  explanation: string
}

export const ecommerceMeasures: DaxMeasure[] = [
  {
    name: 'Total Revenue',
    formula: `Total Revenue =
SUM(
    f_olist_order_items_dataset[price]
)`,
    explanation: 'Basic aggregation, the core metric other measures build from.',
  },
  {
    name: 'Revenue / Order',
    formula: `Revenue per Order =
DIVIDE(
    [Total Revenue],
    [Total Orders]
)`,
    explanation: 'DIVIDE() reusing existing measures rather than repeating the underlying logic.',
  },
  {
    name: 'On-Time %',
    formula: `On-Time Delivery % =
DIVIDE(
    [On-Time Deliveries],
    [Delivered Orders]
)`,
    explanation: 'Depends on CALCULATE() and filter context to isolate on-time vs. delivered orders.',
  },
  {
    name: 'Review Score',
    formula: `Average Review Score =
AVERAGE(
    f_olist_order_reviews_dataset[review_score]
)`,
    explanation: 'Aggregates directly across the customer review data.',
  },
  {
    name: 'Revenue / Customer',
    formula: `Revenue per Customer =
DIVIDE(
    [Total Revenue],
    [Total Unique Customers]
)`,
    explanation: 'Combines a distinct-customer calculation with DIVIDE().',
  },
]

export default function SelectedDax({
  measures = ecommerceMeasures,
  ariaLabel = 'Select a DAX measure',
}: {
  measures?: DaxMeasure[]
  ariaLabel?: string
}) {
  const [active, setActive] = useState(0)
  const measure = measures[active]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
        {measures.map((m, i) => (
          <button
            key={m.name}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === i
                ? 'border-teal bg-teal-tint text-teal-text'
                : 'border-border text-text-secondary hover:border-charcoal/30 hover:text-charcoal'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="mt-6 border border-border bg-surface p-6">
        <p className="font-display text-base font-bold text-charcoal">{measure.name}</p>
        <pre className="mt-4 overflow-x-auto rounded bg-charcoal p-4 font-mono text-xs leading-relaxed text-teal">
          {measure.formula}
        </pre>
        <p className="mt-4 font-serif text-sm leading-relaxed text-text-secondary">{measure.explanation}</p>
      </div>
    </div>
  )
}
