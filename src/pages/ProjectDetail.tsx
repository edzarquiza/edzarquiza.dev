import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import { categoryLabels, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const hasDetail =
    project.businessProblem ||
    project.stakeholders ||
    (project.businessQuestions && project.businessQuestions.length > 0) ||
    project.data ||
    (project.method && project.method.length > 0) ||
    (project.keyFindings && project.keyFindings.length > 0) ||
    (project.recommendations && project.recommendations.length > 0) ||
    project.reflection

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description={project.oneLiner}
        backTo="/work"
        backLabel="Back to Projects"
      />

      <div className="mx-auto max-w-content px-6 py-14">
        {!hasDetail ? (
          <div className="border border-border bg-surface p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">In Progress</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-charcoal">This case study is in progress.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              This project will follow the same structure as every case study on this site: business problem,
              data, method, findings, and recommendations. Check back soon, or view the projects already
              available.
            </p>
            <div className="mt-6 flex justify-center">
              <Button to="/work" variant="secondary">
                Back to Projects
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
            <div className="space-y-12">
              {project.businessProblem && (
                <DetailSection title="Business Problem">
                  <p className="font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
                </DetailSection>
              )}

              {project.stakeholders && (
                <DetailSection title="Stakeholders">
                  <p className="font-serif text-sm leading-relaxed text-charcoal/80">{project.stakeholders}</p>
                </DetailSection>
              )}

              {project.businessQuestions && project.businessQuestions.length > 0 && (
                <DetailSection title="Business Questions">
                  <ul className="space-y-2">
                    {project.businessQuestions.map((q) => (
                      <li key={q} className="flex gap-3 font-serif text-sm leading-relaxed text-charcoal/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}

              {project.data && (
                <DetailSection title="Data">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wide text-text-secondary">Source</dt>
                      <dd className="mt-1 text-sm text-charcoal/80">{project.data.source}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wide text-text-secondary">Structure</dt>
                      <dd className="mt-1 text-sm text-charcoal/80">{project.data.structure}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wide text-text-secondary">Limitations</dt>
                      <dd className="mt-1 text-sm text-charcoal/80">{project.data.limitations}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wide text-text-secondary">Assumptions</dt>
                      <dd className="mt-1 text-sm text-charcoal/80">{project.data.assumptions}</dd>
                    </div>
                  </dl>
                </DetailSection>
              )}

              {project.method && project.method.length > 0 && (
                <DetailSection title="Method">
                  <ol className="flex flex-wrap gap-2">
                    {project.method.map((step, i) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="rounded border border-border px-3 py-1.5 text-xs font-medium text-charcoal">
                          {step}
                        </span>
                        {i < project.method!.length - 1 && <span className="text-text-secondary">&rarr;</span>}
                      </li>
                    ))}
                  </ol>
                </DetailSection>
              )}

              {project.keyFindings && project.keyFindings.length > 0 && (
                <DetailSection title="Key Findings">
                  <ul className="space-y-3">
                    {project.keyFindings.map((finding) => (
                      <li key={finding} className="border-l-2 border-teal pl-4 font-serif text-sm leading-relaxed text-charcoal/80">
                        {finding}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}

              {project.recommendations && project.recommendations.length > 0 && (
                <DetailSection title="Recommendations">
                  <ul className="space-y-2">
                    {project.recommendations.map((rec) => (
                      <li key={rec} className="flex gap-3 font-serif text-sm leading-relaxed text-charcoal/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellow-dark" aria-hidden="true" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}

              {project.reflection && (
                <DetailSection title="Reflection">
                  <p className="font-serif text-sm leading-relaxed text-charcoal/80">{project.reflection}</p>
                </DetailSection>
              )}
            </div>

            <aside className="space-y-8">
              {project.tools.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">Tools</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li key={tool} className="rounded border border-border px-2.5 py-1 text-xs text-charcoal">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.artifacts && project.artifacts.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">Artifacts</p>
                  <ul className="mt-3 space-y-2">
                    {project.artifacts.map((artifact) => (
                      <li key={artifact.url}>
                        <a
                          href={artifact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-teal-text hover:text-charcoal"
                        >
                          {artifact.label} &rarr;
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  )
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-charcoal">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
