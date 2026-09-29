import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import StatStrip from '../components/StatStrip'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { projects, categoryLabels } from '../data/projects'

const pipelineFlow = [
  'PDF upload',
  'n8n webhook',
  'PDF text extraction',
  'AI structured extraction',
  'PostgreSQL reference lookup',
  'Deterministic validation',
  'Duplicate detection',
  'Audit trail',
  'React frontend',
]

const stack = [
  { layer: 'Frontend', detail: 'React, TypeScript, Vite, plain CSS — no UI framework, no component library, no router.' },
  { layer: 'Automation', detail: 'n8n orchestrates the entire flow end-to-end and owns every business decision.' },
  { layer: 'AI', detail: 'Ollama running Qwen 3 4B, local and self-hosted — used only for extraction, never for validation.' },
  { layer: 'Database', detail: 'PostgreSQL holds vendor/PO reference data and the automation audit trail.' },
  { layer: 'Integration', detail: 'Three REST-style webhook endpoints (JSON + multipart) — the frontend never touches PostgreSQL or Ollama directly.' },
]

const testScenarios = [
  'Valid invoice',
  'Amount exceeds PO',
  'Currency mismatch',
  'Closed PO',
  'Missing PO',
  'Inactive vendor',
  'Duplicate invoice',
  'Second valid vendor',
]

