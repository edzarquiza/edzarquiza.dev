import PageHeader from '../components/PageHeader'
import BackToProjectsFloat from '../components/BackToProjectsFloat'
import Button from '../components/Button'
import StatStrip from '../components/StatStrip'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { projects, categoryLabels } from '../data/projects'

const goldTables = [
  'dim_customer',
  'dim_plan',
  'fact_subscription',
  'fact_invoice',
  'fact_subscription_event',
  'customer_revenue',
  'subscription_revenue',
]

const engineeringDecisions = [
  {
    title: 'Read-only extraction boundary',
    detail: 'Databricks never writes to Postgres. The platform cannot affect the operational system it reads from.',
  },
  {
    title: 'Watermark-only-advances-on-success',
    detail: 'A failed Bronze write leaves the watermark untouched, so the next run safely reprocesses the same window instead of silently losing data.',
  },
  {
    title: 'Gold as the sole BI consumption boundary',
    detail: 'One governed contract. Neither Databricks AI/BI nor ThoughtSpot ever reads Bronze, Silver, or Postgres directly.',
  },
  {
    title: 'ThoughtSpot on Gold, not a separate extract',
    detail: 'Proves the same governed model can serve a second, structurally different BI tool without duplicating the pipeline.',
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

export default function Veydrin() {
  const project = projects.find((p) => p.slug === 'veydrin')!
  const [
    architecture,
    reliabilityFlow,
    medallion,
    goldModel,
    consumptionArchitecture,
    aibiDashboard,
    thoughtspotModel,
    thoughtspotSearch,
    appDashboard,
  ] = project.dashboardImages ?? []

  return (
    <>
      <BackToProjectsFloat />
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="A lakehouse data platform built around a real operational SaaS application."
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          Veydrin's SaaS app runs the business. This project is the data platform built on top of
          it: incremental ingestion, a Bronze/Silver/Gold lakehouse, and one governed Gold model
          serving two different BI tools.
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

        {/* WHY THIS PROJECT */}
        <Reveal>
          <section className="mt-16 max-w-2xl">
            <Eyebrow>Why This Project</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
              Running the business and analyzing it are two different jobs.
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
            <FlowChips steps={project.method ?? []} />
          </section>
        </Reveal>

        {/* THE PIPELINE */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>The Pipeline</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Incremental by watermark, safe to rerun by design.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              Databricks reaches PostgreSQL read-only through Unity Catalog federation, no separate ETL connector.
              Every run extracts a bounded window per table: a 15-minute lookback catches late-arriving writes, and
              a 2-minute safety lag avoids reading a row mid-transaction.
            </p>
            {reliabilityFlow && (
              <div className="mt-8 overflow-hidden border border-border">
                <img src={reliabilityFlow.src} alt={reliabilityFlow.label} className="w-full" />
              </div>
            )}
            <p className="mt-8 max-w-2xl font-serif text-lg font-medium leading-relaxed text-charcoal">
              The watermark only advances after Bronze writes succeed. A failed run leaves it untouched, so the
              next run safely reprocesses the same window instead of silently losing data.
            </p>
          </section>
        </Reveal>

        {/* MEDALLION & GOLD MODEL */}
        <section className="mt-16">
          <Eyebrow>Medallion Architecture &amp; Gold Model</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Bronze is raw. Silver is current-state. Gold is what gets consumed.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Bronze lands data append-only, in its source shape. Silver deduplicates and conforms it into
            current-state tables via MERGE. Gold curates it into a dimensional model: two dimensions, three
            facts, and two business-facing revenue views, covering the subscription and billing domain.
          </p>
          {medallion && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={medallion.src} alt={medallion.label} className="w-full" />
            </div>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {goldTables.map((table) => (
              <li key={table} className="rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-charcoal">
                {table}
              </li>
            ))}
          </ul>
          {goldModel && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={goldModel.src} alt={goldModel.label} className="w-full" />
            </div>
          )}
        </section>

        {/* TWO BI CONSUMERS */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Two BI Consumers, One Gold Model</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Governed dashboards and self-service search, from the same curated data.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              Gold is the only interface either tool sees. Databricks AI/BI serves executive and operational
              dashboards; ThoughtSpot serves self-service, natural-language search, built directly on the Gold{' '}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">subscription_revenue</code> table.
              Same governed data, two structurally different consumption patterns, no duplicated pipeline.
            </p>
            {consumptionArchitecture && (
              <div className="mt-8 overflow-hidden border border-border">
                <img src={consumptionArchitecture.src} alt={consumptionArchitecture.label} className="w-full" />
              </div>
            )}
            <div className="mt-10 space-y-12">
              {aibiDashboard && (
                <div>
                  <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{aibiDashboard.label}</p>
                  <div className="overflow-hidden border border-border">
                    <img src={aibiDashboard.src} alt={aibiDashboard.label} className="w-full" />
                  </div>
                </div>
              )}
              {thoughtspotModel && (
                <div>
                  <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{thoughtspotModel.label}</p>
                  <div className="overflow-hidden border border-border">
                    <img src={thoughtspotModel.src} alt={thoughtspotModel.label} className="w-full" />
                  </div>
                </div>
              )}
              {thoughtspotSearch && (
                <div className="max-w-xl">
                  <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{thoughtspotSearch.label}</p>
                  <div className="overflow-hidden border border-border">
                    <img src={thoughtspotSearch.src} alt={thoughtspotSearch.label} className="w-full" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </Reveal>

        {/* THE OPERATIONAL APP */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Operational App</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            The real source system behind the pipeline, not the focus of this project.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Veydrin's operational app (React + ASP.NET Core, on PostgreSQL) manages customers, plans,
            subscriptions, invoices, payments, and support tickets. Its only job here is to produce a real,
            evolving transactional workload, the kind of source system that makes this a genuine pipeline
            rather than a synthetic-dataset demo.
          </p>
          {appDashboard && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={appDashboard.src} alt={appDashboard.label} className="w-full" />
            </div>
          )}
        </section>

        {/* ENGINEERING DECISIONS */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Engineering Decisions</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">A few choices worth calling out.</h2>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {engineeringDecisions.map((item) => (
                <div key={item.title} className="border border-border bg-surface p-4">
                  <dt className="font-display text-sm font-bold text-charcoal">{item.title}</dt>
                  <dd className="mt-2 font-serif text-xs leading-relaxed text-charcoal/80">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* SCOPE & LIMITATIONS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Scope &amp; Limitations</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Portfolio-scale, and deliberately so.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.reflection}</p>
        </section>

        {/* FINAL CTA */}
        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Read the full technical write-up.</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The GitHub README covers the full pipeline, the data model, and every engineering decision in more
              depth than fits here.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.artifacts.map((artifact) => (
                <Button key={artifact.url} href={artifact.url} variant="primary" icon={<span aria-hidden="true">&#8599;</span>}>
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
