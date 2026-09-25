import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import { projects, categoryLabels } from '../data/projects'

const glance = [
  { label: 'Type', value: 'IT service-desk / operations platform' },
  { label: 'Role', value: 'Solo designer & developer' },
  { label: 'Stack', value: '.NET 10 · ASP.NET Core · PostgreSQL · EF Core' },
  { label: 'Architecture', value: 'Modular monolith, 4 layers' },
  { label: 'Testing', value: '1,373 automated tests, 4 layers' },
  { label: 'Deployment', value: 'Docker on Render, Neon PostgreSQL' },
  { label: 'Key capability', value: 'Deterministic, explainable Attention engine' },
]

const ideaFlow = ['Work', 'Workflow', 'Intelligence', 'Action']

const engineeringFlow = ['AttentionPolicy', 'Evaluate', 'Signals', 'Ranking', 'Explainable Brief']

const attentionSignals = [
  'SlaBreached',
  'SlaAtRisk',
  'Overdue',
  'UnassignedUrgent',
  'Aging',
  'Stalled',
  'Churn',
  'Reopened',
]

const realProductAreas = [
  {
    name: 'Multi-tenancy',
    detail: 'A user’s role is scoped per organization, not global — the same person can hold a different role in a different organization.',
  },
  {
    name: 'Authorization',
    detail: 'Four roles (Admin / Manager / Agent / Viewer), enforced at two layers: a page decides what to render, a service independently decides what it will allow.',
  },
  {
    name: 'SLA model',
    detail: 'Deadlines are derived on read, not pre-computed. A ticket going Pending pauses its SLA clock; time spent waiting outside the team never counts against it.',
  },
  {
    name: 'Projects & sprints',
    detail: 'Weekly sprints and a drag-and-drop board, backed by server-authorized moves — nothing is applied optimistically.',
  },
  {
    name: 'Team Workload',
    detail: 'Where open work is concentrated across teams, and how much of it is at risk, unassigned, or overdue.',
  },
]

const architectureLayers = [
  { name: 'Web', detail: 'Razor Pages — PageModels bind input, call Application, render a view model.' },
  { name: 'Application', detail: 'Queries & services — business workflows, authorization checks, DTOs.' },
  { name: 'Infrastructure', detail: 'EF Core / PostgreSQL — the single DbContext, migrations, identity.' },
  { name: 'Domain', detail: 'Rules & aggregates — the Ticket aggregate root, policies, invariants, no outward dependencies.' },
]

const nonDecisions = [
  {
    title: 'Microservices',
    detail: 'One team, one deploy target, no independent scaling need — splitting would add network calls and operational overhead to solve a problem that doesn’t exist at this scale.',
  },
  {
    title: 'A repository / unit-of-work abstraction',
    detail: 'Application references Infrastructure directly. That indirection would buy testability EF Core’s own InMemory/Testcontainers support already provides, at the cost of a parallel abstraction to maintain.',
  },
  {
    title: 'CQRS / MediatR',
    detail: 'Not introduced — the application layer’s services and DTOs already give a clear read/write separation without a mediator pipeline to maintain.',
  },
  {
    title: 'A background scheduler for SLAs',
    detail: 'SLA deadlines are derived on read from a ticket’s current state. Correctness doesn’t depend on a job having run recently — it’s always accurate the instant it’s viewed.',
  },
  {
    title: 'An AI copilot',
    detail: 'The Attention engine is deterministic by design, not because ML was out of reach — an explainable rule a support lead can verify is more useful here than a score they have to trust.',
  },
  {
    title: 'Real-time collaboration infrastructure',
    detail: 'No live multiplayer editing or websocket presence layer — out of scope for the operational workflow this project is about.',
  },
]

const deploymentFlow = ['GitHub repository', 'Docker build', 'Render', 'FlowOps container', 'Neon PostgreSQL']

const testingLayers = [
  { layer: 'Domain', count: '333', proves: 'Aggregate/policy behavior — no database needed' },
  { layer: 'Application', count: '650', proves: 'Service + authorization behavior against real PostgreSQL (Testcontainers)' },
  { layer: 'Web', count: '355', proves: 'Page rendering, authorization boundaries, form behavior' },
  { layer: 'E2E', count: '35', proves: 'Real Chromium browser — actual layout, actual overflow, actual theme application' },
]

