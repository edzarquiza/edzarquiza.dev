import PageHeader from '../components/PageHeader'
import BackToProjectsFloat from '../components/BackToProjectsFloat'
import Button from '../components/Button'
import StatStrip from '../components/StatStrip'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { projects, categoryLabels } from '../data/projects'

const glance = [
  { label: 'Type', value: 'Analytical data platform, built around a live operational app' },
  { label: 'Role', value: 'Solo data/BI engineer' },
  { label: 'Stack', value: 'Microsoft Fabric · PySpark · Power BI · DAX' },
  { label: 'Architecture', value: 'Bronze / Silver / Gold, Data Factory to Direct Lake' },
  { label: 'Source system', value: 'FlowOps (PostgreSQL / Neon)' },
  { label: 'Consumption', value: 'Three-page Power BI report, Direct Lake semantic model' },
]

const platformFlow = ['FlowOps App', 'PostgreSQL / Neon', 'Microsoft Fabric', 'Direct Lake Semantic Model', 'Power BI']

const pipelineStages = [
  'Fabric Data Factory (Ingest)',
  'Bronze Lakehouse',
  'Data Quality Validation',
  'Silver Lakehouse (Transform)',
  'Gold Warehouse (Refresh)',
]

const watermarkTable = [
  { table: 'tickets', watermark: 'updated_at', mergeKey: 'id', method: 'Merge' },
  { table: 'ticket_events', watermark: 'id', mergeKey: 'id', method: 'Merge' },
  { table: 'ticket_comments', watermark: 'id', mergeKey: 'id', method: 'Merge' },
]

const ingestionValidation = [
  { stage: 'Initial load', tickets: '635', events: '3,382', comments: '1,105' },
  { stage: 'No-change run', tickets: '0', events: '0', comments: '0' },
  { stage: 'Controlled update', tickets: '1 detected', events: '4 detected', comments: 'not tracked' },
]

const lakehouseLayers = [
  { name: 'Bronze', detail: 'LH_FlowOps_Bronze lands data close to its source shape, before any interpretation is applied.' },
  {
    name: 'Silver',
    detail:
      'LH_FlowOps_Silver is where NB_FlowOps_Transform (PySpark) reshapes it into dimension/fact tables: dim_ticket, dim_user, dim_team, dim_category, dim_project, dim_organization, dim_date, fact_ticket_events.',
  },
  {
    name: 'Gold',
    detail:
      'WH_FlowOps_Analytics is the curated Warehouse that dbo.usp_RefreshFlowOpsGold populates from Silver: the dimensional model Power BI actually queries through.',
  },
]

const dataQualityChecks = [
  { category: 'Completeness', checks: '8', covers: 'Required ticket fields are populated' },
  { category: 'Uniqueness', checks: '2', covers: 'Ticket ID, ticket reference' },
  { category: 'Domain', checks: '3', covers: 'Valid status, priority, work type' },
  { category: 'Temporal', checks: '1', covers: 'updated_at >= created_at' },
  { category: 'Referential Integrity', checks: '5', covers: 'team_id, project_id, category_id, assignee_id, requester_id all resolve' },
]

const measures = [
  'Total Tickets',
  'Open Tickets',
  'SLA Compliance %',
  'Overdue Tickets',
  'Reopen Rate %',
  'Average Resolution Hours',
  'Assignment Changes',
  'Average Events per Ticket',
]

const reportPages = [
  {
    title: 'Operations Overview',
    question: 'What’s the overall state of the queue?',
    detail:
      'High-level ticket volume, status distribution, SLA compliance, and team-by-team comparison, filterable by date range, team, status, priority, and category.',
  },
  {
    title: 'Team Performance',
    question: 'Where is operational pressure concentrated?',
    detail:
      'Overdue work, reopen activity, assignment changes, and priority distribution, broken down by team: the view a team lead would use to see where load and risk are building up.',
  },
  {
    title: 'Ticket Details',
    question: 'What does the work actually look like, ticket by ticket?',
    detail:
      'Granular analysis by work type, resolution time, SLA compliance by category, and assignment activity, plus a detail table for drilling into individual tickets.',
  },
]

