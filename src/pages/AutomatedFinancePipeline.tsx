import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import SelectedDax, { type DaxMeasure } from '../components/SelectedDax'
import PresentationViewer from '../components/PresentationViewer'
import { projects, categoryLabels } from '../data/projects'
import architectureDiagram from '../assets/project5-architecture.png'
import pipelineFlowDiagram from '../assets/project5-pipeline-flow.png'
import fileLifecycleDiagram from '../assets/project5-file-lifecycle.png'
import northstarLogo from '../assets/project5-logo.png'

const detailTools = ['Python', 'PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Windows Task Scheduler']

const manualSteps = [
  'Receive files',
  'Check them by hand',
  'Combine them',
  'Clean the data',
  'Check for duplicates',
  'Recalculate balances',
  'Update reports',
]

const validationChecks = [
  { name: 'Required columns', detail: 'Confirms expected columns exist before any further check runs.' },
  { name: 'Missing values', detail: 'Flags required fields left blank or null.' },
  { name: 'Duplicate IDs', detail: 'Detects duplicate CustomerID, InvoiceID, or PaymentID within a file.' },
  { name: 'Numeric & date formats', detail: 'Confirms amounts, terms, and dates can be parsed correctly.' },
  { name: 'Business rules', detail: 'Positive amounts, valid payment terms, due date not before invoice date.' },
]

