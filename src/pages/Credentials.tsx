import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import CertificationCard from '../components/CertificationCard'
import { certifications, education } from '../data/certifications'

const primaryCerts = certifications.filter((c) => c.featured)
const supportingCerts = certifications.filter((c) => !c.featured)

export default function Credentials() {
  return (
    <>
      <PageHeader
        eyebrow="Credentials"
        title="Certifications & education"
        description="Professional credentials and certifications supporting my background in data analytics, software development, and technology."
      />

      <section className="mx-auto max-w-content px-6 py-16">
        <SectionHeader eyebrow="Certifications" title="Professional certifications" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {primaryCerts.map((cert) => (
            <CertificationCard key={cert.name} {...cert} />
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">Supporting credentials</p>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {supportingCerts.map((cert) => (
              <li key={cert.name} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-4">
                <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-10 w-10 shrink-0 object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold text-charcoal">{cert.name}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{cert.issuer}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-teal-text">
                  {cert.date}
                  {cert.expiry && <span className="text-text-secondary"> &middot; Expires {cert.expiry}</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <SectionHeader eyebrow="Education" title="Academic background" />
          <div className="mt-10 max-w-xl border border-border bg-white p-6">
            <p className="font-mono text-xs text-teal-text">{education.year}</p>
            <h3 className="mt-2 font-display text-lg font-bold text-charcoal">{education.degree}</h3>
            <p className="mt-1 text-sm text-text-secondary">
              {education.school}, {education.location}
            </p>
            {education.note && <p className="mt-3 text-sm text-charcoal/70">{education.note}</p>}
          </div>
        </div>
      </section>
    </>
  )
}
