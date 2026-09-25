import PageHeader from '../components/PageHeader'
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

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's connect."
        description="Currently focused on Power BI and data analytics roles. Also open to automation, RPA, AI-assisted development, SQL/database, and software development opportunities where my broader technical background applies. The fastest way to reach me is email or LinkedIn."
      />

      <section className="mx-auto max-w-content px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.label === 'Email' ? undefined : '_blank'}
              rel={channel.label === 'Email' ? undefined : 'noopener noreferrer'}
              className="group border border-border bg-white p-6 transition-colors transition-shadow hover:border-teal/50 hover:shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{channel.label}</p>
              <p className="mt-3 text-sm font-medium text-charcoal group-hover:text-teal-text">{channel.value}</p>
            </a>
          ))}
        </div>

        <p className="mt-6 max-w-xl font-serif text-sm leading-relaxed text-text-secondary">
          Based in {siteConfig.location}, working remotely with distributed teams.
        </p>
      </section>
    </>
  )
}
