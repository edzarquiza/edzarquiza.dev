import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import SelectedDax, { type DaxMeasure } from '../components/SelectedDax'
import PresentationViewer from '../components/PresentationViewer'
import { projects, categoryLabels } from '../data/projects'

const detailTools = ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Data Analysis']

const questions = [
  {
    title: 'Are we meeting service expectations?',
    detail: 'How effectively are incidents meeting SLA, and where is performance under pressure?',
  },
  {
    title: 'Where is resolution becoming inefficient?',
    detail: 'Are a smaller number of long-running incidents distorting the overall resolution picture?',
  },
  {
    title: 'Where is operational effort concentrated?',
    detail: 'Which priorities, categories, and assignment groups deserve closer investigation?',
  },
]

const majorCategories = [
  { name: 'Identity & Authentication', volume: '~3.6K' },
  { name: 'Software Support', volume: '~3.3K' },
  { name: 'Access & Permissions', volume: '~2.7K' },
  { name: 'Database Services', volume: '~2.4K' },
]

const leadingSubcategories = [
  'Password & Account Issues',
  'System Performance',
  'Login & Authentication',
  'Software Installation',
  'Email Issues',
]

const analyticalFramework = [
  { area: 'Workload', metrics: ['Incident volume', 'Category', 'Subcategory', 'Priority'] },
  { area: 'SLA Performance', metrics: ['SLA success', 'Missed SLA'] },
  { area: 'Resolution', metrics: ['Mean', 'Median', 'Resolution-time bands'] },
  { area: 'Operational Activity', metrics: ['Reassignment', 'Reopened incidents'] },
  { area: 'Group Performance', metrics: ['SLA', 'Resolution time', 'Incident volume'] },
]

