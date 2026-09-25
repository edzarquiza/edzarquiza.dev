import { Link } from 'react-router-dom'
import { Project, categoryLabels } from '../data/projects'

type ProjectRowProps = {
  project: Project
  index: number
  reverse?: boolean
}

export default function ProjectRow({ project, index, reverse = false }: ProjectRowProps) {
  const isComingSoon = project.status === 'coming-soon'

  const visual = project.heroImage ? (
    <div className="w-full overflow-hidden border border-border">
      <img src={project.heroImage} alt={`${project.title} dashboard preview`} className="w-full object-cover" />
    </div>
  ) : (
    <div className="flex aspect-[4/3] w-full items-center justify-center border border-border bg-surface">
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary/60">
          {isComingSoon ? 'Case study in progress' : categoryLabels[project.category]}
        </span>
      </div>
    </div>
  )

  const text = (
    <div className="flex flex-col justify-center">
      <span className="font-mono text-sm font-extrabold text-teal-text">{String(index + 1).padStart(2, '0')}</span>
      <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">
        {categoryLabels[project.category]}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">{project.title}</h3>
      <p className="mt-4 max-w-md font-serif text-sm leading-relaxed text-text-secondary">{project.oneLiner}</p>

      {project.tools.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li
              key={tool}
              className={
                tool === 'n8n'
                  ? 'rounded border border-teal bg-teal-tint px-2.5 py-1 text-xs font-medium text-teal-text'
                  : 'rounded border border-border px-2.5 py-1 text-xs text-text-secondary'
              }
            >
              {tool}
            </li>
          ))}
        </ul>
      )}

      {project.keyResults && (
        <dl className="mt-6 grid grid-cols-4 gap-3 border-t border-border pt-5">
          {project.keyResults.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-base font-bold text-charcoal sm:text-lg">{stat.value}</dt>
              <dd className="mt-0.5 font-serif text-[11px] leading-snug text-text-secondary">{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.keyFinding && (
        <p className="mt-4 border-l-2 border-teal pl-3 font-serif text-xs leading-relaxed text-charcoal/70">
          {project.keyFinding}
        </p>
      )}

      {isComingSoon ? (
        <span className="mt-6 text-sm font-semibold text-text-secondary">Case study in progress</span>
      ) : (
        <Link to={`/work/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-text hover:text-charcoal">
          View Case Study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  )

  return (
    <div className="grid items-center gap-10 py-14 first:pt-0 lg:grid-cols-2 lg:gap-16">
      {reverse ? (
        <>
          <div className="lg:order-2">{visual}</div>
          <div className="lg:order-1">{text}</div>
        </>
      ) : (
        <>
          {visual}
          {text}
        </>
      )}
    </div>
  )
}
