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
      'Led a 4-person automation and IT operations team, owning delivery of DexIQ, an external automation and AI product, from requirements through production release',
      'Also served as temporary Product Lead for DexIQ, running scrum ceremonies, triaging the weekly ticket queue, and continuing the product roadmap',
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
      'Built an automated Jira-to-Power BI data pipeline in Python, extracting operational data on a scheduled basis, transforming it into a governed reporting dataset, and feeding an auto-refreshing Power BI reporting layer',
      'Designed data models and reporting solutions covering automation performance, finance forecasting, Jira team KPIs, workload distribution, and capacity planning',
      'Developed approximately 10 Power BI reports used by leadership to monitor operational performance, workload, and financial planning',
      'Led a 3-person engineering team through the full delivery lifecycle: requirements, development, QA/QC, documentation, deployment, and production support',
      'Worked directly with Australian stakeholders in a distributed remote environment, translating business requirements into technical solutions and decision-support reporting',
      'Mentored engineers through technical guidance, 1:1s, performance support, and delivery planning',
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
      'Developed and maintained 70+ VBA macros and enterprise applications in C#, VB.NET, VBA, SQL Server, and T-SQL, supporting manufacturing operations for 500 users across 10 departments',
      'Designed and optimized SQL Server databases, views, stored procedures, and user-defined functions, including query tuning against high-volume production tables',
      'Built data models and database structures supporting operational applications and downstream reporting',
      'Translated operational requirements into data-driven software solutions, owning delivery from requirements analysis through deployment and production support',
      'Diagnosed production data and application issues, improving system reliability and resolving performance bottlenecks, and produced technical specifications and end-user training materials',
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
  role: 'Data Engineering & Data Analytics',
  description: 'Applying my technology and automation background to data-driven decision making.',
  icon: 'data' as const,
}
