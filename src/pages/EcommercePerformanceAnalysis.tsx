import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import SelectedDax from '../components/SelectedDax'
import PresentationViewer from '../components/PresentationViewer'
import { projects, categoryLabels } from '../data/projects'

const detailTools = ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Data Analysis']

const questions = [
  {
    title: 'Are we growing?',
    detail: 'How are revenue and orders performing?',
  },
  {
    title: 'Are we delivering reliably?',
    detail: 'How often are orders arriving late, and where are the weak spots?',
  },
  {
    title: 'Are customers satisfied?',
    detail: 'Does delivery performance appear to be connected with customer reviews?',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

export default function EcommercePerformanceAnalysis() {
  const project = projects.find((p) => p.slug === 'ecommerce-performance-analysis')!
  const [executiveOverview, deliveryExperience, commercialGeographic] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="Can a growing e-commerce business scale without losing customers along the way?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          This analysis examines sales, delivery performance, and customer experience to understand where the
          business is performing well, and where operational issues may be affecting growth.
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
            Revenue alone doesn&rsquo;t tell the whole story. I wanted to understand three things:
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
            First, I looked at the overall business.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The business generated ₱13.54M across 99.1K orders, with 91.87% of delivered orders arriving on time
            and an average review score of 4.11/5.
          </p>

          {executiveOverview && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={executiveOverview.src} alt={executiveOverview.label} className="w-full" />
            </div>
          )}

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Revenue showed an overall upward trend, but the headline numbers alone didn&rsquo;t explain the
            relationship between operational performance and customer experience.
          </p>
        </section>

        {/* 02 — THE OPERATIONAL STORY */}
        <section className="mt-16">
          <Eyebrow>02 — The Operational Story</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Where was the friction happening?
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Overall performance looked healthy, so I looked closer at delivery reliability and customer
            experience.
          </p>

          {deliveryExperience && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={deliveryExperience.src} alt={deliveryExperience.label} className="w-full" />
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">8.13%</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">
                of delivered orders were late.
              </dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-charcoal sm:text-2xl">4.29 &rarr; 2.57</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">
                Average review score for on-time vs. late deliveries.
              </dd>
            </div>
            <div className="border border-border bg-surface p-4">
              <dt className="font-display text-xl font-extrabold text-yellow-dark sm:text-2xl">1.72 pts</dt>
              <dd className="mt-1 font-serif text-xs leading-snug text-text-secondary">
                Observed difference in average review score.
              </dd>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The pattern was clear: late deliveries were <strong>associated with</strong> substantially lower
            customer review scores.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            That made delivery reliability more than an operational KPI. It became a customer-experience
            concern.
          </p>
        </section>

        {/* 03 — FROM PROBLEM TO OPPORTUNITY */}
        <section className="mt-16">
          <Eyebrow>03 — From Problem to Opportunity</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Where should the business focus?
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Delivery performance explained part of the customer experience. The next question was where the
            business could focus its attention commercially.
          </p>

          {commercialGeographic && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={commercialGeographic.src} alt={commercialGeographic.label} className="w-full" />
            </div>
          )}

          <p className="mt-8 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            <span className="font-display text-2xl font-extrabold text-yellow-dark">38.3%</span> of total revenue
            came from São Paulo.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            São Paulo was the dominant revenue market. That creates strength, but also concentration, making it
            important to understand where other markets may offer room for growth.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Rather than looking only at revenue, I also considered customer volume and revenue per customer to
            identify markets that may deserve closer attention.
          </p>
        </section>

        {/* RECOMMENDATIONS */}
        {project.recommendations && (
          <section className="mt-16 max-w-2xl">
            <Eyebrow>So, what should the business do?</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">From findings to action.</h2>
            <ol className="mt-6 space-y-5">
              {[
                { title: 'Improve delivery reliability', detail: project.recommendations[0] },
                { title: 'Diversify geographic growth', detail: project.recommendations[1] },
                { title: 'Target high-value opportunities', detail: project.recommendations[2] },
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
              The opportunity isn&rsquo;t simply to sell more. It&rsquo;s to grow while improving the experience
              that keeps customers satisfied.
            </p>
          </section>
        )}

        {/* A LOOK UNDER THE HOOD */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>A Look Under the Hood</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            The analytical logic behind the dashboard.
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-text-secondary">
            The dashboard is built on a focused set of reusable DAX measures that turn the underlying transaction
            data into business KPIs.
          </p>
          <div className="mt-6">
            <SelectedDax />
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
              The full case study documents the business question, data preparation, modeling, analysis, findings,
              recommendations, limitations, and next steps.
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
