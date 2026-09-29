export type SkillTier = 'primary' | 'secondary' | 'supporting' | 'compact'

export type SkillCategory = {
  label: string
  tier: SkillTier
  items: string[]
  secondaryItems?: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Data & Business Intelligence',
    tier: 'primary',
    items: [
      'Power BI',
      'DAX',
      'Power Query',
      'Data Modeling',
      'Star Schema',
      'Date Tables',
      'Row-Level Security',
      'Scheduled Refresh',
      'KPI Reporting',
      'Data Visualization',
      'Microsoft Fabric',
      'Direct Lake',
    ],
    secondaryItems: ['Tableau'],
  },
  {
    label: 'Data & Databases',
    tier: 'secondary',
    items: [
      'SQL',
      'T-SQL',
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'SSMS',
      'Stored Procedures & Views',
      'User-Defined Functions',
      'SSIS',
      'ETL / Data Pipelines',
      'PySpark',
      'Lakehouse Architecture (Bronze / Silver / Gold)',
    ],
  },
  {
    label: 'Automation & RPA',
    tier: 'supporting',
    items: [
      'UiPath',
      'Power Automate',
      'VBA Macros',
      'Excel (Advanced)',
      'Process Automation',
      'Process Optimization',
      'Production Support',
    ],
  },
  {
    label: 'Software Development & Deployment',
    tier: 'supporting',
    items: [
      'C#',
      'VB.NET',
      '.NET / ASP.NET Core',
      'Entity Framework Core',
      'Python',
      'REST APIs',
      'Docker',
      'Git',
      'GitHub',
      'GitHub Actions CI/CD',
      'Render',
      'DigitalOcean',
    ],
  },
  {
    label: 'AI & Intelligent Automation',
    tier: 'compact',
    items: ['n8n', 'AI-Assisted Development'],
  },
  {
    label: 'Delivery & Leadership',
    tier: 'compact',
    items: [
      'Requirements Analysis',
      'Agile',
      'Jira',
      'Sprint Planning',
      'QA/QC & Test Design',
      'Stakeholder Management',
      'Team Leadership',
      'Technical Documentation',
    ],
  },
  {
    label: 'Microsoft & Collaboration',
    tier: 'compact',
    items: ['Microsoft 365', 'SharePoint'],
  },
]
