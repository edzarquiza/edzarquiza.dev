import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ProjectRow from '../components/ProjectRow'
import { categoryLabels, projects, ProjectCategory } from '../data/projects'

const filters: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All Projects', value: 'all' },
  { label: categoryLabels.powerbi, value: 'powerbi' },
  { label: categoryLabels['case-study'], value: 'case-study' },
  { label: categoryLabels.automation, value: 'automation' },
  { label: categoryLabels.engineering, value: 'engineering' },
]

export default function Work() {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="What I've built."
        description="Power BI dashboards, analytical case studies, and automation projects built around business problems."
      />

      <section className="mx-auto max-w-content px-6 py-14">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={active === filter.value}
              onClick={() => setActive(filter.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === filter.value
                  ? 'border-teal bg-teal-tint text-teal-text'
                  : 'border-border text-text-secondary hover:border-charcoal/30 hover:text-charcoal'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-6 divide-y divide-border">
          {visible.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>
    </>
  )
}
