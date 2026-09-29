type Stat = { value: string; label: string }

type StatStripProps = {
  stats: Stat[]
  invert?: boolean
}

export default function StatStrip({ stats, invert = false }: StatStripProps) {
  return (
    <dl
      className={`grid grid-cols-2 gap-x-6 gap-y-5 border border-t-2 p-5 sm:grid-cols-4 sm:gap-4 ${
        invert ? 'border-white/10 border-t-teal bg-white/5' : 'border-border border-t-teal bg-surface'
      }`}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className={`font-display text-xl font-bold sm:text-2xl ${invert ? 'text-white' : 'text-charcoal'}`}>
            {stat.value}
          </dt>
          <dd className={`mt-1 font-serif text-xs leading-snug ${invert ? 'text-white/60' : 'text-text-secondary'}`}>
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  )
}
