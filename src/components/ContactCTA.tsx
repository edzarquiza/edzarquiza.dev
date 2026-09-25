import Button from './Button'
import { siteConfig } from '../data/site'

export default function ContactCTA() {
  return (
    <section className="bg-yellow">
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Let&rsquo;s connect.</h2>
            <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-charcoal/70">
              Open to Power BI, data analytics, and BI roles — as well as automation, AI, SQL, and software
              development opportunities.
            </p>
          </div>
          <Button to="/contact" variant="dark" className="shrink-0">
            Let&rsquo;s Connect
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-charcoal/15 pt-6 text-sm font-medium text-charcoal">
          <a href={siteConfig.resumeFile} target="_blank" rel="noopener noreferrer" className="hover:underline">
            Resume
          </a>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:underline">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  )
}
