import caseStudy1Executive from '../assets/case-study-1-executive.png'
import caseStudy1Delivery from '../assets/case-study-1-delivery.png'
import caseStudy1Commercial from '../assets/case-study-1-commercial.png'
import caseStudy2CommandCenter from '../assets/case-study-2-command-center.png'
import caseStudy2Service from '../assets/case-study-2-service-performance.png'
import caseStudy2RootCause from '../assets/case-study-2-root-cause.png'
import caseStudy3WorkforceStability from '../assets/case-study-3-workforce-stability.png'
import caseStudy3RetentionPressure from '../assets/case-study-3-retention-pressure.png'
import caseStudy3CareerDevelopment from '../assets/case-study-3-career-development.png'
import caseStudy4Overview from '../assets/case-study-4-overview.png'
import caseStudy4Performance from '../assets/case-study-4-performance.png'
import caseStudy4Forecast from '../assets/case-study-4-forecast.png'
import project5ExecutiveOverview from '../assets/project5-executive-overview.png'
import project5ReceivablesRisk from '../assets/project5-receivables-risk.png'
import project5PaymentPerformance from '../assets/project5-payment-performance.png'
import project5PipelineHealth from '../assets/project5-pipeline-health.png'
import flowOpsDashboard from '../assets/flowops-dashboard.png'
import flowOpsTicketAttention from '../assets/flowops-ticket-attention.png'
import flowOpsTeamWorkload from '../assets/flowops-team-workload.png'
import flowOpsSprintBoard from '../assets/flowops-sprint-board.png'
import flowOpsWorkQueue from '../assets/flowops-work-queue.png'
import aureliaInvoiceControlCenter from '../assets/aurelia-invoice-control-center.png'
import aureliaAttentionCenter from '../assets/aurelia-attention-center.png'
import aureliaProcessingBreakdown from '../assets/aurelia-processing-breakdown.png'
import aureliaOperationsPage from '../assets/aurelia-operations-page.png'
import aureliaInvoiceControlWorkflow from '../assets/aurelia-invoice-control-workflow.png'

const ecommerceSlideModules = import.meta.glob('../assets/presentations/ecommerce/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>
const incidentSlideModules = import.meta.glob('../assets/presentations/incident/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const ecommerceSlideTitles = [
  'Power BI Portfolio Case Study',
  '01 The Business Question',
  '02 The Business at a Glance',
  '03 Sales Performance',
  '04 Customer Experience',
  '05 Delivery Performance',
  '06 Geographic Performance',
  '07 Prioritization',
  '08 Key Findings',
  '09 Recommendations',
  '10 Analyst Takeaway',
]

const incidentSlideTitles = [
  'Power BI Portfolio Case Study',
  'The Business Question',
  'The Overall Picture',
  'Resolution Efficiency',
  'Priority Performance',
  'Operational Friction',
  'Workload Concentration',
  'Analytical Principle',
  'From Findings to Action',
  'The Takeaway',
]

const workforceSlideModules = import.meta.glob('../assets/presentations/workforce/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const workforceSlideTitles = [
  'Tableau Portfolio Case Study',
  '01 The Business Question',
  '02 Workforce Overview',
  '03 Workforce Stability',
  '04 Workforce Stability',
  '05 Retention Pressure',
  '06 Retention Pressure',
  '07 Career Development & Progression',
  '08 Key Findings',
  '09 Recommendations',
  '10 Analyst Takeaway',
]

const demandIntelligenceSlideModules = import.meta.glob('../assets/presentations/demand-intelligence/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const demandIntelligenceSlideTitles = [
  'Power BI Case Study',
  '01 The Business Question',
  '02 Demand Overview',
  '03 Demand Overview',
  '04 Demand Overview',
  '05 Performance Analysis',
  '06 Performance Analysis',
  '07 Demand Forecast',
  '08 Demand Forecast',
  '09 Key Findings',
  '10 Recommendations',
  '11 Analyst Takeaway',
]

const northstarSlideModules = import.meta.glob('../assets/presentations/northstar/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const northstarSlideTitles = [
  'Northstar Distribution Group',
  'The Problem',
  'Architecture',
  'Data Quality',
  'Dashboard Page 1 — Executive Finance Overview',
  'Dashboard Page 2 — Receivables Risk',
  'Dashboard Page 3 — Payment & Customer Performance',
  'Dashboard Page 4 — Pipeline Health',
  'Technology',
  'Northstar Distribution Group',
]

function buildSlides(modules: Record<string, string>, titles: string[], deckTitle: string) {
  return Object.keys(modules)
    .sort()
    .map((path, i) => ({
      src: modules[path],
      alt: titles[i] ? `${deckTitle} — ${titles[i]}` : `${deckTitle} — slide ${i + 1}`,
    }))
}

export type ProjectCategory = 'engineering' | 'powerbi' | 'case-study' | 'automation'

export type ProjectStatus = 'coming-soon' | 'published'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  oneLiner: string
  tools: string[]
  heroImage?: string
  keyResults?: { value: string; label: string }[]
  keyFinding?: string
  businessProblem?: string
  stakeholders?: string
  businessQuestions?: string[]
  data?: {
    source: string
    structure: string
    limitations: string
    assumptions: string
  }
  method?: string[]
  keyFindings?: string[]
  keyFindingsDetailed?: { headline: string; detail: string }[]
  recommendations?: string[]
  reflection?: string
  dashboardImages?: { label: string; src: string }[]
  presentation?: {
    slides: { src: string; alt: string }[]
    pptxUrl: string
    aspectRatio: string
  }
  pdfUrl?: string
  artifacts?: { label: string; url: string }[]
}

