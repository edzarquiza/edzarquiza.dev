import { ExperienceEntry } from '../data/experience'

export default function ExperienceItem({ role, company, location, start, end, type, highlights }: ExperienceEntry) {
  return (
    <div className="grid gap-2 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[200px_1fr] md:gap-8">
      <div>
        <p className="font-mono text-xs text-teal-text">
          {start} – {end}
        </p>
        <p className="mt-1 text-xs text-text-secondary">{type}</p>
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-charcoal">{role}</h3>
        <p className="mt-1 font-serif text-sm text-text-secondary">
          {company} &middot; {location}
        </p>
        <ul className="mt-4 space-y-2.5">
          {highlights.map((point) => (
            <li key={point} className="flex gap-3 font-serif text-sm leading-relaxed text-charcoal/80">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
