import { Link } from 'react-router-dom'
import { Project, categoryLabels } from '../data/projects'

type ProjectCardProps = {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isComingSoon = project.status === 'coming-soon'

  const content = (
    <>
      {project.heroImage && (
        <div className="-m-8 mb-6 aspect-video overflow-hidden border-b border-border bg-surface">
          <img
            src={project.heroImage}
            alt={`${project.title} dashboard preview`}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm font-extrabold text-teal-text">{String(index + 1).padStart(2, '0')}</span>
        {isComingSoon && (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary">
            In progress
          </span>
        )}
      </div>

      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">
        {categoryLabels[project.category]}
      </p>
      <h3 className="mt-2 min-h-[4rem] font-display text-2xl font-bold text-charcoal">{project.title}</h3>
      <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">{project.oneLiner}</p>

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

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-text">
        {isComingSoon ? 'Case study in progress' : 'View Case Study'}
        {!isComingSoon && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </>
  )

  const className =
    'group flex flex-col border border-border bg-white p-8 transition-colors transition-shadow' +
    (isComingSoon ? ' opacity-80' : ' hover:border-teal/50 hover:shadow-sm')

  if (isComingSoon) {
    return <div className={className}>{content}</div>
  }

  return (
    <Link to={`/work/${project.slug}`} className={className}>
      {content}
    </Link>
  )
}