export const categoryLabels: Record<ProjectCategory, string> = {
  engineering: 'Software Engineering',
  powerbi: 'Power BI & Analytics',
  'case-study': 'Data Analytics Case Study',
  automation: 'Automation & Data',
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-performance-analysis',
    title: 'E-Commerce Performance Analysis',
    category: 'powerbi',
    status: 'published',
    oneLiner:
      "How is the business performing across sales, delivery, and customer experience — and where's the biggest opportunity? A Power BI analysis of 99K+ orders (DAX, Power Query, data modeling) found that late deliveries were tied to a sharp drop in customer satisfaction — a clear signal for where operational attention pays off most.",
    tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    heroImage: caseStudy1Executive,
    keyResults: [
      { value: '₱13.54M', label: 'Revenue' },
      { value: '99.1K', label: 'Orders' },
      { value: '91.87%', label: 'On-Time Delivery' },
      { value: '4.11 / 5', label: 'Average Review' },
    ],
    keyFinding:
      'Late deliveries were associated with substantially lower customer review scores: 2.57 vs 4.29 for on-time deliveries.',
    businessQuestions: [
      'How is the e-commerce business performing across sales, delivery, customer experience, and geographic markets, and where are the biggest opportunities for improvement and growth?',
    ],
    dashboardImages: [
      { label: '01 — Executive Overview', src: caseStudy1Executive },
      { label: '02 — Delivery & Customer Experience', src: caseStudy1Delivery },
      { label: '03 — Commercial & Geographic Performance', src: caseStudy1Commercial },
    ],
    keyFindings: [
      '8.13% of delivered orders were late.',
      'Average review score was 2.57 for late deliveries versus 4.29 for on-time deliveries.',
      '38.3% of total revenue came from São Paulo.',
    ],
    recommendations: [
      'Investigate operational factors behind late deliveries, particularly weaker-performing states and high-volume late-delivery categories.',
      "Maintain São Paulo's strong performance while evaluating opportunities in other markets to reduce revenue concentration.",
      'Use revenue, customer value, delivery performance, and category performance together when prioritizing expansion and promotions.',
    ],
    reflection:
      "This analysis works from a static historical extract of the Olist dataset, so it shows what happened, not what's happening now — a production version would need a live or scheduled refresh to stay useful for ongoing decisions. The late-delivery/review-score relationship is also a correlation, not a proven cause; the next step would be testing it against controllable factors like carrier or region before acting on it.",
    presentation: {
      slides: buildSlides(ecommerceSlideModules, ecommerceSlideTitles, 'E-Commerce Performance Analysis'),
      pptxUrl: '/E-Commerce_Performance_Analysis.pptx',
      aspectRatio: '16 / 9',
    },
    pdfUrl: '/Ecommerce-Performance-Analysis-Case-Study.pdf',
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/E-Commerce-Performance-Analysis' }],
  },
  {
    slug: 'automated-finance-data-pipeline',
    title: 'Northstar Distribution Automated Finance Data Pipeline',
    category: 'automation',
    status: 'published',
    oneLiner:
      'Recurring finance files were processed by hand every cycle. Built an automated Python-to-PostgreSQL pipeline — validating, deduplicating, and loading the data every 15 minutes — with live Power BI reporting on both the finance results and the pipeline’s own health.',
    tools: ['Python', 'PostgreSQL', 'SQL', 'Power BI', 'DAX', 'Windows Task Scheduler'],
    heroImage: project5ExecutiveOverview,
    keyResults: [
      { value: '₱148.07M', label: 'Total Invoiced' },
      { value: '69.42%', label: 'Collection Rate' },
      { value: '80.25%', label: 'Pipeline Success Rate' },
      { value: '15 min', label: 'Automated Cycle' },
    ],
    keyFinding:
      'An automated pipeline that validates, deduplicates, and loads recurring finance files into PostgreSQL every 15 minutes, then surfaces both financial results and its own processing health in Power BI.',
    businessProblem:
      'Northstar Distribution Group, a simulated B2B distribution company, processed recurring customer, invoice, and payment files by hand: receiving files, checking them manually, combining them, cleaning the data, checking for duplicates, recalculating balances, and updating reports, every cycle. This project replaces that manual workflow with an automated Python pipeline that validates and loads the data into PostgreSQL, exposes it through SQL reporting views, and visualizes it in Power BI, triggered automatically every 15 minutes by Windows Task Scheduler.',
    businessQuestions: [
      'Can a recurring manual finance-reporting workflow be replaced with an automated, self-validating, self-monitoring pipeline, without losing data quality or visibility?',
    ],
    method: ['Detect & Classify', 'Validate', 'Prevent Duplicates', 'Transform', 'Load to PostgreSQL', 'Report in Power BI'],
    dashboardImages: [
      { label: '01 — Executive Finance Overview', src: project5ExecutiveOverview },
      { label: '02 — Receivable Risk & Collection Priorities', src: project5ReceivablesRisk },
      { label: '03 — Payment & Customer Performance', src: project5PaymentPerformance },
      { label: '04 — Data Pipeline & Processing Health', src: project5PipelineHealth },
    ],
    keyFindingsDetailed: [
      {
        headline: 'The pipeline replaces a seven-step manual process',
        detail:
          'Receiving, checking, combining, cleaning, deduplicating, recalculating, and reporting are now one automated Python workflow triggered every 15 minutes.',
      },
      {
        headline: 'Every file is validated before it can affect a report',
        detail:
          'Required columns, missing values, duplicate IDs, numeric and date formats, and business rules (like due date not preceding invoice date) are all checked before any row reaches PostgreSQL.',
      },
      {
        headline: 'Duplicate files are caught by content, not filename',
        detail:
          'SHA-256 hashing means a renamed copy of an already-processed file is still recognized and skipped, keeping the pipeline idempotent on repeated runs.',
      },
      {
        headline: 'The pipeline reports on its own health',
        detail:
          'Every run is recorded as SUCCESS, FAILED, or SKIPPED in a processing_history table, exposed in Power BI alongside the finance data it produces.',
      },
    ],
    recommendations: [
      'Add explicit referential-integrity validation ahead of the database load, rather than relying on PostgreSQL foreign-key constraints alone.',
      'Move receivables aging from a fixed reporting date to a dynamic one, so overdue calculations stay accurate as time passes.',
      'Add automated alerting for repeated processing failures, rather than relying on the Power BI pipeline-health page being checked manually.',
      'Containerize the pipeline and move scheduling to a managed cloud environment to remove the dependency on a single local machine.',
    ],
    presentation: {
      slides: buildSlides(northstarSlideModules, northstarSlideTitles, 'Northstar Automated Finance Data Pipeline'),
      pptxUrl: '/Northstar_Finance_Pipeline.pptx',
      aspectRatio: '16 / 9',
    },
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/northstar-automated-finance-data-pipeline' }],
  },
  {
    slug: 'incident-performance-operational-analysis',
    title: 'Incident Performance & Operational Analysis',
    category: 'powerbi',
    status: 'published',
    oneLiner:
      'Where is IT service performance under the most pressure? Turned simulated incident-ticket data into a Power BI dashboard covering SLA compliance, resolution time, and workload — surfacing that high-priority incidents were missing SLA at a dramatically higher rate than lower-priority ones.',
    tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    heroImage: caseStudy2CommandCenter,
    keyResults: [
      { value: '24.9K', label: 'Total Incidents' },
      { value: '63.42%', label: 'SLA Success Rate' },
      { value: '178.17 hrs', label: 'Mean Time to Resolve' },
      { value: '275', label: 'Reopened Incidents' },
    ],
    keyFinding:
      'High and Critical priority incidents were associated with substantially lower SLA success (1.85% and 0.49%) compared to 84.11% for Low priority incidents.',
    businessProblem:
      "As a Data Analyst supporting a simulated IT Service Management organization, this project turns incident-level ticket data into a Power BI dashboard covering SLA compliance, resolution efficiency, workload concentration, and reassignment activity. The objective was to help management see where operational demand is concentrated, where service performance is under pressure, and which areas warrant further investigation.",
    businessQuestions: [
      'How is the organization performing on SLA compliance, resolution efficiency, and workload, and where should operational improvement efforts be focused?',
    ],
    method: ['Business Scenario', 'Data Preparation', 'Data Modeling & DAX', 'Dashboard Analysis', 'Recommendations'],
    dashboardImages: [
      { label: '01 — Incident Command Center', src: caseStudy2CommandCenter },
      { label: '02 — Service Performance Deep Dive', src: caseStudy2Service },
      { label: '03 — Incident Root Cause & Workload Analysis', src: caseStudy2RootCause },
    ],
    keyFindingsDetailed: [
      {
        headline: 'SLA performance falls short of target',
        detail:
          '63.42% of incidents met SLA, below the 70% target, with High and Critical priority incidents showing far lower SLA success (1.85% and 0.49%) than Moderate and Low priority incidents.',
      },
      {
        headline: 'A small number of long-running incidents skew the average',
        detail:
          'Mean resolution time (178.17 hours) is far higher than the median (22.10 hours), showing that a smaller group of long-running incidents has an outsized effect on overall performance.',
      },
      {
        headline: 'Nearly half of incidents are reassigned',
        detail:
          '45.63% of incidents were reassigned at least once, with several assignment groups showing reassignment rates above 85%, a signal worth investigating for routing and ownership issues.',
      },
      {
        headline: 'Workload is concentrated in a few categories',
        detail:
          'Identity & Authentication, Software Support, Access & Permissions, and Database Services account for the majority of incident volume, pointing to where targeted improvement could have the greatest effect.',
      },
    ],
    recommendations: [
      'Focus on the groups, priorities, and resolution-time bands associated with the greatest SLA exposure.',
      'Investigate the substantially lower SLA performance among High and Critical incidents to understand whether escalation, workload, SLA definitions, or resolution bottlenecks may be contributing.',
      'Review groups with consistently high reassignment rates for potential routing, ownership, escalation, or skill-alignment issues.',
      'Prioritize recurring demand in areas such as Identity & Authentication, Software Support, Access & Permissions, and Database Services.',
      'Investigate the smaller population of long-running incidents that materially increases mean resolution time.',
    ],
    reflection:
      "The dataset is simulated, so the SLA and reassignment patterns are illustrative rather than a live operational signal — the value here is in the analytical approach (segmenting by priority, isolating what skews an average) rather than the specific numbers. A real deployment would need to validate these patterns against actual ticket data before using them to justify a process change.",
    presentation: {
      slides: buildSlides(incidentSlideModules, incidentSlideTitles, 'Incident Performance & Operational Analysis'),
      pptxUrl: '/Incident_Performance_Operational_Analysis.pptx',
      aspectRatio: '16 / 9',
    },
    pdfUrl: '/Incident-Performance-Operational-Analysis-Case-Study.pdf',
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/Incident-Performance-and-Operational-Analysis' }],
  },
  {
    slug: 'demand-intelligence-retail-forecasting',
    title: 'Demand Intelligence',
    category: 'powerbi',
    status: 'published',
    oneLiner:
      "How should a retail business plan around demand instead of just reporting last month's total? Built a SQL Server and Power BI model connecting historical demand, seasonal patterns, and a 12-month forecast — showing that growth was real but its momentum was quietly slowing year over year.",
    tools: ['Power BI', 'SQL Server', 'DAX', 'Data Modeling', 'Data Analysis', 'Forecasting'],
    heroImage: caseStudy4Overview,
    keyResults: [
      { value: '47.70M', label: 'Total Demand' },
      { value: '15.04%', label: 'Strongest YoY Growth (2014)' },
      { value: '3.64%', label: 'YoY Growth (2017)' },
      { value: '12 mo', label: 'Forecast Horizon' },
    ],
    keyFinding:
      'Demand grew substantially between 2013 and 2017, but growth momentum moderated from a peak of 15.04% in 2014 to 3.64% by 2017.',
    businessProblem:
      'While total sales data was available, decision-makers needed more than headline figures. They needed to understand how demand changed over time, whether growth was accelerating or slowing, which stores and products contributed most, and what patterns suggested about future demand. This project turned historical demand data across 10 stores and 50 products into an interactive Power BI dashboard connecting historical performance, demand drivers, and future outlook.',
    businessQuestions: [
      'How can a retail business understand historical demand patterns, identify the contributors driving performance, and use those patterns to support future planning?',
    ],
    method: ['Business Problem', 'SQL Data Preparation', 'Data Model', 'DAX Measures', 'Dashboard Analysis', 'Recommendations'],
    dashboardImages: [
      { label: '01 — Demand Overview', src: caseStudy4Overview },
      { label: '02 — Performance', src: caseStudy4Performance },
      { label: '03 — Forecast', src: caseStudy4Forecast },
    ],
    keyFindingsDetailed: [
      {
        headline: '47.70M in historical demand',
        detail: 'Demand grew substantially across the 2013–2017 period, drawn from 10 stores and 50 products.',
      },
      {
        headline: 'Growth momentum moderated',
        detail: 'Year-over-year growth peaked at 15.04% in 2014 and slowed to 3.64% by 2017.',
      },
      {
        headline: 'Demand follows a seasonal pattern',
        detail:
          'Demand typically strengthened during the middle of the year, with July showing the highest average monthly demand at approximately 1.0M.',
      },
      {
        headline: 'Demand is broadly distributed',
        detail:
          '63.5% of demand came from stores outside the top three, while 68.6% came from products outside the top ten.',
      },
      {
        headline: 'Forecasting adds planning context',
        detail:
          'Historical patterns provide useful direction, but uncertainty increases further into the 12-month forecast horizon.',
      },
    ],
    recommendations: [
      'Use historical seasonal patterns to support inventory planning, product replenishment, store capacity, and operational resource planning ahead of expected demand peaks.',
      'Track both total demand and year-over-year growth together. Strong demand levels can hide slowing growth momentum.',
      "Monitor the entire store and product network rather than focusing only on Store 02 or Product 15, since the broader network generates most of the business's demand.",
      'Continuously compare forecasts with actual results as new data becomes available, feeding variance analysis back into updated planning.',
    ],
    reflection:
      "The 12-month forecast is only as reliable as the historical pattern it's built on, and the case study is upfront that uncertainty grows the further out it projects — it's meant to support planning conversations, not replace them. A live version would need the forecast re-validated against actual results on a regular cadence rather than treated as a one-time output.",
    presentation: {
      slides: buildSlides(demandIntelligenceSlideModules, demandIntelligenceSlideTitles, 'Demand Intelligence'),
      pptxUrl: '/Demand_Intelligence_Presentation.pptx',
      aspectRatio: '16 / 9',
    },
    pdfUrl: '/Demand-Intelligence-Retail-Demand-Forecasting-Case-Study.pdf',
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/Demand-Intelligence' }],
  },
  {
    slug: 'workforce-retention-career-progression',
    title: 'Workforce Retention & Career Progression Analysis',
    category: 'case-study',
    status: 'published',
    oneLiner:
      'Analyzing employee retention, tenure, and career progression patterns using a multi-table HR dataset in Tableau to identify where retention pressure is concentrated.',
    tools: ['Tableau', 'Data Preparation', 'Data Modeling', 'Data Analysis'],
    heroImage: caseStudy3WorkforceStability,
    keyResults: [
      { value: '1,562', label: 'Total Employees' },
      { value: '28.4%', label: 'Termination Rate' },
      { value: '50.0%', label: '2–5 Yr Tenure Termination' },
      { value: '5.97 yrs', label: 'Average Tenure' },
    ],
    keyFinding:
      'Employees with 2–5 years of tenure showed the highest termination rate (50.0%) compared with 19.0% among employees with more than five years of tenure.',
    businessProblem:
      'As a Data Analyst, I used a multi-table Human Resources dataset to build an interactive Tableau dashboard examining workforce stability, retention pressure, and career progression. The objective was to move beyond a single overall termination rate and identify which employee segments, by tenure, career level, and performance, show the greatest retention pressure and warrant further investigation.',
    businessQuestions: [
      'How does employee retention vary across tenure, career level, and performance, and where should HR focus further investigation?',
    ],
    method: ['Business Problem', 'Data Preparation', 'Data Model', 'Tableau Calculations', 'Dashboard Analysis', 'Recommendations'],
    dashboardImages: [
      { label: '01 — Workforce Stability', src: caseStudy3WorkforceStability },
      { label: '02 — Retention Pressure', src: caseStudy3RetentionPressure },
      { label: '03 — Career Development & Progression', src: caseStudy3CareerDevelopment },
    ],
    keyFindingsDetailed: [
      {
        headline: 'Mid-tenure employees show the highest retention pressure',
        detail:
          'Employees with 2–5 years of tenure recorded the highest termination rate at 50.0%, compared with 19.0% among employees with more than five years of tenure.',
      },
      {
        headline: 'Retention patterns vary across workforce segments',
        detail:
          'Termination rates differed across tenure groups, career levels, and performance ratings. Segmentation reveals more than an overall termination rate alone.',
      },
      {
        headline: "Performance doesn't fully explain the pattern",
        detail:
          'The elevated termination rate among mid-tenure employees appeared across multiple performance ratings, indicating that performance alone does not explain the observed pattern.',
      },
      {
        headline: 'The active workforce skews toward longer-tenured, mid-career employees',
        detail:
          'The current workforce contains a substantial number of longer-tenured employees and is distributed primarily across mid-career level bands, with performance ratings centered around average.',
      },
    ],
    recommendations: [
      'Prioritize the 2–5 year tenure segment for deeper investigation. It shows the highest termination rate (50.0%) and the most consistent retention pressure across performance groups.',
      'Review career levels with higher termination rates to understand whether specific workforce conditions are contributing to employee exits.',
      'Monitor retention across the broader workforce rather than focusing only on low-performing employees, since elevated termination in the 2–5 year group appears across multiple performance ratings.',
      'Use the dashboard for ongoing workforce monitoring, tracking termination patterns across tenure, career level, and performance to catch emerging retention risks earlier.',
    ],
    reflection:
      "Ruling out performance as the explanation for the 2–5 year termination spike is a useful finding, but it's not a complete explanation either — the dataset doesn't include the qualitative reasons people actually left, which would be the natural next step for HR to investigate. The analysis identifies where the pressure is concentrated, not why it exists.",
    presentation: {
      slides: buildSlides(workforceSlideModules, workforceSlideTitles, 'Workforce Retention & Career Progression Analysis'),
      pptxUrl: '/Workforce_Retention_Career_Progression.pptx',
      aspectRatio: '16 / 9',
    },
    pdfUrl: '/Workforce-Retention-Career-Progression-Case-Study.pdf',
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/Workforce-Retention---Career-Progression-Analysis' }],
  },
  {
    slug: 'flowops',
    title: 'FlowOps',
    category: 'engineering',
    status: 'published',
    oneLiner:
      "Service-desk teams don't struggle to see their tickets — they struggle to see which ones need a decision right now. Built FlowOps, a deployed, tested operations platform with a deterministic \"what needs attention\" engine that shows the evidence behind every at-risk ticket, not just a flag.",
    tools: ['.NET 10', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'Docker', 'Render'],
    heroImage: flowOpsDashboard,
    keyResults: [
      { value: '1,373', label: 'Automated Tests' },
      { value: '34', label: 'Architecture Decision Records' },
      { value: 'Modular Monolith', label: 'Architecture' },
      { value: '4', label: 'Authorization Roles' },
    ],
    keyFinding:
      'A deterministic Attention engine surfaces which tickets need a decision right now, with the actual evidence behind every "at risk" verdict shown inline, not hidden behind a black-box score.',
    businessProblem:
      "Operational teams rarely struggle because they can't see their tickets. They struggle because a growing queue makes it difficult to see which work requires a decision now. A queue can show what's open, assigned, or overdue, but it doesn't inherently answer which ticket is about to breach its SLA, which urgent ticket remains unassigned, which work has stalled, which ticket has repeatedly reopened, or where workload is accumulating. That became the design problem behind FlowOps.",
    businessQuestions: [
      'Can operational data be turned into explainable, trustworthy decisions instead of just being stored and filtered?',
    ],
    method: ['Work', 'Workflow', 'Intelligence', 'Action'],
    dashboardImages: [
      { label: 'Operations dashboard', src: flowOpsDashboard },
      { label: 'Ticket detail with an Explainable Attention Brief', src: flowOpsTicketAttention },
      { label: 'Team Workload', src: flowOpsTeamWorkload },
      { label: 'Sprint board', src: flowOpsSprintBoard },
      { label: 'Work queue', src: flowOpsWorkQueue },
    ],
    artifacts: [
      { label: 'Live Demo', url: 'https://flow-ops.onrender.com' },
      { label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/flow-ops' },
      { label: 'Architecture Docs', url: 'https://github.com/edzarquiza/flow-ops/blob/main/docs/architecture.md' },
    ],
  },
  {
    slug: 'aurelia-ai',
    title: 'Aurelia AI',
    category: 'engineering',
    status: 'published',
    oneLiner:
      "Letting an AI model both read an invoice and decide if it's valid means inheriting its uncertainty into a business decision. Built Aurelia AI, where AI only extracts the data — a deterministic backend, checked against real vendor and PO records, makes every pass/fail call.",
    tools: ['React', 'TypeScript', 'n8n', 'Ollama (Qwen 3 4B)', 'PostgreSQL'],
    heroImage: aureliaInvoiceControlCenter,
    keyResults: [
      { value: '8', label: 'Tested Workflow Paths' },
      { value: '3', label: 'Webhook Endpoints' },
      { value: 'Extraction-Only AI', label: 'Model Role' },
      { value: 'Deterministic Rules', label: 'Validation' },
    ],
    keyFinding:
      'The language model never makes a pass/fail call — a fixed, auditable rule set evaluated against PostgreSQL reference data decides every invoice outcome.',
    businessProblem:
      "Invoice control workflows that lean on an LLM to both read a document and judge whether it's valid inherit the model's uncertainty into a business decision. Aurelia AI separates those two jobs: AI extracts structured data from a PDF invoice, and a deterministic backend, evaluated against real vendor and purchase-order records, decides whether it passes.",
    businessQuestions: [
      "Can an AI-assisted document workflow keep every pass/fail decision deterministic and auditable, instead of trusting the model's judgment?",
    ],
    method: ['PDF Extraction', 'AI Structured Extraction', 'Reference Lookup', 'Deterministic Validation', 'Duplicate Detection', 'Audit Trail'],
    dashboardImages: [
      { label: 'Invoice Control Center — KPI strip & Process Invoice panel', src: aureliaInvoiceControlCenter },
      { label: 'Attention Center — failed, incomplete, and orphaned automation runs', src: aureliaAttentionCenter },
      { label: 'Processing Breakdown & Automation Runs', src: aureliaProcessingBreakdown },
      { label: 'Operations page', src: aureliaOperationsPage },
      { label: 'n8n workflow — invoice-control automation', src: aureliaInvoiceControlWorkflow },
    ],
    artifacts: [{ label: 'View Source on GitHub', url: 'https://github.com/edzarquiza/aurelia-ai' }],
  },
]
