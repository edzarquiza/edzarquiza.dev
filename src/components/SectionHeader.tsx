type SectionHeaderProps = {
  eyebrow?: string
  index?: number
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
}

export default function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = 'left',
  invert = false,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] ${
            invert ? 'text-teal' : 'text-teal-text'
          }`}
        >
          {typeof index === 'number' && (
            <span className={invert ? 'text-white/30' : 'text-charcoal/30'}>{String(index).padStart(2, '0')}</span>
          )}
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${invert ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 font-serif text-base leading-relaxed ${invert ? 'text-white/70' : 'text-text-secondary'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
