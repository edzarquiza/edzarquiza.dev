import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import { siteConfig } from '../data/site'

export default function Resume() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="View or download my resume"
        description="A concise, application-ready summary of my experience, skills, and certifications. This site provides the fuller story."
      />

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="flex flex-col items-start gap-4 border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-charcoal">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-text-secondary">PDF &middot; Updated 2026</p>
          </div>
          <Button href={siteConfig.resumeFile} download>
            Download Resume
          </Button>
        </div>

        <div className="mt-10 overflow-hidden border border-border">
          <iframe
            src={siteConfig.resumeFile}
            title={`${siteConfig.name} — Resume preview`}
            className="h-[70vh] w-full"
          />
        </div>
      </section>
    </>
  )
}
