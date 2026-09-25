export type ExperienceEntry = {
  role: string
  company: string
  location: string
  start: string
  end: string
  type: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Automation Developer / IT Lead',
    company: 'Dexterous Group Pty Limited',
    location: 'New South Wales, Australia (Remote)',
    start: '01/2026',
    end: '04/2026',
    type: 'Full time',
    highlights: [
      'Led a 4-person automation and IT operations team, owning delivery of DexIQ, an internal automation and AI platform, from requirements through production release',
      'Ran sprint planning, backlog prioritization, and delivery tracking in Jira across the automation and IT operations roadmap',
      'Established production-readiness standards covering testing, documentation, security, scalability, and reliability, reducing post-release defects',
      'Served as escalation point for technical and delivery risk across engineering, operations, and business stakeholders',
      'Defined and tracked delivery and operations KPIs used to direct team capacity and improvement priorities',
    ],
  },
  {
    role: 'RPA Development Lead',
    company: 'Dexterous Group Pty Limited',
    location: 'New South Wales, Australia (Remote)',
    start: '06/2025',
    end: '01/2026',
    type: 'Full time',
    highlights: [
      'Built an automated Jira-to-Power BI reporting pipeline: Python extraction into a governed dataset, feeding an auto-refreshing report delivered to leadership on a set cadence, with an AI-generated weekly sprint summary',
      'Designed and delivered approximately 10 Power BI reports covering automation performance, finance forecasting, Jira team KPIs, and workload distribution, used directly in capacity allocation and finance decisions',
      'Led a 3-person RPA team through the full delivery lifecycle: requirements, development, QA/QC, documentation, deployment, and production support',
      'Introduced structured QA/QC and test practices that improved release quality and automation uptime',
      'Mentored engineers through 1:1s, performance support, and career development while managing stakeholder timelines',
    ],
  },
  {
    role: 'RPA Developer',
    company: 'Dexterous Group Pty Limited',
    location: 'New South Wales, Australia (Remote)',
    start: '09/2022',
    end: '05/2025',
    type: 'Full time',
    highlights: [
      'Designed, developed, tested, and maintained 50+ production RPA solutions in UiPath, delivering approximately 70 hours and AUD 2,800 in savings per month',
      'Built reusable automation components, frameworks, and scripts that cut build time on subsequent automations and standardized error handling across the portfolio',
      'Monitored production robots, schedules, and server utilization, resolving failures to maintain continuous operation across business-critical finance processes',
      'Developed supporting databases, internal applications, and APIs, including SQL data models feeding downstream reporting',
      'Built Power BI reports for operational monitoring and performance analysis, translating process telemetry into metrics business owners could act on',
    ],
  },
  {
    role: 'Full Stack C# Software Developer',
    company: 'EHS Lens Philippines',
    location: 'Tanauan City, Philippines (Onsite)',
    start: '09/2017',
    end: '08/2022',
    type: 'Full time',
    highlights: [
      'Developed and maintained 70+ VBA macros and .NET/C# enterprise applications, supporting manufacturing operations for 500 users across 10 departments',
      'Designed and optimized SQL Server databases, views, stored procedures, T-SQL, and user-defined functions, including query tuning on high-volume production tables',
      'Gathered requirements from operations stakeholders and translated them into delivered software, owning the full lifecycle through deployment and support',
      'Reviewed code for performance and reusability, diagnosed and resolved production defects, and produced technical specifications and end-user training materials',
    ],
  },
  {
    role: 'Technical Support Engineer',
    company: 'EHS Lens Philippines',
    location: 'Tanauan City, Philippines (Onsite)',
    start: '07/2015',
    end: '08/2017',
    type: 'Full time',
    highlights: [
      'Provided IT and network support for 400+ users across the organization',
      'Managed servers, workstations, and network infrastructure, handling troubleshooting and technical support requests',
    ],
  },
]

export const careerJourney = [
  {
    year: '2015–2017',
    role: 'Technical Support Engineer',
    description: 'IT and network support for 400+ users.',
    icon: 'support' as const,
  },
  {
    year: '2017–2022',
    role: 'Full Stack C# Software Developer',
    description: '70+ VBA macros and .NET/C# applications developed and maintained.',
    icon: 'code' as const,
  },
  {
    year: '2022–2025',
    role: 'RPA Developer',
    description: 'Delivered 50+ automation solutions in UiPath, ~70 hours saved per month.',
    icon: 'automation' as const,
  },
  {
    year: '2025–2026',
    role: 'RPA Development Lead',
    description: 'Built the Jira-to-Power BI reporting pipeline used for leadership decisions.',
    icon: 'leadership' as const,
  },
  {
    year: '2026',
    role: 'Senior Automation Developer / IT Lead',
    description: 'Leading automation, IT operations, and product delivery.',
    icon: 'infrastructure' as const,
  },
]

export const currentFocus = {
  year: 'CURRENT FOCUS',
  role: 'Power BI & Data Analytics',
  description: 'Applying my technology and automation background to data-driven decision making.',
  icon: 'data' as const,
}
