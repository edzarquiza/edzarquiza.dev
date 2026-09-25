import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import SelectedDax, { type DaxMeasure } from '../components/SelectedDax'
import PresentationViewer from '../components/PresentationViewer'
import { projects, categoryLabels } from '../data/projects'

const detailTools = ['Tableau', 'Data Preparation', 'Data Modeling', 'Data Analysis']

const questions = [
  {
    title: 'How stable is the workforce?',
    detail: 'What does the overall workforce look like, and how does termination vary across tenure and career level?',
  },
  {
    title: 'Where is retention pressure concentrated?',
    detail: 'Does the same tenure group show elevated termination across every performance rating, or only some?',
  },
  {
    title: 'What does the active workforce look like today?',
    detail: 'How is the current workforce distributed across tenure, career level, and performance?',
  },
]

const careerLevelBands = [
  { name: 'Level 1–5', count: '155' },
  { name: 'Level 6–10', count: '200' },
  { name: 'Level 11–15', count: '188' },
  { name: 'Level 16–20', count: '209' },
  { name: 'Level 21–25', count: '243' },
  { name: 'Level 26–31', count: '123' },
]

const analyticalFramework = [
  { area: 'Workforce', metrics: ['Total employees', 'Active employees', 'Terminated employees'] },
  { area: 'Tenure', metrics: ['Tenure bands', 'Termination rate by tenure'] },
  { area: 'Career Level', metrics: ['Six career-level bands', 'Termination rate by level'] },
  { area: 'Performance', metrics: ['Latest performance record', 'Performance rating bands'] },
  { area: 'Cross-Analysis', metrics: ['Performance × tenure', 'Tenure at termination'] },
]

