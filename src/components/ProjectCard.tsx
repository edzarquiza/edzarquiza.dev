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
            alt={project.heroImageAlt ?? `${project.title} dashboard preview`}
            className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-sans text-xs font-medium text-text-secondary">
          <span className="font-semibold text-teal-text">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-border" aria-hidden="true">/</span>
          {categoryLabels[project.category]}
        </p>
        {isComingSoon && (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary">
            In progress
          </span>
        )}
      </div>
      <h3 className="mt-3 min-h-[4rem] font-display text-2xl font-bold text-charcoal transition-colors group-hover:text-teal-text">{project.title}</h3>
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

      <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-teal-text">
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
    'group flex h-full flex-col border border-border bg-white p-8 transition-all duration-200 ease-out' +
    (isComingSoon ? ' opacity-80' : ' hover:-translate-y-1 hover:border-teal/50 hover:shadow-md')

  if (isComingSoon) {
    return <div className={className}>{content}</div>
  }

  return (
    <Link to={`/work/${project.slug}`} className={className}>
      {content}
    </Link>
  )
}