export default function AureliaAI() {
  const project = projects.find((p) => p.slug === 'aurelia-ai')!
  const [controlCenter, attentionCenter, processingBreakdown, operationsPage, workflowDiagram, operationsWorkflow] =
    project.dashboardImages ?? []

  return (
    <>
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="AI extracts and interprets. Deterministic backend rules decide."
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          Letting an AI model both read an invoice and decide whether it&rsquo;s valid means inheriting its
          uncertainty into a business decision. Aurelia AI keeps those jobs separate: AI only extracts the data,
          and a deterministic backend, checked against real vendor and PO records, decides whether it passes.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-content px-6 py-14">
        <ul className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <li
              key={tool}
              className={
                tool === 'n8n'
                  ? 'rounded border border-teal bg-teal-tint px-2.5 py-1 text-xs font-medium text-teal-text'
                  : 'rounded border border-border px-2.5 py-1 text-xs text-text-secondary'
              }
            >
              {tool}
            </li>
          ))}
        </ul>

        {controlCenter && (
          <div className="mt-8 overflow-hidden border border-border">
            <img src={controlCenter.src} alt={controlCenter.label} className="w-full" />
          </div>
        )}

        {project.keyResults && (
          <div className="mt-8">
            <StatStrip stats={project.keyResults} />
          </div>
        )}

        {/* THE PROBLEM */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Reading a document and judging it shouldn&rsquo;t be the same job.
          </h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
        </section>

        {/* THE PIPELINE */}
        <section className="mt-16">
          <Eyebrow>The Pipeline</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Every invoice moves through the same deterministic sequence.
          </h2>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {pipelineFlow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded border border-border px-3 py-1.5 text-xs font-medium text-charcoal">{step}</span>
                {i < pipelineFlow.length - 1 && (
                  <span className="text-text-secondary" aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl font-serif text-base font-medium leading-relaxed text-charcoal">
            The model reads the invoice. It never decides whether the invoice passes.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Once Ollama (Qwen 3 4B) turns the PDF into structured JSON, n8n looks up the vendor and purchase order
            in PostgreSQL and runs a fixed set of checks — amount against the approved PO, currency match,
            vendor and PO status — before checking for duplicates against prior runs. Every run, successful or
            not, is written to an audit trail.
          </p>
        </section>

        {/* STACK */}
        <section className="mt-16">
          <Eyebrow>The Stack</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            React on top, n8n in the middle, nothing skipped.
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stack.map((item) => (
              <div key={item.layer} className="border border-border bg-surface p-4">
                <dt className="font-display text-sm font-bold text-charcoal">{item.layer}</dt>
                <dd className="mt-2 font-serif text-xs leading-relaxed text-charcoal/80">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ATTENTION CENTER */}
        <Reveal>
        <section className="mt-16">
          <Eyebrow>Attention Center</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            Failures are surfaced, not swallowed.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The Invoice Control Center is organized around three areas: invoice processing, an Attention Center
            for failed, incomplete, and orphaned automation runs, and KPI/performance metrics across invoices and
            automation.
          </p>

          <div className="mt-8 space-y-12">
            {attentionCenter && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{attentionCenter.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={attentionCenter.src} alt={attentionCenter.label} className="w-full" />
                </div>
              </div>
            )}
            {processingBreakdown && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{processingBreakdown.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={processingBreakdown.src} alt={processingBreakdown.label} className="w-full" />
                </div>
              </div>
            )}
          </div>
        </section>
        </Reveal>

        {/* THE OPERATIONS PAGE */}
        <Reveal>
        <section className="mt-16">
          <Eyebrow>Before Invoice Control</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            A simpler feature came first: free-text requests, routed by AI.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Before the Invoice Control Center existed, this was the whole product. A user types a plain-language
            operational request into a single field &mdash; &ldquo;I cannot connect to the company VPN&rdquo; is
            the kind of thing it&rsquo;s built for &mdash; and the frontend posts that text to an n8n webhook.
            Everything past that point happens in n8n: AI classifies the request, deterministic logic calculates
            its priority and SLA, a confidence check decides whether it&rsquo;s routed straight through or escalated
            to human review, and a knowledge-base lookup attaches guidance where one is found. The frontend&rsquo;s
            job is just to render whatever comes back &mdash; category, routing department, priority, SLA,
            processing mode, and any knowledge-base guidance &mdash; exactly as n8n returns it, never recomputing
            any of it itself.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            The workflow&rsquo;s internal name, <span className="font-mono text-xs text-teal-text">OpsFlow AI &mdash; Request Intake</span>,
            is a holdover from before the product was rebranded to Aurelia AI. Its logic is considered stable and
            isn&rsquo;t being actively extended, but it still runs as a separate, self-contained feature inside
            the same app and brand shell as the Invoice Control Center.
          </p>

          <div className="mt-8 space-y-12">
            {operationsPage && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{operationsPage.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={operationsPage.src} alt={operationsPage.label} className="w-full" />
                </div>
              </div>
            )}
            {operationsWorkflow && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{operationsWorkflow.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={operationsWorkflow.src} alt={operationsWorkflow.label} className="w-full" />
                </div>
              </div>
            )}
          </div>
        </section>
        </Reveal>

        {/* UNDER THE HOOD */}
        <section className="mt-16">
          <Eyebrow>Under the Hood</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
            n8n owns the workflow, end to end.
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
            Three webhook endpoints define the entire integration surface: a POST endpoint that processes an
            uploaded invoice, and two GET endpoints that serve operations and KPI data to the frontend. The n8n
            workflows, PostgreSQL schema, and Ollama setup aren&rsquo;t in the public repository — only the
            React frontend is, as the project&rsquo;s own documentation makes clear. This diagram is the
            invoice-control workflow that a request actually runs through.
          </p>
          {workflowDiagram && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={workflowDiagram.src} alt={workflowDiagram.label} className="w-full" />
            </div>
          )}
        </section>

        {/* TEST SCENARIOS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Test Scenarios</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
            Eight synthetic invoices, eight distinct paths through the workflow.
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {testScenarios.map((scenario) => (
              <li key={scenario} className="rounded border border-border bg-surface px-3 py-1.5 text-xs text-charcoal">
                {scenario}
              </li>
            ))}
          </ul>
        </section>

        {/* WHAT THIS DEMONSTRATES */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>What This Demonstrates</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">A portfolio project, on synthetic data.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Aurelia AI is a demo system on synthetic data, not a production deployment — there&rsquo;s no ERP
            integration and no accuracy benchmark being claimed. What it demonstrates is AI-assisted document
            processing paired with workflow automation engineering, deterministic system design discipline,
            full-stack integration across React, n8n, PostgreSQL, and a local LLM, and attention to auditability
            and operational monitoring.
          </p>
        </section>

        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Want to see how it&rsquo;s built?</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The full frontend source, sample test invoices, and documentation are public on GitHub.
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
            {project.tools.map((tool) => (
              <li
                key={tool}
                className={
                  tool === 'n8n'
                    ? 'rounded border border-teal bg-teal-tint px-3 py-1.5 text-xs font-medium text-teal-text'
                    : 'rounded border border-border px-3 py-1.5 text-xs text-charcoal'
                }
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
