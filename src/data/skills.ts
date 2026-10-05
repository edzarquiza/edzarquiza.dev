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
      'Tableau',
      'DAX',
      'Power Query',
      'Data Modeling',
      'Star Schema',
      'Date Tables',
      'Row-Level Security',
      'Scheduled Refresh',
      'Microsoft Fabric',
      'Direct Lake',
      'Databricks',
      'ThoughtSpot',
      'Databricks AI/BI',
    ],
  },
  {
    label: 'Data & Databases',
    tier: 'secondary',
    items: [
      'SQL',
      'T-SQL',
      'SQL Server',
      'PostgreSQL',
      'Neon',
      'MySQL',
      'SSMS',
      'Stored Procedures & Views',
      'SSIS',
      'ETL / Data Pipelines',
      'PySpark',
      'Lakehouse Architecture (Bronze / Silver / Gold)',
      'Delta Lake',
      'Unity Catalog',
    ],
  },
  {
    label: 'Automation, RPA & AI',
    tier: 'supporting',
    items: [
      'UiPath',
      'Power Automate',
      'n8n',
      'Ollama (Local LLMs)',
      'LLM Integration',
      'AI Agent Workflows',
      'VBA Macros',
      'Excel (Advanced)',
      'Process Automation',
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
      'React',
      'Python',
      'REST APIs',
      'xUnit',
      'Docker',
      'Git',
      'GitHub',
      'GitHub Actions CI/CD',
      'Render',
      'DigitalOcean',
    ],
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
