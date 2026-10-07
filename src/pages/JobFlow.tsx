import PageHeader from '../components/PageHeader'
import BackToProjectsFloat from '../components/BackToProjectsFloat'
import Button from '../components/Button'
import StatStrip from '../components/StatStrip'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { projects, categoryLabels } from '../data/projects'
import jobflowZapFlow from '../assets/jobflow-zap-flow.png'

const decisions = [
  {
    title: 'Enrich the webhook through the API, not the payload',
    detail:
      "The ServiceM8 webhook only confirms a job finished; it doesn't carry everything the workflow needs. Rather than trust whatever the event happened to include, I call the Job and Company APIs directly, so the record is built from ServiceM8's current data.",
  },
  {
    title: 'Check for duplicates before writing anything',
    detail:
      "Webhook delivery isn't guaranteed to arrive exactly once, and a duplicate event could easily create a duplicate record. Before creating anything, the workflow looks up the job's ServiceM8 ID in a Zapier Table. That's duplicate-event protection using a lookup before create, not a distributed-transaction guarantee, and I didn't test two near-simultaneous deliveries against each other.",
  },
  {
    title: 'Keep a human on VIP approvals',
    detail:
      "Whether a VIP job should proceed to billing is a judgment call that can depend on context the workflow doesn't have. Instead of guessing, JobFlow sends an approval request to Slack and waits for a person, then logs that decision with Actor = Human.",
  },
]

const testScenarios = [
  { scenario: 'Standard', result: 'Job moved straight to Billing Ready, as expected.' },
  {
    scenario: 'VIP Approved',
    result: 'Sent to Slack for approval. Once approved, the job moved to Billing Ready and the decision was logged with Actor = Human.',
  },
  {
    scenario: 'VIP Declined',
    result: 'Sent to Slack for approval. Once declined, the job was flagged for review instead of proceeding to billing.',
  },
  { scenario: 'After-Hours', result: 'Operations got a Slack notification flagging the job for review.' },
  { scenario: 'Warranty', result: 'Job was flagged for manual processing instead of going down the standard path.' },
  {
    scenario: 'Unsupported Category',
    result: 'Job was flagged as an exception and operations got a Slack notice, instead of the job silently falling through.',
  },
  {
    scenario: 'Duplicate Event',
    result: 'The second delivery of the same job was recognized as a duplicate. No second record was created, and the event was logged and flagged in Slack.',
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

export default function JobFlow() {
  const project = projects.find((p) => p.slug === 'jobflow')!
  const [vipApprovalSlack, auditLog, slackNotifications] = project.dashboardImages ?? []

  return (
    <>
      <BackToProjectsFloat />
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="ServiceM8 Job Processing Automation for Australian Trade Businesses"
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-lg font-medium leading-relaxed text-white">
          Automate coordination, not judgment.
        </p>
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          A portfolio engineering project built with realistic ServiceM8 and Zapier workflows and test data, not a
          production deployment or an official ServiceM8 integration.
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

        {project.heroImage && (
          <div className="mt-8 overflow-hidden border border-border">
            <img src={project.heroImage} alt={project.heroImageAlt ?? project.title} className="w-full" />
          </div>
        )}

        {project.keyResults && (
          <div className="mt-8">
            <StatStrip stats={project.keyResults} />
          </div>
        )}

        {/* THE PROBLEM */}
        <Reveal>
          <section className="mt-16 max-w-2xl">
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
              Coordination that usually lives in someone's head.
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
              Webhooks can also fire more than once, which means duplicate records if nothing checks for that first.
              In most small trade businesses, this coordination lives in someone's head: a dispatcher or office
              manager remembering which jobs need extra attention, rather than a documented, repeatable process.
            </p>
          </section>
        </Reveal>

        {/* THE APPROACH */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>The Approach</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Automate the coordination, not the judgment.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            My approach was to let the workflow handle routing, record-keeping, and nudging the right people
            automatically. Wherever an actual business decision is needed, like whether a VIP job should proceed to
            billing, a person stays in the loop.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">One webhook, enriched, checked, and routed.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            A ServiceM8 webhook starts the Zap the moment a job is marked complete. Since the webhook only confirms
            that something happened, I call the ServiceM8 Job and Company APIs to pull the real details: category,
            description, completion date, invoice amount, and client name. The workflow checks a Zapier Table to see
            if that job has already been processed, then routes it by category: Standard jobs move to Billing Ready,
            VIP jobs go to Slack for approval, After-Hours jobs alert operations, and Warranty or unrecognized
            categories are flagged as exceptions instead of failing silently.
          </p>
          <FlowChips steps={project.method ?? []} />
        </section>

        {/* THREE DECISIONS */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Three Decisions Worth Noticing</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">A few choices worth calling out.</h2>
            <div className="mt-8 space-y-8">
              {decisions.map((item) => (
                <div key={item.title} className="max-w-2xl border-l-2 border-teal pl-5">
                  <p className="font-display text-base font-bold text-charcoal">{item.title}</p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* WORKING WITHIN A LIMIT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Working Within a Limit</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">The 30-step ceiling.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            Zapier's trial plan caps a single Zap at 30 steps, and this workflow uses all 30. That ceiling shaped
            real design decisions: the audit log, for example, only writes a logging step for the branches that fit
            inside the limit (Job Received, VIP Approval, and duplicate events) rather than every branch. Standard
            billing, VIP decline, and After-Hours still perform their business actions; they just don't get a
            dedicated log entry yet. I'd rather be upfront about that constraint than imply coverage I didn't build.
          </p>
        </section>

        {/* WHAT I TESTED */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>What I Tested</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              Seven scenarios, exercised with test data.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              There's no automated test suite here. I sent test jobs through the workflow and observed the result
              directly in the Jobs table, the audit log, and Slack.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Scenario</th>
                    <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">What Happened</th>
                  </tr>
                </thead>
                <tbody>
                  {testScenarios.map((row) => (
                    <tr key={row.scenario} className="border-b border-border align-top">
                      <td className="py-3 pr-4 font-display font-bold text-charcoal">{row.scenario}</td>
                      <td className="py-3 font-serif text-charcoal/80">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* EVIDENCE */}
        <section className="mt-16">
          <Eyebrow>Evidence</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">What it actually looked like running.</h2>
          <div className="mt-8 space-y-12">
            {vipApprovalSlack && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{vipApprovalSlack.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={vipApprovalSlack.src} alt={vipApprovalSlack.label} className="w-full" />
                </div>
              </div>
            )}
            {auditLog && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{auditLog.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={auditLog.src} alt={auditLog.label} className="w-full" />
                </div>
              </div>
            )}
            {slackNotifications && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{slackNotifications.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={slackNotifications.src} alt={slackNotifications.label} className="w-full" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-8">
            <Button href={jobflowZapFlow} variant="secondary" icon={<span aria-hidden="true">&#8599;</span>}>
              View Full Zap Flow (30 Steps)
            </Button>
          </div>
        </section>

        {/* WHAT I'D IMPROVE NEXT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>What I&rsquo;d Improve Next</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">More coverage, and the failure cases I haven&rsquo;t tested.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            With a higher step limit, or by splitting this across multiple Zaps, I'd add logging coverage for the
            remaining branches: Standard billing, VIP decline, and After-Hours. I'd also want to test failure cases
            I haven't yet, like ServiceM8 API errors, Slack approval timeouts, and near-simultaneous duplicate
            deliveries.
          </p>
        </section>

        {/* FINAL CTA */}
        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Read the full write-up, or the step map.</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The GitHub README covers the full business problem, architecture, and test evidence in more depth
              than fits here.
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
