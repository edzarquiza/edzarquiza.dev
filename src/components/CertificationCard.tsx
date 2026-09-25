import { Certification } from '../data/certifications'

export default function CertificationCard({ name, issuer, date, expiry, url, note, logo, featured }: Certification) {
  return (
    <div
      className={`flex h-full flex-col border bg-white p-6 ${
        featured ? 'border-t-2 border-t-teal border-x-border border-b-border' : 'border-border'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          {featured && (
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-text">
              Featured
            </p>
          )}
          <p className="font-mono text-xs leading-snug text-teal-text">
            {date}
            {expiry && <span className="text-text-secondary"> &middot; Expires {expiry}</span>}
          </p>
        </div>
        <img src={logo} alt={`${issuer} logo`} className="h-24 w-24 shrink-0 object-contain" />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-base font-bold text-charcoal">{name}</h3>
        <p className="mt-1 font-serif text-sm text-text-secondary">{issuer}</p>
        {note && <p className="mt-3 font-serif text-xs leading-relaxed text-text-secondary/80">{note}</p>}
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 text-xs font-semibold text-teal-text hover:text-charcoal"
        >
          View credential &rarr;
        </a>
      )}
    </div>
  )
}