const workforceCalculations: DaxMeasure[] = [
  {
    name: 'Employee Count',
    formula: `Distinct Employee Count =
COUNTD([EmpID])`,
    explanation:
      'Related tables could contain multiple records per employee, so workforce totals used distinct counts rather than record counts.',
  },
  {
    name: 'Latest Performance',
    formula: `Latest Performance Record =
IF DATE([Perf Date]) = [Latest Performance Date] THEN
    [Performance Rating]
END`,
    explanation:
      'Isolates each employee’s most recent performance review so an employee is never counted under more than one rating.',
  },
  {
    name: 'Performance Band',
    formula: `Performance Rating Band =
IF [Latest Performance Record] = 1 THEN
    "1 - Low"

ELSEIF [Latest Performance Record] = 2 THEN
    "2 - Below Avg"

ELSEIF [Latest Performance Record] = 3 THEN
    "3 - Average"

ELSEIF [Latest Performance Record] = 4 THEN
    "4 - Above Avg"

ELSEIF [Latest Performance Record] = 5 THEN
    "5 - High"

END`,
    explanation: 'Converts numeric ratings into descriptive labels so the dashboard reads clearly without a legend lookup.',
  },
  {
    name: 'Career Level Band',
    formula: `Career Level Band =
IF [Career Level] <= 5 THEN
    "Level 1–5"

ELSEIF [Career Level] <= 10 THEN
    "Level 6–10"

ELSEIF [Career Level] <= 15 THEN
    "Level 11–15"

ELSEIF [Career Level] <= 20 THEN
    "Level 16–20"

ELSEIF [Career Level] <= 25 THEN
    "Level 21–25"

ELSE
    "Level 26–31"
END`,
    explanation: 'Groups 31 individual career levels into six readable bands without collapsing them into overly broad categories.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

export default function WorkforceRetentionAnalysis() {
  const project = projects.find((p) => p.slug === 'workforce-retention-career-progression')!
  const [workforceStability, retentionPressure, careerDevelopment] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="Why do some employees stay for years while others leave within a few?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          This analysis uses a multi-table HR dataset in Tableau to examine workforce stability, retention
          pressure, and career progression across tenure, career level, and performance.
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
            An overall termination rate doesn&rsquo;t tell HR where retention pressure is actually concentrated. I
            wanted to understand three things:
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
            First, I looked at the scale and stability of the workforce.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The organization employed 1,562 people. 1,118 were active and 444 had been terminated, an overall
            termination rate of 28.4%.
          </p>

          {workforceStability && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={workforceStability.src} alt={workforceStability.label} className="w-full" />
            </div>
          )}

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Termination wasn&rsquo;t evenly spread across tenure. Employees with 2&ndash;5 years of tenure showed
            the highest termination rate at 50.0%, compared with just 19.0% among employees with more than five
            years of tenure.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            That raised the next question: did this pattern hold up across other employee groups, or was it
            specific to low performers?
          </p>
        </section>

        {/* 02 — THE RETENTION PRESSURE STORY */}
        <section className="mt-16">
          <Eyebrow>02 — The Retention Pressure Story</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            The pattern held up across performance levels.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            I layered performance ratings on top of tenure to see whether the 2&ndash;5 year spike was really just
            about low performers leaving.
          </p>

          {retentionPressure && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={retentionPressure.src} alt={retentionPressure.label} className="w-full" />
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-md">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">19.4%&ndash;25.3%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">
                Termination rate across every performance rating band.
              </dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-yellow-dark sm:text-2xl">198</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">
                Termination records among employees with 3+ years of tenure at exit.
              </dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The elevated termination pattern among 2&ndash;5 year tenure employees showed up across multiple
            performance ratings, not just among low performers. That points to something structural to
            that tenure stage, not simply a performance problem.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Performance alone didn&rsquo;t explain the pattern, so the next step was to look at who makes up the
            workforce today.
          </p>
        </section>

        {/* 03 — WHO MAKES UP THE ACTIVE WORKFORCE */}
        <section className="mt-16">
          <Eyebrow>03 — Who Makes Up the Active Workforce</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            The current workforce skews toward longer-tenured, mid-career employees.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Average tenure across the active workforce was 5.97 years, with an average performance rating of
            3.01 out of 5.
          </p>

          {careerDevelopment && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={careerDevelopment.src} alt={careerDevelopment.label} className="w-full" />
            </div>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {careerLevelBands.map((band) => (
              <div key={band.name} className="border border-border bg-surface p-4">
                <dt className="font-display text-xl font-extrabold text-charcoal">{band.count}</dt>
                <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">{band.name}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Performance ratings stayed centered around &ldquo;Average&rdquo; across every career level band.
            This analysis doesn&rsquo;t point to a performance problem concentrated at any one level.
          </p>
        </section>

        {/* RECOMMENDATIONS */}
        {project.recommendations && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>So, what should HR do?</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">From workforce signals to priorities.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { title: 'Prioritize the 2–5 year tenure segment', detail: project.recommendations[0] },
                { title: 'Review high-termination career levels', detail: project.recommendations[1] },
                { title: 'Monitor retention beyond performance', detail: project.recommendations[2] },
                { title: 'Sustain ongoing workforce monitoring', detail: project.recommendations[3] },
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
              The goal isn&rsquo;t to explain why every employee leaves. It&rsquo;s to focus HR&rsquo;s attention
              on the workforce segment where retention pressure is clearest.
            </p>
          </section>
        )}

        {/* A LOOK UNDER THE HOOD */}
        <section className="mt-16">
          <Eyebrow>A Look Under the Hood</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">How the analysis was built.</h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The dashboard combines a multi-table HR data model with Tableau calculations to segment tenure,
            career level, and performance while keeping every metric at the employee level.
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

        {/* SELECTED CALCULATIONS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Selected Calculations</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            A few of the calculations behind the analysis.
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-text-secondary">
            Tableau calculated fields used to keep workforce metrics at the employee level and translate raw
            values into readable segments.
          </p>
          <div className="mt-6">
            <SelectedDax measures={workforceCalculations} ariaLabel="Select a Tableau calculation" />
          </div>
        </section>

        {project.reflection && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>Reflection</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Limitations and what&rsquo;s next.</h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.reflection}</p>
          </section>
        )}

        {/* PRESENTATION */}
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
              The full case study documents the business problem, data preparation, data model, Tableau
              calculations, dashboard analysis, findings, recommendations, and limitations.
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
