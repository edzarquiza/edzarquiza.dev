import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { siteConfig } from '../data/site'

const channels = [
  {
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/edward-jon-arquiza-b86808150/',
    href: siteConfig.linkedinUrl,
  },
  {
    label: 'GitHub',
    value: 'github.com/edzarquiza',
    href: siteConfig.githubUrl,
  },
]

const quickFacts = [
  { label: 'Based in', value: `${siteConfig.location} · remote, distributed teams` },
  { label: 'Availability', value: 'Open to new opportunities' },
  { label: 'Preferred contact', value: 'Email or LinkedIn' },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s connect."
        description="Currently open to opportunities in data engineering, data analytics, Power BI, and related technology roles."
        aside={
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal">Quick Facts</p>
            <dl className="mt-4 space-y-3">
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs text-white/40">{fact.label}</dt>
                  <dd className="mt-0.5 text-sm text-white/80">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 60}>
              <a
                href={channel.href}
                target={channel.label === 'Email' ? undefined : '_blank'}
                rel={channel.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="group block border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal/50 hover:shadow-md"
              >
                <p className="font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{channel.label}</p>
                <p className="mt-3 text-sm font-medium text-charcoal group-hover:text-teal-text">{channel.value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