const codeSelections: DaxMeasure[] = [
  {
    name: 'Aging Bucket (SQL)',
    formula: `CREATE OR REPLACE VIEW vw_receivables_aging AS

SELECT
    invoice_id, customer_id, customer_name, region, customer_segment,
    invoice_date, due_date, invoice_amount, total_paid_amount,
    outstanding_balance, payment_status,

    GREATEST(DATE '2025-12-31' - due_date, 0) AS days_overdue,

    CASE
        WHEN outstanding_balance = 0 THEN 'Paid'
        WHEN DATE '2025-12-31' <= due_date THEN 'Current'
        WHEN DATE '2025-12-31' - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
        WHEN DATE '2025-12-31' - due_date BETWEEN 31 AND 60 THEN '31-60 Days'
        WHEN DATE '2025-12-31' - due_date BETWEEN 61 AND 90 THEN '61-90 Days'
        WHEN DATE '2025-12-31' - due_date > 90 THEN '90+ Days'
        ELSE 'Current'
    END AS aging_bucket

FROM vw_invoice_reporting;`,
    explanation: 'Buckets every invoice into an aging category in one place, so Power BI never has to recompute it.',
  },
  {
    name: 'Payment Timing (SQL)',
    formula: `CREATE OR REPLACE VIEW vw_payment_performance AS

SELECT
    invoice_id, customer_id, customer_name, region, customer_segment,
    invoice_date, due_date, invoice_amount, total_paid_amount,
    outstanding_balance, payment_count, last_payment_date, payment_status,

    CASE
        WHEN total_paid_amount = 0 THEN 'Not Paid'
        WHEN last_payment_date < due_date THEN 'Early'
        WHEN last_payment_date = due_date THEN 'On Time'
        WHEN last_payment_date > due_date THEN 'Late'
        ELSE 'Unknown'
    END AS payment_timing

FROM vw_invoice_reporting;`,
    explanation: 'Classifies every invoice’s payment behavior, the basis for the Payment & Customer Performance page.',
  },
  {
    name: 'Pipeline Health (SQL)',
    formula: `CREATE OR REPLACE VIEW vw_pipeline_health AS

SELECT
    processing_id, file_name, file_type, processing_status,
    records_read, records_loaded, error_message, processed_at,

    CASE WHEN processing_status = 'SUCCESS' THEN TRUE ELSE FALSE END AS is_successful,
    CASE WHEN processing_status = 'FAILED'  THEN TRUE ELSE FALSE END AS is_failed,
    CASE WHEN processing_status = 'SKIPPED' THEN TRUE ELSE FALSE END AS is_skipped,

    CASE
        WHEN records_read > 0
            THEN ROUND(records_loaded::NUMERIC / records_read, 4)
        ELSE NULL
    END AS load_success_rate

FROM processing_history;`,
    explanation: 'Turns the raw processing_history audit trail into the load-success metrics used on the pipeline health page.',
  },
  {
    name: 'Duplicate Detection (Python)',
    formula: `def calculate_file_hash(file_path):
    """Returns the SHA-256 hex digest of file_path, read in fixed-size chunks."""
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as file:
        for chunk in iter(lambda: file.read(HASH_CHUNK_SIZE), b""):
            sha256.update(chunk)
    return sha256.hexdigest()


def is_file_processed(file_hash, connection):
    """Returns True only if file_hash has a prior SUCCESS row in processing_history."""
    result = connection.execute(
        text("""
            SELECT 1 FROM processing_history
            WHERE file_hash = :file_hash AND processing_status = 'SUCCESS'
            LIMIT 1
        """),
        {"file_hash": file_hash},
    ).fetchone()
    return result is not None`,
    explanation: 'Content, not filename, decides whether a file is new. A renamed duplicate still gets caught.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal-text">{children}</p>
}

export default function AutomatedFinancePipeline() {
  const project = projects.find((p) => p.slug === 'automated-finance-data-pipeline')!
  const [executiveOverview, receivablesRisk, paymentPerformance, pipelineHealth] = project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="What if a reporting pipeline could ingest, validate, and monitor itself, with no one touching it?"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          An end-to-end Python and PostgreSQL system that turns recurring finance CSV files into validated data
          and live Power BI analytics, running unattended every 15 minutes via Windows Task Scheduler.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <img src={northstarLogo} alt="Northstar Distribution Group" className="h-10 w-10 rounded" />
          <p className="font-serif text-xs leading-relaxed text-white/50">
            Northstar Distribution Group, the simulated company this pipeline reports for.
          </p>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-content px-6 py-14">
        <ul className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li key={tool} className="rounded border border-border px-2.5 py-1 text-xs text-text-secondary">
              {tool}
            </li>
          ))}
        </ul>

        {/* THE PROBLEM */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Manual finance reporting doesn&rsquo;t scale.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Northstar Distribution Group, a simulated B2B distribution company, receives recurring customer,
            invoice, and payment files. Every cycle, the manual process behind those reports looked the same:
          </p>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {manualSteps.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded border border-border px-3 py-1.5 text-xs font-medium text-charcoal">
                  {step}
                </span>
                {i < manualSteps.length - 1 && (
                  <span className="text-text-secondary" aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 font-serif text-sm leading-relaxed text-charcoal/80">
            This project replaces that entire manual cycle with one automated system: no manual checking,
            combining, or recalculating.
          </p>
        </section>

        {/* 01 — THE SYSTEM */}
        <section className="mt-16">
          <Eyebrow>01 — The System</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            From a CSV folder to a live dashboard, with no manual step in between.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Windows Task Scheduler triggers the Python pipeline every 15 minutes. Each run scans the incoming
            folder, validates and transforms new files, loads them into PostgreSQL, and refreshes the SQL
            reporting views that Power BI reads from.
          </p>

          <div className="mt-8 overflow-hidden border border-border">
            <img src={architectureDiagram} alt="Automated Finance Data Pipeline architecture diagram" className="w-full" />
          </div>
        </section>

        {/* 02 — HOW IT PROTECTS THE DATA */}
        <section className="mt-16">
          <Eyebrow>02 — How It Protects the Data</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Every file is validated, deduplicated, and tracked before it reaches a report.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The pipeline follows one rule: validate before load. Nothing reaches PostgreSQL until it passes
            structural and business-rule checks.
          </p>

          <div className="mt-8 overflow-hidden border border-border">
            <img src={pipelineFlowDiagram} alt="Python pipeline processing flow diagram" className="w-full" />
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {validationChecks.map((check) => (
              <div key={check.name} className="border border-border bg-surface p-4">
                <dt className="font-display text-sm font-bold text-charcoal">{check.name}</dt>
                <dd className="mt-2 font-serif text-xs leading-relaxed text-charcoal/80">{check.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Duplicate prevention runs on file content, not filename: every file is hashed with SHA-256, so a
            renamed copy of an already-processed file is still recognized and skipped rather than reloaded. That
            makes the pipeline idempotent, safe to run again and again without ever double-counting a file.
          </p>

          <div className="mt-8 overflow-hidden border border-border">
            <img src={fileLifecycleDiagram} alt="File lifecycle diagram showing processed, failed, and skipped outcomes" className="w-full" />
          </div>

          <p className="mt-6 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Every run, successful or not, is written to a <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">processing_history</code> table
            as <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">SUCCESS</code>,{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">FAILED</code>, or{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-teal-text">SKIPPED</code>, so the pipeline&rsquo;s own reliability is as visible as the finance data it produces.
          </p>
        </section>

        {/* 03 — THE ANALYTICS */}
        <section className="mt-16">
          <Eyebrow>03 — The Analytics</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Four connected views, from executive summary to pipeline health.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            PostgreSQL reporting views prepare the data; Power BI adds the interactive layer. The dashboard
            covers the finance story and the pipeline that produces it.
          </p>

          <div className="mt-8 space-y-12">
            {executiveOverview && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{executiveOverview.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={executiveOverview.src} alt={executiveOverview.label} className="w-full" />
                </div>
                <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
                  Of ₱148.07M invoiced, 69.42% has been collected, leaving ₱45.28M outstanding, ₱15.78M of it
                  overdue.
                </p>
              </div>
            )}

            {receivablesRisk && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{receivablesRisk.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={receivablesRisk.src} alt={receivablesRisk.label} className="w-full" />
                </div>
                <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
                  34.9% of outstanding balance is overdue, concentrated among 299 customers with exposure past 90
                  days, ranked here by collection priority.
                </p>
              </div>
            )}

            {paymentPerformance && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{paymentPerformance.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={paymentPerformance.src} alt={paymentPerformance.label} className="w-full" />
                </div>
                <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
                  Average time to payment is 45.8 days, with a 64.1% payment completion rate across segments.
                </p>
              </div>
            )}

            {pipelineHealth && (
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-teal-text">{pipelineHealth.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={pipelineHealth.src} alt={pipelineHealth.label} className="w-full" />
                </div>
                <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
                  80.25% of processing runs load successfully. The exception watchlist below it surfaces the
                  rest, including the exact reason each file failed or was skipped.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* WHAT THIS DEMONSTRATES */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>What This Demonstrates</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">More than a dashboard.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            The other projects in this portfolio analyze data that already existed. This one builds the system
            that gets the data there in the first place: ingestion, validation, deduplication, storage, and
            reporting, running on its own.
          </p>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            That combination, automation that can be trusted with data quality, plus the analytics built on top
            of it, is the intersection this portfolio is built around.
          </p>
        </section>

        {/* SELECTED CODE */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Selected Code</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">A few pieces behind the system.</h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-text-secondary">
            SQL reporting logic from PostgreSQL, and the Python duplicate-detection logic that keeps the pipeline
            idempotent.
          </p>
          <div className="mt-6">
            <SelectedDax measures={codeSelections} ariaLabel="Select a code sample" />
          </div>
        </section>

        {project.presentation && (
          <section className="mt-16">
            <Eyebrow>Presentation</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              From pipeline to stakeholder communication.
            </h2>
            <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-text-secondary">
              A concise presentation of the problem, the architecture, the data-quality safeguards, and the
              resulting dashboards.
            </p>
            <div className="mt-6">
              <PresentationViewer {...project.presentation} />
            </div>
          </section>
        )}

        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Want to see how it&rsquo;s built?</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The full source is public: the Python pipeline, SQL schema and views, validation tests, and
              project documentation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.artifacts.map((artifact) => (
                <Button key={artifact.url} href={artifact.url} icon={<span aria-hidden="true">&#8599;</span>}>
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