const deliberateLimits = [
  'A full Jira replacement',
  'A microservice platform',
  'An AI copilot',
  'A real-time collaboration tool',
  'A staffing/capacity-optimization system',
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

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

export default function FlowOps() {
  const project = projects.find((p) => p.slug === 'flowops')!
  const [dashboard, ticketAttention, teamWorkload, sprintBoard, workQueue] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="What needs attention right now?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          A multi-tenant IT service-desk platform built around a deterministic, explainable Attention engine —
          tested across four layers and deployed as a real ASP.NET Core modular monolith.
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

        {dashboard && (
          <div className="mt-8 overflow-hidden border border-border">
            <img src={dashboard.src} alt={dashboard.label} className="w-full" />
          </div>
        )}

        {/* AT A GLANCE */}
        <section className="mt-16">
          <Eyebrow>FlowOps at a Glance</Eyebrow>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {glance.map((item) => (
              <div key={item.label} className="border border-border bg-surface p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{item.label}</dt>
                <dd className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* THE PROBLEM */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            A full queue doesn&rsquo;t tell you what needs a decision now.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
        </section>

        {/* THE IDEA */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Idea</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Work needs a workflow, a workflow needs intelligence, and intelligence only matters if it leads to action.
          </h2>
          <FlowChips steps={ideaFlow} />
        </section>

        {/* THE DIFFERENTIATOR — ATTENTION */}
        <section className="mt-16">
          <Eyebrow>The Differentiator</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            FlowOps doesn&rsquo;t just say a ticket is at risk. It tells you why.
          </h2>
          {ticketAttention && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={ticketAttention.src} alt={ticketAttention.label} className="w-full" />
            </div>
          )}
          <p className="mt-8 max-w-2xl font-serif text-lg font-medium leading-relaxed text-charcoal">
            Instead of an unexplained &ldquo;at risk&rdquo; flag, a ticket&rsquo;s Explainable Attention Brief shows
            the actual evidence: which signals fired, what changed, and a suggested next step.
          </p>
          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Attention is deterministic (same input, same output, every time), policy-driven (every rule lives in one
            class), read-only (computed on read from existing ticket state, nothing pre-materialized), and not an AI
            model &mdash; no scoring, no training data, no black box. Eight named signals decide whether a ticket
            needs attention:
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {attentionSignals.map((signal) => (
              <li key={signal} className="rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-charcoal">
                {signal}
              </li>
            ))}
          </ul>
        </section>

        {/* THE ENGINEERING BEHIND ATTENTION */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Engineering Behind Attention</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            A SQL prefilter narrows the table. It never gets to redefine the rule.
          </h2>
          <FlowChips steps={engineeringFlow} />
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            An <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">AttentionQueryService</code> runs
            an indexed SQL prefilter to narrow the table to plausible candidates, then hands those candidates to{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">AttentionPolicy.Evaluate</code>, a
            pure, in-memory function that produces the real verdict, ranks the results most-urgent-first, and returns
            them as a DTO the UI renders.
          </p>
          <p className="mt-6 max-w-2xl font-serif text-base font-medium leading-relaxed text-charcoal">
            The SQL prefilter must be a provable superset of every ticket the policy could classify as at-risk
            &mdash; it&rsquo;s allowed to reduce the search space, not redefine the business rule.
          </p>
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            That superset property isn&rsquo;t a comment or a convention — it&rsquo;s enforced by a dedicated
            test that seeds every signal and every non-signal condition and asserts the prefilter never misses one.
          </p>
        </section>

        {/* MAKING IT A REAL PRODUCT */}
        <section className="mt-16">
          <Eyebrow>Making It a Real Product</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Attention sits on top of a full operational platform, not a demo shell.
          </h2>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {realProductAreas.map((area) => (
              <div key={area.name} className="border border-border bg-surface p-4">
                <dt className="font-display text-sm font-bold text-charcoal">{area.name}</dt>
                <dd className="mt-2 font-serif text-xs leading-relaxed text-charcoal/80">{area.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 space-y-12">
            {teamWorkload && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{teamWorkload.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={teamWorkload.src} alt={teamWorkload.label} className="w-full" />
                </div>
              </div>
            )}
            {sprintBoard && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{sprintBoard.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={sprintBoard.src} alt={sprintBoard.label} className="w-full" />
                </div>
              </div>
            )}
            {workQueue && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{workQueue.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={workQueue.src} alt={workQueue.label} className="w-full" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Architecture</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            One deployable. Four layers. Strict, one-directional dependencies.
          </h2>
          <ol className="mt-6 space-y-2">
            {architectureLayers.map((layer, i) => (
              <li key={layer.name}>
                <div className="border border-border bg-surface p-4">
                  <p className="font-display text-sm font-bold text-charcoal">{layer.name}</p>
                  <p className="mt-1 font-serif text-xs leading-relaxed text-charcoal/80">{layer.detail}</p>
                </div>
                {i < architectureLayers.length - 1 && (
                  <div className="flex justify-center py-1 text-text-secondary" aria-hidden="true">
                    &darr;
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            FlowOps is a modular monolith: one deployable with module boundaries kept as a discipline, not a network
            boundary. A deliberate departure from a textbook layered app is that Application references
            Infrastructure directly, with no repository/unit-of-work layer between them &mdash; a choice recorded,
            with its alternatives and trade-offs, across 34 accepted architecture decision records.
          </p>
          <div className="mt-6">
            <Button
              href="https://github.com/edzarquiza/flow-ops/tree/main/docs/adr"
              variant="secondary"
              icon={<span aria-hidden="true">&#8599;</span>}
            >
              Browse the ADRs
            </Button>
          </div>
        </section>

        {/* ENGINEERING JUDGMENT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Engineering Judgment</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Why the Attention engine isn&rsquo;t AI.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            The Attention engine is deterministic by design, not because machine learning was out of reach. An
            explainable rule a support lead can verify line by line is more useful here than a score they have to
            trust. Every signal, every threshold, and every ranking decision lives in one policy class that can be
            read top to bottom &mdash; there is nothing in it that has to be taken on faith.
          </p>
        </section>

        {/* DELIBERATE NON-DECISIONS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Deliberate Non-Decisions</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">What FlowOps chose not to build, and why.</h2>
          <div className="mt-6 divide-y divide-border border border-border">
            {nonDecisions.map((item) => (
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

        {/* TESTING */}
        <section className="mt-16">
          <Eyebrow>Testing & Proof</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            From business rules to real browser workflows.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-4xl font-bold text-charcoal">1,373 tests</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Layer</th>
                  <th className="py-2 pr-4 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">Count</th>
                  <th className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">What it proves</th>
                </tr>
              </thead>
              <tbody>
                {testingLayers.map((row) => (
                  <tr key={row.layer} className="border-b border-border">
                    <td className="py-3 pr-4 font-display font-bold text-charcoal">{row.layer}</td>
                    <td className="py-3 pr-4 font-serif text-charcoal/80">{row.count}</td>
                    <td className="py-3 font-serif text-charcoal/80">{row.proves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Deployment</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Deployed, not just runnable on a laptop.</h2>
          <FlowChips steps={deploymentFlow} />
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            Render is connected directly to the GitHub repository and, on every push to <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">main</code>, builds
            and deploys the image itself from the repo&rsquo;s own multi-stage Dockerfile &mdash; there is no
            separate GitHub Actions deploy step. GitHub Actions does run on every push and PR (restore, build,{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">dotnet format</code> check,
            the full test suite, a dependency vulnerability scan, and a local container build), but it verifies the
            code rather than shipping it. The container runs as a non-root user, exposes{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">/health</code> and{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">/health/ready</code> endpoints
            that gate every deploy, and applies pending EF Core migrations at startup behind an explicit flag rather
            than requiring a manual migration step.
          </p>
        </section>

        {/* THE HARDEST PART */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Hardest Part</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Deciding what &ldquo;at risk&rdquo; means, precisely enough to test.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            The hardest part wasn&rsquo;t the UI or the database schema &mdash; it was drawing the boundary around
            each Attention signal precisely enough that it could be asserted in a test, not just eyeballed on a
            dashboard. An SLA that pauses correctly while a ticket is Pending, a prefilter that&rsquo;s provably a
            superset of the policy it feeds, an authorization rule that can&rsquo;t be bypassed by skipping a
            check on one layer &mdash; each of those meant making a judgment call explicit enough to write down,
            then defending it with a test that would fail if the judgment turned out to be wrong.
          </p>
        </section>

        {/* DELIBERATE LIMITS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Deliberate Limits</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">And I stopped.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            FlowOps intentionally does not attempt to be:
          </p>
          <ul className="mt-4 space-y-2">
            {deliberateLimits.map((limit) => (
              <li key={limit} className="flex items-start gap-2 font-serif text-sm text-charcoal/80">
                <span className="mt-1 text-teal-text" aria-hidden="true">&mdash;</span>
                {limit}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            These aren&rsquo;t gaps to be filled later so much as scope decisions: the project prioritizes
            operational workflow, authorization, deterministic intelligence, explainability, testing, and an actual
            deployment over feature breadth.
          </p>
        </section>

        {/* FINAL CTA */}
        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">See it running, or read the code.</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              FlowOps is live, tested, and fully open source &mdash; the deployed demo, the repository, and the
              architecture documentation behind it.
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
