const stats = [
  { value: '11', label: 'Years in Technology' },
  { value: '50+', label: 'Automation Solutions' },
  { value: '70+', label: 'VBA & .NET Applications' },
]

export default function CareerEvidence() {
  return (
    <div className="space-y-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex items-baseline gap-3 ${i < stats.length - 1 ? 'border-b border-white/10 pb-3' : ''}`}
        >
          <p className="font-display text-xl font-extrabold text-white">{stat.value}</p>
          <p className="font-serif text-xs leading-snug text-white/60">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