const engineeringDecisions = [
  {
    decision: 'Incremental ingestion over full reload',
    reason: 'FlowOps’ ticket data keeps changing after creation (status, assignment, comments); watermarking reflects that instead of pretending the source is static.',
  },
  {
    decision: 'Bronze / Silver / Gold separation',
    reason: 'Keeps "what we ingested" (Bronze), "what we transformed" (Silver), and "what we serve" (Gold) as distinct, independently reasoned-about stages.',
  },
  {
    decision: 'Data Quality runs before Silver, not after',
    reason: 'Catching structural/referential problems before they propagate into analytical tables is cheaper than catching them in a Power BI visual.',
  },
  {
    decision: 'Gold served from a Fabric Warehouse',
    reason: 'Gives the semantic model a stable, dimensional, T-SQL-queryable surface rather than modeling directly against Lakehouse files.',
  },
  {
    decision: 'Direct Lake for the semantic model',
    reason: 'Power BI reads the Warehouse’s OneLake data directly, with no separate import/refresh copy of the analytical data to keep in sync.',
  },
]

const futureEnhancements = [
  {
    title: 'Historical data-quality trend reporting',
    detail: 'The current implementation validates each run but doesn’t retain run-over-run history yet.',
  },
  {
    title: 'Additional analytical dimensions',
    detail: 'SLA configuration history and sprint/backlog analytics are natural next dimensions, not yet modeled.',
  },
  {
    title: 'Expanded Fabric governance',
    detail: 'Sensitivity labels and deployment pipelines are future scope, not part of the current platform.',
  },
  {
    title: 'Deployment / CI automation for the Fabric artifacts',
    detail: 'The pipeline runs on-demand today; automating its own deployment is a future step.',
  },
  {
    title: 'AI-assisted ticket intelligence',
    detail: 'A natural next idea for this kind of platform, but not implemented here and not a claim about the current build.',
  },
]

