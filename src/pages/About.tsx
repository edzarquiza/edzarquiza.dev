import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ExperienceItem from '../components/ExperienceItem'
import CareerTimeline from '../components/CareerTimeline'
import ContactCTA from '../components/ContactCTA'
import SkillsGrid from '../components/SkillsGrid'
import { experience } from '../data/experience'
import { certifications } from '../data/certifications'
import { siteConfig } from '../data/site'

const featuredCertNames = certifications.filter((c) => c.featured).map((c) => c.name)

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="From IT support to automation leadership, now data and Power BI."
        description="11 years of IT experience, applied to a growing specialization in Power BI and data analytics."
      />

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 font-serif text-base leading-relaxed text-charcoal/80">
            <p>
              I'm {siteConfig.name}, an automation and IT lead based in {siteConfig.location}. Over the past 11
              years I've worked across IT support, full-stack software development, and RPA delivery for a
              Japanese manufacturing company and, more recently, a remote-first Australian technology company,
              most recently as Senior Automation Developer / IT Lead.
            </p>
            <p>
              My career didn't start in data analytics, and I don't present it that way. It started in IT support,
              where I learned how systems and businesses actually break. That led into full-stack C# development,
              where SQL and database work sat alongside application code as much as the applications themselves,
              then into building and leading RPA automation delivery for business-critical processes: 50+
              production solutions in UiPath, delivering approximately 70 hours and AUD 2,800 in savings per
              month, across requirements, development, testing, and deployment.
            </p>
            <p>
              Power BI and data analytics were never separate from that work. Every automation team I've led has
              needed KPI tracking and reporting to prove it was working, including a Jira-to-Power BI pipeline I
              built that leadership used directly for sprint and workload decisions, alongside roughly ten Power
              BI reports covering automation performance, finance forecasting, and team workload. Building that
              reporting became part of the job well before it became the focus. Earning the Microsoft Certified:
              Data Analyst Associate and Google Data Analytics Professional certifications was a deliberate next
              step in that direction, not a restart.
            </p>
          </div>

          <div className="space-y-6 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Current Focus</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">
                Power BI and Data Analytics — building deeper expertise in data modeling, DAX, Power Query, and
                business-focused reporting on top of my background in software development and automation.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Availability</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">
                Currently open to opportunities in Power BI, Data Analytics, BI Development, Automation, and
                related technology roles.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Working Philosophy</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">
                Understand the business problem before touching a tool. Validate the data before trusting it.
                Model before visualizing. Explain why a metric matters instead of just reporting it.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Based In</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">
                {siteConfig.location}, working remotely with distributed teams, most recently across Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <SectionHeader eyebrow="Technical Background" title="Tools and disciplines across the full stack." />
          <div className="mt-10">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <SectionHeader eyebrow="Experience" title="Career history" />
          <div className="mt-10">
            {experience.map((entry) => (
              <ExperienceItem key={entry.role + entry.start} {...entry} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <SectionHeader
            invert
            eyebrow="My Career Journey"
            title="A steady climb from IT support to Power BI and analytics."
            description="Each role built on the last: expanding scope from support, to development, to leading automation delivery, to Power BI and analytics."
          />
          <div className="mt-14">
            <CareerTimeline />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-6 py-16">
          <p className="max-w-2xl font-serif text-base leading-relaxed text-charcoal/80">
            That direction is backed by the <span className="font-semibold text-charcoal">{featuredCertNames[0]}</span>{' '}
            and <span className="font-semibold text-charcoal">{featuredCertNames[1]}</span> certifications, alongside
            a Computer Science degree.{' '}
            <Link to="/credentials" className="font-semibold text-teal-text hover:text-charcoal">
              View credentials &amp; education &rarr;
            </Link>
          </p>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
