import PageHeader from '../components/PageHeader'
import BackToProjectsFloat from '../components/BackToProjectsFloat'
import Button from '../components/Button'
import StatStrip from '../components/StatStrip'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import { projects, categoryLabels } from '../data/projects'

const decisions = [
  {
    title: 'Test the running API over real HTTP',
    detail:
      "The tests don't import the app. They call a separately started API process with Node's built-in fetch, the same way a client would. The suite refuses to run against a non-local host unless I explicitly allow it, because these tests create and change data.",
  },
  {
    title: 'Make failures loud and easy to diagnose',
    detail:
      "The readiness step watches the server process as well as /health, so a crash at startup fails in about a second with the API log printed, instead of timing out after 30. A green run also has to produce a JUnit report, and the report and log are uploaded even when a step fails.",
  },
  {
    title: 'Give every test its own data',
    detail:
      "No test reads seed data or depends on another test. Each one creates its own order and works only on that one, so tests can run in parallel and in any order. The trade-off is that a bug in the create endpoint fails dozens of tests at once, which is noisy but still gives the right result.",
  },
]

const coverage = [
  { file: 'orders-create', cases: '32', covers: 'Valid creation, boundary values, every missing or invalid field, unknown fields, malformed JSON, oversized bodies' },
  { file: 'orders-status', cases: '33', covers: 'All legal status transitions, all illegal ones (order left unchanged), invalid bodies, unknown and invalid ids' },
  { file: 'orders-read', cases: '9', covers: 'List and get-by-id responses, unknown id, malformed ids' },
  { file: 'errors', cases: '4', covers: 'One consistent error format across unknown routes and every error status' },
  { file: 'health', cases: '1', covers: 'The endpoint the pipeline uses to decide the API is ready' },
]

const verified = [
  {
    scenario: 'Intentional regression',
    result: 'On a throwaway branch, I made the create endpoint return 200 instead of 201. The Run API tests step failed, the report check was skipped, and the log and artifact steps still ran.',
  },
  { scenario: 'Recovery', result: 'With the change reverted, the gate passed again.' },
  {
    scenario: 'Startup crash',
    result: 'A server that throws before listening failed the readiness step in about a second, with the log printed and the tests skipped.',
  },
  { scenario: 'Recovery', result: 'With the crash removed, the gate passed again.' },
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

export default function ApiGate() {
  const project = projects.find((p) => p.slug === 'api-gate')!
  const [failedRun, passedRun] = project.dashboardImages ?? []

  return (
    <>
      <BackToProjectsFloat />
      <PageHeader
        eyebrow={categoryLabels[project.category]}
        title={project.title}
        description="Tests that run over real HTTP, and a CI gate that can't quietly pass."
        backTo="/work"
        backLabel="Back to Projects"
      >
        <p className="mt-3 max-w-xl font-serif text-lg font-medium leading-relaxed text-white">
          The API is only a test target. The focus is the pipeline around it.
        </p>
        <p className="mt-3 max-w-xl font-serif text-sm leading-relaxed text-white/60">
          A portfolio project: a small sample API, an automated test suite, and a GitHub Actions quality gate,
          not a production system.
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

        {failedRun && (
          <div className="mt-8 overflow-hidden border border-border">
            <img src={failedRun.src} alt={failedRun.label} className="w-full" />
          </div>
        )}

        {project.keyResults && (
          <div className="mt-8">
            <StatStrip stats={project.keyResults} />
          </div>
        )}

        {/* THE IDEA */}
        <Reveal>
          <section className="mt-16 max-w-2xl">
            <Eyebrow>The Idea</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
              A test result that can&rsquo;t be quietly ignored.
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.businessProblem}</p>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
              So the sample order API is deliberately small: five endpoints, in-memory data, and a few business
              rules such as which order status changes are allowed. It gives the tests something real to check
              without taking attention away from the testing and the pipeline.
            </p>
          </section>
        </Reveal>

        {/* HOW THE GATE WORKS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>How the Gate Works</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">One job, in a fixed order.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            On every pull request and push to main, a single job called API Quality Gate installs the dependencies,
            typechecks and builds the project, starts the built API in the background, and waits for it to report
            healthy. Then it runs the tests against that running process and uploads the test report and the API
            log. A failing step fails the job, and nothing in the workflow turns a failure into a pass.
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

        {/* WHAT THE TESTS COVER */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>What the Tests Cover</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">79 cases across five files.</h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              The count comes from about 25 table-driven behaviours, so it is not a measure of quality on its own.
              The tests check positive paths, validation errors, the business rules and the error format.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">File</th>
                    <th className="py-2 pr-4 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Cases</th>
                    <th className="py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">Covers</th>
                  </tr>
                </thead>
                <tbody>
                  {coverage.map((row) => (
                    <tr key={row.file} className="border-b border-border align-top">
                      <td className="py-3 pr-4 font-mono text-xs text-charcoal">{row.file}</td>
                      <td className="py-3 pr-4 font-serif text-charcoal/80">{row.cases}</td>
                      <td className="py-3 font-serif text-charcoal/80">{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* WHAT I VERIFIED */}
        <Reveal>
          <section className="mt-16">
            <Eyebrow>Proving the Gate Works</Eyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">
              A gate is only useful if it fails when it should.
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-charcoal/80">
              I broke the project on purpose, on throwaway branches that I closed without merging, and watched what
              GitHub did.
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
                  {verified.map((row, i) => (
                    <tr key={`${row.scenario}-${i}`} className="border-b border-border align-top">
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
          <h2 className="mt-3 max-w-2xl font-display text-xl font-bold text-charcoal">The runs on GitHub.</h2>
          <div className="mt-8 space-y-12">
            {failedRun && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{failedRun.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={failedRun.src} alt={failedRun.label} className="w-full" />
                </div>
              </div>
            )}
            {passedRun && (
              <div>
                <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.06em] text-teal-text">{passedRun.label}</p>
                <div className="overflow-hidden border border-border">
                  <img src={passedRun.src} alt={passedRun.label} className="w-full" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* LIMITS */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>Scope &amp; Limitations</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">What this does not show.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">{project.reflection}</p>
        </section>

        {/* WHAT I'D IMPROVE NEXT */}
        <section className="mt-16 max-w-2xl">
          <Eyebrow>What I&rsquo;d Improve Next</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-bold text-charcoal">Close the gaps I listed.</h2>
          <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal/80">
            First, add a deployment job that depends on the gate, and prove it is skipped on a failure. Second, open
            a failing pull request to confirm GitHub blocks the merge. Third, make a single regression produce a
            shorter list of failing tests.
          </p>
        </section>

        {/* FINAL CTA */}
        {project.artifacts && project.artifacts.length > 0 && (
          <section className="mt-16 max-w-2xl border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-charcoal">Read the workflow and the code.</h2>
            <p className="mt-3 font-serif text-sm leading-relaxed text-text-secondary">
              The repository includes the full architecture notes and a record of each verification run.
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