function FlowChips({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded border border-border px-3 py-1.5 text-xs font-medium text-charcoal">{step}</span>
          {i < steps.length - 1 && (
            <span className="text-text-secondary" aria-hidden="true">
              &rarr;
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

export default function FlowOpsFabric() {
  const project = projects.find((p) => p.slug === 'flowops-fabric')!
  const [architecture, operations, teamPerformance, ticketDetails, pipelineRun, silverLakehouse, semanticModel, workspace] =
    project.dashboardImages ?? []

  return (
    <>
      <BackToProjectsFloat />
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="How has the team performed, not just what needs attention right now?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          FlowOps answers what needs attention right now. This platform answers the other question: an end-to-end
          Microsoft Fabric analytical data platform built around FlowOps&rsquo; real operational data, not a
          synthetic dataset built for the occasion.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-content px-6 py-14">
        <ul className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li key={tool} className="rounded border border-border px-2.5 py-1 text-xs text-text-secondary">
              {tool}
            </li>
          ))}
        </ul>

        {architecture && (
          <div className="mt-8 overflow-hidden border border-border">
            <img src={architecture.src} alt={architecture.label} className="w-full" />
          </div>
        )}

        {project.keyResults && (
          <div className="mt-8">
            <StatStrip stats={project.keyResults} />
          </div>
        )}

        {/* AT A GLANCE */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Platform at a Glance</Eyebrow>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {glance.map((item) => (
                <div key={item.label} className="border border-border bg-surface p-4">
                  <dt className="font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{item.label}</dt>
                  <dd className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* THE PROBLEM */}
        <Reveal>
          <section className="mt-16 max-w-2xl">
            <Eyebrow>Why This Project</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
              A different question than the one FlowOps itself answers.
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
              FlowOps already demonstrates full-stack product engineering: a modular monolith, a deterministic
              attention engine, 1,373 tests, a live deployment. This project demonstrates a complementary skill:
              taking an existing operational system&rsquo;s data and building a governed analytical platform around
              it, ingestion, validation, transformation, dimensional modeling, and semantic serving, the same
              lifecycle a real BI/data engineering role would ask for.
            </p>
            <FlowChips steps={platformFlow} />
          </section>
        </Reveal>

        {/* PIPELINE FLOW */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Pipeline Flow</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Four stages, each gated on the previous one succeeding.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            The Fabric pipeline <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">PL_FlowOps_Ingestion</code> orchestrates
            ingestion, validation, transformation, and the Gold refresh in sequence.
          </p>
          <FlowChips steps={pipelineStages} />
          {pipelineRun && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={pipelineRun.src} alt={pipelineRun.label} className="w-full" />
            </div>
          )}
          <p className="mt-4 font-serif text-xs leading-relaxed text-text-secondary">
            A captured successful run: all four activities succeeded, in sequence, in just under seven and a half
            minutes. That duration is what one successful run measured, not a benchmark, an SLA, or an average.
          </p>
        </section>

        {/* INCREMENTAL INGESTION */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Incremental Ingestion</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Validated as a three-step test, not just configured and assumed to work.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              FlowOps&rsquo; transactional data changes continuously after creation: a ticket gets reassigned, a
              comment gets added, a status changes. <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">CopyJob_FlowOps_Incremental</code> uses
              watermark-based change detection instead of treating every run as a full reload.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Table</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Watermark</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Merge Key</th>
                    <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Write Method</th>
                  </tr>
                </thead>
                <tbody>
                  {watermarkTable.map((row) => (
                    <tr key={row.table} className="border-b border-border">
                      <td className="py-3 pr-4 font-mono text-xs text-charcoal">{row.table}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-charcoal/80">{row.watermark}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-charcoal/80">{row.mergeKey}</td>
                      <td className="py-3 font-serif text-charcoal/80">{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Test Stage</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Tickets</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Ticket Events</th>
                    <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {ingestionValidation.map((row) => (
                    <tr key={row.stage} className="border-b border-border">
                      <td className="py-3 pr-4 font-display font-bold text-charcoal">{row.stage}</td>
                      <td className="py-3 pr-4 font-serif text-charcoal/80">{row.tickets}</td>
                      <td className="py-3 pr-4 font-serif text-charcoal/80">{row.events}</td>
                      <td className="py-3 font-serif text-charcoal/80">{row.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-serif text-xs leading-relaxed text-text-secondary">
              This is incremental batch ingestion, not real-time or streaming. The point of the test was proving the
              pipeline reacts correctly to a real change, not proving throughput at scale.
            </p>
          </section>
        </Reveal>

        {/* BRONZE / SILVER / GOLD */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Bronze &rarr; Silver &rarr; Gold</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Three independently reasoned-about stages, not one copy of the source.
          </h2>
          <ol className="mt-6 space-y-2">
            {lakehouseLayers.map((layer, i) => (
              <li key={layer.name}>
                <div className="border border-border bg-surface p-4">
                  <p className="font-display text-sm font-bold text-charcoal">{layer.name}</p>
                  <p className="mt-1 font-serif text-xs leading-relaxed text-charcoal/80">{layer.detail}</p>
                </div>
                {i < lakehouseLayers.length - 1 && (
                  <div className="flex justify-center py-1 text-text-secondary" aria-hidden="true">
                    &darr;
                  </div>
                )}
              </li>
            ))}
          </ol>
          {silverLakehouse && (
            <div className="mt-8">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{silverLakehouse.label}</p>
              <div className="overflow-hidden border border-border">
                <img src={silverLakehouse.src} alt={silverLakehouse.label} className="w-full" />
              </div>
            </div>
          )}
        </section>

        {/* DATA QUALITY */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Data Quality</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Validation runs before the data is allowed to reach Silver, not after.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-4xl font-bold text-charcoal">19 checks, 0 issues, PASS</p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Category</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Checks</th>
                    <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Covers</th>
                  </tr>
                </thead>
                <tbody>
                  {dataQualityChecks.map((row) => (
                    <tr key={row.category} className="border-b border-border">
                      <td className="py-3 pr-4 font-display font-bold text-charcoal">{row.category}</td>
                      <td className="py-3 pr-4 font-serif text-charcoal/80">{row.checks}</td>
                      <td className="py-3 font-serif text-charcoal/80">{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-serif text-xs leading-relaxed text-text-secondary">
              Results are persisted to LH_FlowOps_Silver.dbo.dq_results, not just printed to a notebook cell and
              discarded.
            </p>
          </section>
        </Reveal>

        {/* SEMANTIC MODEL */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Semantic Model &amp; Measures</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Direct Lake on OneLake: Power BI reads the Warehouse directly.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            SM_FlowOps_Analytics runs in Direct Lake on OneLake: Power BI queries the Gold Warehouse&rsquo;s parquet
            files directly through the semantic layer, without a separate import/refresh copy of the data. The model
            carries reusable DAX measures so report authors work with named business concepts instead of one-off
            visual-level calculations.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {measures.map((measure) => (
              <li key={measure} className="rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-charcoal">
                {measure}
              </li>
            ))}
          </ul>
          {semanticModel && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={semanticModel.src} alt={semanticModel.label} className="w-full" />
            </div>
          )}
        </section>

        {/* POWER BI ANALYTICS */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Power BI Analytics</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Three pages, each answering a different operational question.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              FlowOps Operations Analytics is the final consumption layer, built against the semantic model rather
              than a direct PostgreSQL connection.
            </p>
            <div className="mt-10 space-y-12">
              {[operations, teamPerformance, ticketDetails].map((image, i) => (
                image && (
                  <div key={image.label}>
                    <p className="font-display text-base font-bold text-charcoal">
                      {reportPages[i].title}
                      <span className="ml-2 font-serif text-sm font-normal italic text-text-secondary">
                        &ldquo;{reportPages[i].question}&rdquo;
                      </span>
                    </p>
                    <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">{reportPages[i].detail}</p>
                    <div className="mt-4 overflow-hidden border border-border">
                      <img src={image.src} alt={image.label} className="w-full" />
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        </Reveal>

        {/* ENGINEERING DECISIONS */}
        <section className="mt-16">
          <Eyebrow>Engineering Decisions</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">Choices made, and why.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Decision</th>
                  <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Reason</th>
                </tr>
              </thead>
              <tbody>
                {engineeringDecisions.map((row) => (
                  <tr key={row.decision} className="border-b border-border align-top">
                    <td className="py-3 pr-4 font-display font-bold text-charcoal">{row.decision}</td>
                    <td className="py-3 font-serif text-charcoal/80">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FUTURE ENHANCEMENTS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Future Enhancements</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Explicitly not implemented, not part of the current platform.</h2>
          <div className="mt-6 divide-y divide-border border border-border">
            {futureEnhancements.map((item) => (
              <details key={item.title} className="group p-4">
                <summary className="cursor-pointer list-none font-display text-sm font-bold text-charcoal marker:content-none">
                  <span className="mr-2 inline-block text-teal-text transition-transform group-open:rotate-90" aria-hidden="true">
                    &rarr;
                  </span>
                  {item.title}
                </summary>
                <p className="mt-3 font-serif text-xs leading-relaxed text-charcoal/80">{item.detail}</p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED PROJECT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Related Project</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            The operational application this platform is built around.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            FlowOps is a separate, deployed project: a modular-monolith ASP.NET Core service-desk platform with a
            deterministic attention engine, 1,373 tests, and a live deployment.
          </p>
          {workspace && (
            <div className="mt-8">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{workspace.label}</p>
              <div className="overflow-hidden border border-border">
                <img src={workspace.src} alt={workspace.label} className="w-full" />
              </div>
            </div>
          )}
          <div className="mt-6">
            <Button to="/work/flowops" variant="secondary">
              View the FlowOps Case Study
            </Button>
          </div>
        </section>

        {/* FINAL CTA */}
        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">See the platform, or the app it&rsquo;s built around.</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              This repository documents and presents the analytical platform. FlowOps itself is live, tested, and
              open source.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.artifacts.map((artifact, i) => (
                <Button
                  key={artifact.url}
                  href={artifact.url}
                  variant={i === 0 ? 'primary' : 'secondary'}
                  icon={<span aria-hidden="true">&#8599;</span>}
                >
                  {artifact.label}
                </Button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 max-w-2xl border-t border-border pt-10">
          <h2 className="font-display text-xl font-bold text-charcoal">Tools</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li key={tool} className="rounded border border-border px-3 py-1.5 text-xs text-charcoal">
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
