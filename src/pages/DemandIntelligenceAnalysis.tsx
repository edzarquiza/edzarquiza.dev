import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import SelectedDax, { type DaxMeasure } from '../components/SelectedDax'
import PresentationViewer from '../components/PresentationViewer'
import { projects, categoryLabels } from '../data/projects'

const detailTools = ['Power BI', 'SQL Server', 'DAX', 'Data Modeling', 'Data Analysis', 'Forecasting']

const questions = [
  {
    title: 'What happened?',
    detail: 'How has demand changed over time, and is growth accelerating or slowing?',
  },
  {
    title: "What's driving demand?",
    detail: 'Which stores and products contribute most, and how concentrated is that demand?',
  },
  {
    title: 'What might happen next?',
    detail: 'What do historical patterns suggest about future demand, and how much uncertainty comes with that?',
  },
]

const analyticalFramework = [
  { area: 'Demand Metrics', metrics: ['Total Sales', 'Average Daily / Monthly Sales', 'Latest Demand'] },
  { area: 'Growth & Trend', metrics: ['YoY %', 'YoY Variance', 'Moving 3M / 6M Avg', 'Rolling 3M / 6M Sales'] },
  { area: 'Store Performance', metrics: ['Top Store', 'Top Store Demand', 'Top 3 Store Contribution'] },
  { area: 'Product Performance', metrics: ['Top Product', 'Top Product Demand', 'Top 10 Product Contribution'] },
  { area: 'Forecast & Seasonal', metrics: ['Monthly Forecast Pattern', 'Latest Demand'] },
]