const incidentDaxMeasures: DaxMeasure[] = [
  {
    name: 'Incident Volume',
    formula: `Incident Volume =
COUNTROWS(Incidents)`,
    explanation:
      'Counts incident records within the current filter context, the foundation the workload analysis builds from.',
  },
  {
    name: 'Reassignment Rate',
    formula: `Reassignment Rate =
VAR TotalIncidents =
    COUNTROWS(Incidents)

VAR ReassignedIncidents =
    CALCULATE(
        COUNTROWS(Incidents),
        FILTER(
            Incidents,
            COALESCE(Incidents[reassignment_count], 0) > 0
        )
    )

RETURN
    DIVIDE(
        ReassignedIncidents,
        TotalIncidents
    )`,
    explanation:
      'Uses FILTER() and CALCULATE() to isolate incidents with at least one reassignment, then DIVIDE() against total volume.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

export default function IncidentPerformanceAnalysis() {
  const project = projects.find((p) => p.slug === 'incident-performance-operational-analysis')!
  const [commandCenter, servicePerformance, workloadAnalysis] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="Where is the IT operation under pressure, and where should management focus first?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          This analysis uses incident-level IT service data to examine SLA performance, resolution efficiency,
          workload concentration, and operational friction.
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

        {/* THE QUESTION */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Question</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">What did I want to understand?</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Incident volume alone doesn&rsquo;t tell management where the real operational pressure is.
          </p>
          <ol className="mt-6 space-y-5">
            {questions.map((q, i) => (
              <li key={q.title} className="flex gap-4">
                <span className="font-mono text-sm font-extrabold text-teal-text">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-display text-base font-bold text-charcoal">{q.title}</p>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-text-secondary">{q.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 01 — THE OVERALL PICTURE */}
        <section className="mt-16">
          <Eyebrow>01 — The Overall Picture</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            First, I looked at the scale of the operation.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The organization processed 24,918 incidents during the analyzed period. 63.42% met SLA, leaving
            36.58% outside the defined SLA target.
          </p>

          {commandCenter && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={commandCenter.src} alt={commandCenter.label} className="w-full" />
            </div>
          )}

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The operation handled a substantial workload, but overall SLA performance remained below the 70%
            target.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            That raised a more important question: was the problem simply volume, or were particular operational
            patterns driving the pressure?
          </p>
        </section>

        {/* 02 — THE SERVICE PERFORMANCE STORY */}
        <section className="mt-16">
          <Eyebrow>02 — The Service Performance Story</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            The average resolution time hid something important.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Mean resolution time was 178.17 hours, while the median was only 22.10 hours.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-2xl font-extrabold text-charcoal">178.17 hrs</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">Mean</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-2xl font-extrabold text-yellow-dark">22.10 hrs</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">Median</dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The gap indicates that a smaller number of long-running incidents materially influence the average.
            Looking only at the mean would therefore give an incomplete picture of the typical incident.
          </p>

          {servicePerformance && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={servicePerformance.src} alt={servicePerformance.label} className="w-full" />
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">63.42%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">SLA success</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">36.58%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Missed SLA</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">45.63%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Reassignment rate</dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Performance also varied substantially by priority and assignment group. The High and Critical
            priority results were particularly unusual and were validated against the underlying data rather
            than dismissed as calculation errors.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The assignment-group SLA vs. resolution matrix adds another layer of context by considering SLA
            performance, resolution speed, and incident volume together.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Service performance was therefore not a single-KPI problem.
          </p>
        </section>

        {/* 03 — WHERE THE WORKLOAD COMES FROM */}
        <section className="mt-16">
          <Eyebrow>03 — Where the Workload Comes From</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            The next question was where the demand was concentrated.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Incident volume was not evenly distributed. A relatively small number of categories accounted for a
            substantial share of workload.
          </p>

          {workloadAnalysis && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={workloadAnalysis.src} alt={workloadAnalysis.label} className="w-full" />
            </div>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {majorCategories.map((cat) => (
              <div key={cat.name} className="border border-border bg-surface p-4">
                <dt className="font-display text-xl font-extrabold text-charcoal">{cat.volume}</dt>
                <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">{cat.name}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            These high-volume categories represent potential areas where targeted prevention, self-service,
            documentation, or process improvements could affect a meaningful portion of total demand.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The leading subcategories included {leadingSubcategories.join(', ')}.
          </p>
        </section>

        {/* THE OPERATIONAL SIGNAL */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Operational Signal</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Nearly half of incidents involved reassignment.
          </h2>
          <p className="mt-6 font-display text-3xl font-extrabold text-yellow-dark">45.63%</p>
          <p className="mt-3 font-mono text-xs text-text-secondary">
            An incident was classified as reassigned when reassignment_count &gt; 0.
          </p>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            High reassignment does not prove poor service or identify a root cause, but it is a useful signal for
            investigating routing, ownership, escalation, and skill alignment.
          </p>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            The analysis applied a minimum incident-volume threshold when identifying groups with high
            reassignment rates, so very small groups did not dominate the analysis with unstable percentages.
          </p>
        </section>

        {/* RECOMMENDATIONS */}
        {project.recommendations && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>So, what should management do?</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">From operational signals to priorities.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { title: 'Investigate SLA performance', detail: project.recommendations[0] },
                { title: 'Review High & Critical incidents', detail: project.recommendations[1] },
                { title: 'Investigate reassignment patterns', detail: project.recommendations[2] },
                { title: 'Target high-volume categories', detail: project.recommendations[3] },
                { title: 'Address long-running incidents', detail: project.recommendations[4] },
              ].map((rec, i) => (
                <li key={rec.title} className="flex gap-4">
                  <span className="font-mono text-sm font-extrabold text-teal-text">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-display text-base font-bold text-charcoal">{rec.title}</p>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-text-secondary">{rec.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
              The goal is not simply to reduce incident volume or improve one KPI. It is to identify where
              operational effort can produce the greatest improvement.
            </p>
          </section>
        )}

        {/* A LOOK UNDER THE HOOD */}
        <section className="mt-16">
          <Eyebrow>A Look Under the Hood</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">How the analysis was built.</h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The dashboard combines incident-level data, dimensional modeling, and reusable DAX measures to
            evaluate workload, SLA performance, resolution efficiency, and operational activity.
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {analyticalFramework.map((area) => (
              <div key={area.area} className="border border-border bg-surface p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{area.area}</dt>
                <dd className="mt-2 space-y-1 font-serif text-xs leading-relaxed text-charcoal/80">
                  {area.metrics.map((metric) => (
                    <p key={metric}>{metric}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* SELECTED DAX */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Selected DAX</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">A few measures behind the analysis.</h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-text-secondary">
            The two measures with documented, exact formulas: Incident Volume and Reassignment Rate.
          </p>
          <div className="mt-6">
            <SelectedDax measures={incidentDaxMeasures} />
          </div>
        </section>

        {project.reflection && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>Reflection</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Limitations and what&rsquo;s next.</h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.reflection}</p>
          </section>
        )}

        {project.presentation && (
          <section className="mt-16">
            <Eyebrow>Presentation</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              From analysis to stakeholder communication.
            </h2>
            <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-text-secondary">
              A concise presentation of the business problem, analytical approach, key findings, and
              recommendations.
            </p>
            <div className="mt-6">
              <PresentationViewer {...project.presentation} />
            </div>
          </section>
        )}

        {project.pdfUrl && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Want to see the complete analysis?</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The full case study documents the business questions, data preparation, modeling, DAX, validation,
              dashboard analysis, recommendations, limitations, and assumptions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={project.pdfUrl} icon={<span aria-hidden="true">&rarr;</span>}>
                Read / Download Full Case Study
              </Button>
              {project.artifacts?.map((artifact) => (
                <Button
                  key={artifact.url}
                  href={artifact.url}
                  variant="secondary"
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
            {detailTools.map((tool) => (
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
