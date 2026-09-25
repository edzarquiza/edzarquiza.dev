import Button from './Button'
import CareerMark from './CareerMark'
import CareerEvidence from './CareerEvidence'
import { siteConfig } from '../data/site'

export default function Hero() {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-content px-6 pb-12 pt-20 sm:pb-16 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-teal">
              Data / BI &middot; Automation &middot; Software Engineering
            </p>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              A technology professional focused on <span className="text-teal">Power BI and data analytics</span>,
              with an 11-year foundation in software development, automation, and RPA.
            </h1>

            <p className="mt-6 max-w-lg font-serif text-base leading-relaxed text-white/70">
              I build Power BI reporting and data solutions that help turn operational data into decisions —
              backed by years of experience building the automation systems, applications, and databases behind
              the data.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/work" variant="primary">
                View My Projects
              </Button>
              <Button href={siteConfig.resumeFile} download variant="outline-dark">
                Download Resume
              </Button>
            </div>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-teal/15 text-teal">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V21h-4V9Z" />
                </svg>
              </span>
              Connect on LinkedIn
            </a>
          </div>

          <div className="hidden flex-col items-center lg:flex lg:-translate-y-10 lg:justify-self-stretch">
            <CareerMark />
            <div className="mt-10 w-full max-w-[300px]">
              <CareerEvidence />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