const demandDaxMeasures: DaxMeasure[] = [
  {
    name: 'Total Sales',
    formula: `Total Sales =
SUM(FactDemand[Sales])`,
    explanation:
      "The project's core demand metric, the foundation for demand trends, store and product performance, growth calculations, and concentration analysis.",
  },
  {
    name: 'YoY %',
    formula: `YoY % =
DIVIDE(
    [YoY Variance],
    [Sales LY]
)`,
    explanation:
      'Builds on Sales LY (SAMEPERIODLASTYEAR) and YoY Variance (Total Sales − Sales LY), using DIVIDE() to avoid divide-by-zero errors.',
  },
  {
    name: 'Moving 3M Avg',
    formula: `Moving 3M Avg =
AVERAGEX(
    DATESINPERIOD(
        DimDate[Date],
        MAX(DimDate[Date]),
        -3,
        MONTH
    ),
    [Total Sales]
)`,
    explanation:
      'Uses DATESINPERIOD() to average demand across a rolling 3-month window, smoothing short-term fluctuations to reveal the broader trend.',
  },
  {
    name: 'Top Store',
    formula: `Top Store =
VAR TopStoreTable =
    TOPN(
        1,
        ALLSELECTED(DimStore[StoreName]),
        [Total Sales],
        DESC
    )
RETURN
CONCATENATEX(
    TopStoreTable,
    DimStore[StoreName],
    ", "
)`,
    explanation:
      'Uses TOPN() over ALLSELECTED() to dynamically rank stores by demand, then CONCATENATEX() to return the leading store’s name as text.',
  },
  {
    name: 'Top Product',
    formula: `Top Product =
VAR TopProductTable =
    TOPN(
        1,
        ALLSELECTED(DimItem[ItemName]),
        [Total Sales],
        DESC
    )
RETURN
CONCATENATEX(
    TopProductTable,
    DimItem[ItemName],
    ", "
)`,
    explanation: 'The same TOPN() + CONCATENATEX() ranking pattern applied to products, updating dynamically as report filters change.',
  },
  {
    name: 'Latest Demand',
    formula: `Latest Demand =
VAR LatestDate =
    MAX(DimDate[Date])
RETURN
CALCULATE(
    [Total Sales],
    DimDate[Date] = LatestDate
)`,
    explanation:
      'Returns demand for the most recent date in the current filter context, so the KPI updates correctly as the date slicer changes, a measure that initially returned blank until the filter logic was corrected.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

export default function DemandIntelligenceAnalysis() {
  const project = projects.find((p) => p.slug === 'demand-intelligence-retail-forecasting')!
  const [overview, performance, forecast] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="How can a retail business turn five years of demand history into a plan for what's next?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          This analysis uses SQL Server and Power BI to understand how retail demand changed over time, identify
          which stores and products drive it, and use seasonal patterns to inform a 12-month forecast.
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
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            How can a retail business understand historical demand and prepare for what&rsquo;s next?
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Total sales figures alone don&rsquo;t tell decision-makers where demand is headed. I structured the
            dashboard around three connected questions:
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

        {/* 01 — UNDERSTAND THE PAST */}
        <section className="mt-16">
          <Eyebrow>01 — Understand the Past</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Demand growth has been strong — but momentum is slowing.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Total demand reached approximately 47.70M between 2013 and 2017, with an overall upward trajectory
            across the five-year period.
          </p>

          {overview && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={overview.src} alt={overview.label} className="w-full" />
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-2xl font-extrabold text-charcoal">15.04%</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                Peak YoY Growth, 2014
              </dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-2xl font-extrabold text-yellow-dark">3.64%</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                YoY Growth, 2017
              </dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Strong demand levels don&rsquo;t necessarily mean growth momentum remains strong. Demand also followed
            a clear seasonal rhythm, generally strengthening through the middle of the year, with July recording
            the highest average monthly demand at approximately 1.0M, before moderating toward year-end.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Understanding how demand moved was the first step. The next question was where it was coming from.
          </p>
        </section>

        {/* 02 — IDENTIFY THE DRIVERS */}
        <section className="mt-16">
          <Eyebrow>02 — Identify the Drivers</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Demand is led by top performers — but supported by a broad base.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Store 02 generated the most demand at approximately 6.1M, and Product 15 led product performance at
            approximately 1.61M.
          </p>

          {performance && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={performance.src} alt={performance.label} className="w-full" />
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">36.5%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Top 3 stores</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">63.5%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Remaining 7 stores</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">31.4%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Top 10 products</dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">68.6%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">Remaining 40 products</dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The important insight isn&rsquo;t simply who performs best. It&rsquo;s how dependent the business is
            on those top performers. The business isn&rsquo;t heavily dependent on a small number of stores or
            products; demand is broadly distributed across the network and portfolio.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            With demand broadly distributed today, the next question was what historical patterns suggest about
            tomorrow.
          </p>
        </section>

        {/* 03 — PREPARE FOR THE FUTURE */}
        <section className="mt-16">
          <Eyebrow>03 — Prepare for the Future</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Historical patterns provide direction — not certainty.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The forecast extended the historical analysis into a 12-month outlook, reflecting the seasonal
            patterns observed historically: demand was expected to remain stronger around the middle of the
            year.
          </p>

          {forecast && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={forecast.src} alt={forecast.label} className="w-full" />
            </div>
          )}

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The confidence interval widened further into the forecast period. The further into the future the
            forecast extends, the greater the uncertainty.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The forecast should be used as planning guidance, not a guaranteed prediction.
          </p>
        </section>

        {/* KEY FINDINGS */}
        {project.keyFindingsDetailed && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>Key Findings</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">The story in five findings.</h2>
            <ol className="mt-6 space-y-6">
              {project.keyFindingsDetailed.map((finding, i) => (
                <li key={finding.headline} className="flex gap-4">
                  <span className="font-mono text-sm font-extrabold text-teal-text">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-display text-base font-bold text-charcoal">{finding.headline}</p>
                    <p className="mt-1.5 font-serif text-sm leading-relaxed text-charcoal/80">{finding.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* FROM INSIGHT TO ACTION */}
        {project.recommendations && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>From Insight to Action</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">What the analysis suggests next.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { title: 'Plan ahead for seasonal demand', detail: project.recommendations[0] },
                { title: 'Monitor growth momentum', detail: project.recommendations[1] },
                { title: 'Monitor the entire store and product network', detail: project.recommendations[2] },
                { title: 'Continuously compare forecasts with actual results', detail: project.recommendations[3] },
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
          </section>
        )}

        {/* A LOOK UNDER THE HOOD */}
        <section className="mt-16">
          <Eyebrow>A Look Under the Hood</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">How the analysis was built.</h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The dashboard sits on a SQL Server star schema (FactDemand plus DimDate, DimItem, and DimStore) with
            DAX measures organized into five analytical areas.
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
            From the core demand metric to dynamic store and product ranking: six measures spanning demand
            calculation, growth analysis, rolling trends, and contribution ranking.
          </p>
          <div className="mt-6">
            <SelectedDax measures={demandDaxMeasures} ariaLabel="Select a DAX measure" />
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
            <h2 className="font-display text-xl font-bold text-charcoal">Want the full analytical process?</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              Explore the complete case study covering the business problem, data preparation, SQL exploration,
              data model, DAX logic, dashboard design, findings, recommendations, limitations, and next steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={project.pdfUrl} icon={<span aria-hidden="true">&rarr;</span>}>
                Read Full Case Study
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
