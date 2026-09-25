import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import CareerTimeline from '../components/CareerTimeline'
import ContactCTA from '../components/ContactCTA'
import SkillsGrid from '../components/SkillsGrid'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'
import { siteConfig } from '../data/site'

const featuredProjects = projects.filter((p) => p.status === 'published')

const method = [
  { step: '01', title: 'Understand', description: 'Start with the business problem and stakeholder needs.' },
  { step: '02', title: 'Validate', description: 'Understand the data, assumptions, quality, and limitations.' },
  { step: '03', title: 'Build', description: 'Clean and transform the data, model it, and build reliable calculations or automation.' },
  { step: '04', title: 'Analyze', description: 'Look for trends, relationships, exceptions, and meaningful KPIs.' },
  { step: '05', title: 'Communicate', description: 'Turn findings into clear visual stories and practical recommendations.' },
]

const featuredCertNames = certifications.filter((c) => c.featured).map((c) => c.name)

export default function Home() {
  return (
    <>
      <Hero />

      <section id="career" className="bg-charcoal scroll-mt-20">
        <div className="mx-auto max-w-content px-6 pb-16 pt-8 sm:pb-20 sm:pt-10">
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

      <section id="skills" className="border-t border-border bg-surface scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <SectionHeader eyebrow="Core Skills" title="The tools, technologies, and capabilities I bring to the table." />
          <div className="mt-10">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-border scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow="About Me"
              title="From IT support to software development, RPA, and now data analytics, one deliberate step at a time."
            />
            <p className="mt-6 font-serif text-base leading-relaxed text-charcoal/80">
              I'm {siteConfig.name}, an automation and IT professional based in {siteConfig.location}. I started
              in IT support and full-stack software development, learning how systems and businesses actually
              work.
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-charcoal/80">
              From there I grew into RPA, automation, technical leadership, and business delivery, leading
              teams and owning outcomes, not just writing code.
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-charcoal/80">
              Now I&rsquo;m applying that foundation to Power BI and data analytics. It isn&rsquo;t a restart.
              It&rsquo;s the next deliberate step in my career.
            </p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-text hover:text-charcoal">
              Read the full story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-border bg-surface scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader eyebrow="Selected Work" title="A look at the projects." />
            <Link to="/work" className="text-sm font-semibold text-teal-text hover:text-charcoal">
              View all projects &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-i-work" className="border-t border-border scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <SectionHeader
            eyebrow="How I Work"
            title="An analytical approach, not just a technical one."
            description="The same methodology behind every dashboard, report, and automation I build."
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {method.map((item) => (
              <li key={item.step} className="border-t-2 border-teal pt-4">
                <span className="font-mono text-xs text-teal-text">{item.step}</span>
                <h3 className="mt-2 font-display text-base font-bold text-charcoal">{item.title}</h3>
                <p className="mt-2 font-serif text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="credentials" className="border-t border-border bg-surface scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl font-serif text-base leading-relaxed text-charcoal/80">
              Backed by the <span className="font-semibold text-charcoal">{featuredCertNames[0]}</span> and{' '}
              <span className="font-semibold text-charcoal">{featuredCertNames[1]}</span> certifications.
            </p>
            <Link to="/credentials" className="shrink-0 text-sm font-semibold text-teal-text hover:text-charcoal">
              View all credentials &rarr;
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
