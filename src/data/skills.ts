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
    items: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'Star Schema', 'KPI Reporting', 'Data Visualization'],
    secondaryItems: ['Tableau'],
  },
  {
    label: 'Data & Databases',
    tier: 'secondary',
    items: ['SQL', 'T-SQL', 'SQL Server', 'PostgreSQL', 'Stored Procedures & Views', 'ETL / Data Pipelines'],
  },
  {
    label: 'Automation & RPA',
    tier: 'supporting',
    items: ['UiPath', 'Power Automate', 'VBA', 'Process Automation', 'Production Support'],
  },
  {
    label: 'Software Development & Deployment',
    tier: 'supporting',
    items: ['C#', '.NET / ASP.NET Core', 'Entity Framework Core', 'Python', 'REST APIs', 'Docker', 'GitHub Actions CI/CD'],
  },
  {
    label: 'AI & Intelligent Automation',
    tier: 'compact',
    items: ['n8n', 'AI-Assisted Development'],
  },
  {
    label: 'Delivery & Leadership',
    tier: 'compact',
    items: ['Requirements Analysis', 'Agile', 'Stakeholder Management', 'Team Leadership'],
  },
]
