# CLAUDE.md — Edward Jon Arquiza Portfolio

## 1. Project Purpose

Build a personal professional portfolio for Edward Jon Arquiza.

The portfolio is intended to support applications for:

- Power BI Developer
- Power BI Analyst
- Data Analyst
- Data Analytics roles
- Business Analyst / BI Analyst
- Reporting / Analytics roles
- Automation Analyst
- Automation + Data / BI hybrid roles

This is **not** a generic developer portfolio and must not look like a bootcamp graduate portfolio.

The portfolio should communicate a clear career progression:

**IT Support → Software Development → RPA Development → Automation Leadership / IT Lead → Power BI & Data Analytics**

The central professional positioning is:

> An experienced technology and automation professional who combines Power BI, data analytics, automation, and business problem-solving.

The site should make the user's existing professional experience an advantage rather than presenting him as someone starting from zero.

---

## 2. Source of Truth

The uploaded resume is the authoritative source for professional history, certifications, education, and stated skills.

Do not invent:

- employment history
- achievements
- metrics
- responsibilities
- certifications
- project outcomes
- client names
- company information
- technical proficiency
- business results

If information is missing, use a clearly marked placeholder or leave it out.

Resume facts currently supported by the source:

- Edward Jon Arquiza
- Batangas City, Philippines
- 7 years of experience
- Senior Automation Developer / IT Lead
- RPA Development Lead
- RPA Developer
- Full Stack C# Software Developer
- Technical Support Engineer
- 50+ automation solutions
- Cross-functional team leadership
- Power BI dashboards/reporting
- KPI tracking
- Requirements analysis
- Stakeholder collaboration
- Agile delivery
- IT operations
- UiPath
- Power Automate
- Power BI
- SQL / MySQL
- Python
- C# / VB.NET / VBA
- Git / GitHub
- SharePoint / Microsoft 365
- Tableau
- Bachelor of Science in Computer Science
- Google Data Analytics Professional Certificate
- Microsoft Certified: Data Analyst Associate
- C# Programming using Microsoft .NET training
- Career Service Professional Eligibility

The resume lists professional experience from 2015 onward and should be treated as the factual basis for the Experience section.

---

## 3. Portfolio Philosophy

The portfolio must be:

- Clean
- Simple
- Modern
- Professional
- Data-oriented
- Personal
- Credible
- Recruiter-friendly
- Easy to scan
- Evidence-driven

The portfolio should prioritize:

**Career story + selected work + analytical thinking + technical capability**

over decorative effects.

The website should feel like a modern BI / analytics / technology professional's site.

It should NOT feel like:

- a flashy frontend developer portfolio
- a cyberpunk website
- an AI-generated template
- a generic "Hi, I'm a passionate developer" site
- a collection of certificates
- a collection of random dashboards

---

## 4. Visual Identity

### Primary colors

Use a restrained teal / white / black palette.

Recommended starting tokens:

```css
--color-background: #FFFFFF;
--color-surface: #F8FAFC;
--color-text: #111827;
--color-text-secondary: #6B7280;
--color-accent: #0F766E;
--color-accent-light: #F0FDFA;
--color-border: #E5E7EB;
```

Teal is an accent, not the dominant background color.

Use:

- Black / near-black for headings
- Gray for supporting text
- Teal for links, active states, small highlights, buttons, numbers, lines, and selected UI elements
- White for the primary canvas
- Very light teal only for subtle emphasis

Do not introduce additional strong colors unless required for data visualization.

### Typography

Prefer a clean sans-serif such as:

- Inter
- Manrope

Use strong typography hierarchy and generous whitespace.

Do not use decorative display fonts.

### Design principles

Prefer:

- whitespace
- typography
- subtle borders
- simple cards
- thin teal rules
- editorial layouts
- restrained motion
- high-quality project screenshots

Avoid:

- excessive gradients
- neon colors
- glassmorphism
- 3D effects
- animated backgrounds
- excessive parallax
- excessive scroll animations
- giant icons
- fake data visualizations
- skill percentage bars
- generic stock photography
- unnecessary visual clutter

---

## 5. Site Architecture

Use this navigation:

1. Home
2. Work
3. About
4. Credentials
5. Resume
6. Contact

Do not create a separate top-level navigation item for every project.

### Work

Work should contain categories:

- Power BI & Analytics
- Data Analytics Case Studies
- Automation & Data

The project system must be extensible so additional projects can be added without redesigning the application.

---

## 6. Homepage

The homepage is the primary recruiter entry point.

A visitor should understand within approximately 10 seconds:

1. Who Edward is
2. What he does
3. What roles he is targeting
4. What differentiates him
5. Where to see evidence of his work
6. How to contact him

### Homepage structure

```text
Navbar
↓
Hero
↓
Professional Snapshot
↓
Selected Work
↓
Career Journey
↓
How I Work
↓
Credentials
↓
Contact CTA
↓
Footer
```

---

## 7. Hero Section

The hero should be restrained and professional.

Suggested content direction:

**Edward Jon Arquiza**

**Power BI • Data Analytics • Automation**

Supporting message:

> Experienced technology and automation professional building data-driven solutions that connect business problems, analytics, and technology.

This wording is a direction, not a final immutable copy. Improve it if needed, but do not exaggerate or invent claims.

Primary CTA:

**View My Work**

Secondary CTA:

**Download Resume**

Optional tertiary link:

**LinkedIn**

Use the professional photo from the resume only if the image asset is available and licensing/usage is appropriate. Do not generate a fake professional photo.

Do not put a giant animated graphic behind the hero.

---

## 8. Professional Snapshot

Create four capability areas.

### Data & Business Intelligence

- Power BI
- DAX
- Power Query
- Data Modeling
- SQL
- KPI reporting
- Data visualization

### Automation & Process Improvement

- UiPath
- Power Automate
- VBA
- RPA
- Process automation
- Production automation support

### Software & Technology

- C#
- VB.NET
- SQL databases
- APIs / integrations where supported by actual project content
- Git / GitHub
- Microsoft 365

### Business & Delivery

- Requirements analysis
- Stakeholder collaboration
- KPI tracking
- Agile methodologies
- Team leadership
- QA/QC
- Product coordination

Do not show percentage proficiency.

---

## 9. Selected Work

Selected Work is one of the most important homepage sections.

Do not populate fake projects.

Initially use placeholders until actual projects are completed.

Target final portfolio:

- 2 Data Analytics Case Studies
- 2 Power BI Projects
- 1 Automation + Analytics Project

Each project card should show:

- Project number
- Project title
- Category
- One-sentence business/problem statement
- Tools
- View Project CTA

Project cards should be large and editorial rather than tiny dashboard thumbnails in a dense grid.

Where a real dashboard screenshot exists, use it.

Do not fabricate screenshots or outcomes.

---

## 10. Career Journey

This should be a signature portfolio section.

Show the progression:

```text
2015
Technical Support Engineer
        ↓
2017
Full Stack C# Software Developer
        ↓
2022
RPA Developer
        ↓
2025
RPA Development Lead
        ↓
2026
Senior Automation Developer / IT Lead
        ↓
Current Focus
Power BI + Data Analytics
```

This is not intended to replace the detailed Experience section.

Its purpose is to quickly communicate the career evolution.

Use a thin teal line and restrained typography.

Avoid a flashy animated timeline.

---

## 11. How I Work

Create a short professional methodology section.

The philosophy should be consistent with the project's established Power BI and Google Data Analytics approach:

### 01 — Understand

Start with the business problem and stakeholder needs.

### 02 — Validate

Understand the data, assumptions, quality, and limitations.

### 03 — Build

Clean and transform the data, create the model, and build reliable calculations or automation.

### 04 — Analyze

Look for trends, relationships, exceptions, and meaningful KPIs.

### 05 — Communicate

Turn findings into clear visual stories and practical recommendations.

This section is important because the portfolio should demonstrate thinking, not only outputs.

---

## 12. Work Page

The Work page should provide the complete project collection.

Use clear category filters or sections.

### Category A — Power BI & Analytics

Target: 2 projects.

Each should demonstrate:

- Power Query
- Data modeling
- Star schema where appropriate
- DAX
- Visualization
- Validation
- Business insight

### Category B — Data Analytics Case Studies

Target: 2 projects.

Use the Google Data Analytics workflow:

**Ask → Prepare → Process → Analyze → Share → Act**

### Category C — Automation & Data

Target: 1 project.

This should demonstrate the user's differentiator:

**Automation + Data + Business Intelligence**

---

## 13. Project Detail Template

Every project detail page should use a consistent analytical structure.

### Header

- Project title
- Category
- Short description
- Tools
- Project status

### Business Problem

What problem is being investigated?

### Stakeholders

Who would use or benefit from the analysis?

### Business Questions

What questions must the analysis answer?

### Data

Explain:

- source
- structure
- relevant tables
- relevant fields
- limitations
- assumptions

### Method

For analytics case studies:

**Ask → Prepare → Process → Analyze → Share → Act**

For Power BI projects:

**Data Review → Power Query → Data Model → DAX → Visualization → Validation → Insight**

### Results / Dashboard

Display the actual work.

Possible content:

- Power BI screenshots
- embedded Power BI report where appropriate
- charts
- tables
- analytical outputs

### Key Findings

Show the most important discoveries.

Insight titles should communicate meaning.

Prefer:

> Profitability declined despite higher sales.

over:

> Sales and Profit Chart

### Recommendations

Explain what a stakeholder should do.

### Reflection

Explain:

- what was learned
- important assumptions
- limitations
- what could be improved
- potential next analysis

### Artifacts

Where appropriate, provide links to:

- GitHub repository
- SQL queries
- documentation
- dataset/source
- Power BI report
- downloadable PDF presentation

Only include links that actually exist.

---

## 14. About Page

The About page should tell the career story in a human but professional way.

### Opening

Introduce Edward as an experienced technology and automation professional moving deeper into data analytics and Power BI.

### Career story

Explain the progression:

IT → Software Development → RPA → Leadership / IT → Data & BI

### Current focus

- Power BI
- Data Analytics
- Business Intelligence
- Data-driven decision making
- Automation + analytics

### Working philosophy

Emphasize:

- understand before building
- validate before trusting
- model before visualizing
- explain why a metric matters
- focus on business decisions

### Personal element

Keep it brief.

The portfolio should feel personal without becoming an autobiography.

---

## 15. Experience Page

Use the resume as the source of truth.

Experience should be presented in reverse chronological order.

Current supported roles:

### Senior Automation Developer / IT Lead
Dexterous Group Pty Limited
01/2026 – 04/2026

### RPA Development Lead
Dexterous Group Pty Limited
06/2025 – 01/2026

### RPA Developer
Dexterous Group Pty Limited
09/2022 – 05/2025

### Full Stack C# Software Developer
EHS Lens Philippines
09/2017 – 08/2022

### Technical Support Engineer
EHS Lens Philippines
07/2015 – 08/2017

Use concise achievement-oriented descriptions based only on the resume.

Where relevant, emphasize:

- 50+ automation solutions
- cross-functional leadership
- Power BI dashboards
- KPI tracking
- requirements analysis
- automation delivery
- IT operations
- software development
- databases
- stakeholder collaboration

Do not simply duplicate the entire resume.

The website should provide context; the resume remains the concise application document.

---

## 16. Credentials Page

### Certifications

Current resume-supported certifications:

- Microsoft Certified: Data Analyst Associate — Microsoft — July 2026
- Google Data Analytics Professional Certificate — Coursera — August 2026
- C# Programming using Microsoft .NET — UP System Information Technology Foundation / Microsoft C# .NET — February 2015
- Career Service Professional Eligibility — Civil Service Commission — October 2015

Only show credential IDs and credential URLs once the real values are provided.

Do not invent URLs.

### Education

Batangas State University
Bachelor of Science in Computer Science
2015

### Optional

A compact skills/technology section may appear here or on About.

---

## 17. Resume Page

Provide:

- Short explanation
- Resume preview or download
- Download Resume button

The resume should be a PDF asset supplied by the user.

Do not regenerate or rewrite the resume automatically.

Use the resume as the application-oriented version; the website should provide a richer narrative.

---

## 18. Contact Page

Keep this simple.

Include:

- Email
- LinkedIn
- GitHub

Use real URLs only when supplied.

The resume currently contains:

- edzarquiza@gmail.com
- LinkedIn profile
- github.com/edzarquiza

If the exact LinkedIn URL is not known, display the LinkedIn label but use a placeholder until supplied.

Do not expose the phone number by default on the public site unless the user explicitly decides to include it.

Optional contact form can be added later.

---

## 19. Footer

Minimal footer:

Edward Jon Arquiza

Power BI • Data Analytics • Automation

LinkedIn | GitHub | Email

Copyright

---

## 20. Technical Architecture

Preferred stack:

- React
- Vite
- Tailwind CSS
- TypeScript if practical; otherwise JavaScript
- React Router if multiple routes are needed

Use reusable components.

Suggested structure:

```text
src/
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── Hero
│   ├── SectionHeader
│   ├── CapabilityCard
│   ├── ProjectCard
│   ├── ProjectSection
│   ├── ExperienceItem
│   ├── CareerTimeline
│   ├── CertificationCard
│   ├── CTA
│   └── Button
│
├── pages/
│   ├── Home
│   ├── Work
│   ├── ProjectDetail
│   ├── About
│   ├── Credentials
│   ├── Resume
│   └── Contact
│
├── data/
│   ├── projects
│   ├── experience
│   ├── certifications
│   ├── skills
│   └── site
│
├── assets/
│
└── App
```

Keep content/data separate from UI components.

Adding a project should require editing project data rather than rewriting page components.

---

## 21. Responsive Design

Must support:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop is important for recruiter/hiring-manager viewing.

Mobile must still be polished.

Do not rely on hover for important content.

Navigation should collapse cleanly on mobile.

---

## 22. Accessibility

Implement:

- semantic HTML
- proper heading hierarchy
- keyboard navigation
- visible focus states
- meaningful alt text
- accessible buttons and links
- sufficient color contrast
- information that does not depend only on color

---

## 23. SEO

Use:

Title:

**Edward Jon Arquiza | Power BI, Data Analytics & Automation**

Meta description should describe the actual professional positioning.

Add:

- Open Graph metadata
- meaningful page titles
- semantic HTML
- descriptive URLs

Do not keyword-stuff.

---

## 24. Performance

Prioritize:

- fast load
- optimized images
- lazy loading where appropriate
- minimal dependencies
- clean component architecture

Avoid adding animation libraries unless necessary.

---

## 25. Motion

Use subtle motion only.

Acceptable:

- small fade/slide on section entry
- button hover transitions
- subtle card hover
- navigation transitions

Avoid:

- large parallax effects
- continuous animations
- animated backgrounds
- 3D objects
- distracting scroll effects

Motion should improve polish, not become part of the content.

---

## 26. Data Visualization Rules

When displaying project visuals:

- prioritize readability
- use teal/black/neutral tones where appropriate
- do not force the website palette onto analytical charts when another color is semantically necessary
- preserve meaning in charts
- do not use decorative charts without analytical purpose

The portfolio should demonstrate good visualization judgment.

---

## 27. Content Rules

Never use generic filler such as:

- "passionate about technology"
- "results-driven professional"
- "data enthusiast"
- "innovative problem solver"

unless it is supported by meaningful context.

Prefer concrete statements based on the resume and completed projects.

Do not claim:

- years of Power BI experience that are not supported
- senior data analyst experience if not supported
- advanced DAX expertise unless demonstrated
- business outcomes that were not measured
- client results from portfolio projects that did not actually occur

The user has substantial technology and automation experience. Use that fact instead of manufacturing data-analysis experience.

---

## 28. AI-Assisted Development Rule

Claude Code is an implementation partner.

It is acceptable to use AI to:

- generate React components
- refactor code
- create layouts
- troubleshoot
- improve accessibility
- implement responsive behavior
- create reusable structures

However:

- do not invent professional content
- do not fabricate project outcomes
- do not generate fake testimonials
- do not create fake company logos
- do not create fake data
- do not claim work was manually coded if that distinction becomes relevant
- explain unfamiliar architecture when requested

The portfolio's purpose is to demonstrate the user's actual capabilities and thinking.

---

## 29. Development Workflow

Do not build the entire finished website in one pass.

### Phase 1A — Foundation

Build:

- project setup
- design tokens
- global typography
- Navbar
- Footer
- Home
- About
- Experience
- Credentials
- Resume
- Contact
- Work architecture

Use real resume-supported content.

Use placeholders for projects.

### Phase 1B — Refine

Review:

- spacing
- typography
- mobile behavior
- navigation
- accessibility
- visual hierarchy

### Phase 2 — Real Projects

Add actual case studies and Power BI projects as they are completed.

### Phase 3 — Recruiter Optimization

Review the entire site as a hiring manager.

Ask:

- Is the candidate's value obvious?
- Is the career transition clear?
- Are the projects credible?
- Is the site easy to scan?
- Is there enough evidence of technical ability?
- Can I find the resume quickly?
- Can I contact the candidate quickly?

---

## 30. Definition of Done — Initial Version

The initial website is complete when:

- [ ] Navigation works
- [ ] Home page works
- [ ] About page works
- [ ] Work page architecture works
- [ ] Experience page works
- [ ] Credentials page works
- [ ] Resume page works
- [ ] Contact page works
- [ ] Responsive design works
- [ ] Teal / white / black visual system is consistent
- [ ] No fake projects
- [ ] No fake achievements
- [ ] No fake metrics
- [ ] No unnecessary flashy effects
- [ ] Project architecture can accept future case studies
- [ ] Content is easy to update
- [ ] Site is suitable for recruiter review

---

## 31. Critical Instruction to Claude Code

Before making major design or architectural changes, preserve these priorities:

1. **Professional credibility**
2. **Clarity**
3. **Recruiter usability**
4. **Career story**
5. **Project evidence**
6. **Modern visual quality**
7. **Animation/decorative effects**

Never reverse this priority order.

The portfolio should feel like:

> **An experienced technology professional presenting evidence of a move into Power BI and data analytics.**

It should never feel like:

> **A beginner trying to look like a senior through visual design.**

Build the product accordingly.



Google Data Analytics Professional Certificate
https://www.credly.com/badges/57e34b29-a7ca-423d-b81e-1bbbcbb25092/linked_in_profile
Aug 2026 No Expiry

Microsoft Certified: Data Analyst Associate
July 2026 Expiry August 2027
https://learn.microsoft.com/en-us/users/edwardjonarquiza-2722/transcript/d4rjka0nno1g1yj

Programming in C# Certification
UP System Information Technology Foundation
Feb 2019 No Expiry

Career Service Professional Eligibility
Civil Service Commission
Issued Oct 2015 · Expires Jan 2036



IMPORTANT DESIGN UPDATE:

Use the uploaded portfolio reference image as inspiration for the
OVERALL PAGE FLOW and SECTION RHYTHM.

Do NOT copy its branding, logo, content, typography, colors, illustrations,
project content, or exact visual design.

The desired structural flow is:

1. Navigation
2. Hero / Introduction
3. About + What I Do
4. Professional Impact / Career Evidence
5. Projects / Selected Work
6. Contact CTA
7. Footer

Adapt this structure specifically for Edward Jon Arquiza.

HERO:
Use a dark charcoal/near-black section.
Place Edward's professional photo on the right.
Place his introduction and professional positioning on the left.
Use white typography, blue-green accents, and warm yellow CTA buttons.

ABOUT:
Use a two-column layout.
Left side = core professional capabilities.
Right side = concise career story.

CAPABILITIES:
- Data & Analytics
- Automation
- Technology
- Business & Leadership

IMPACT:
Use real career evidence from the resume.
Potential examples:
- 7+ years technology experience
- 50+ automation solutions
- 400+ users supported
- Cross-functional leadership

Do not invent metrics.

PROJECTS:
This is the most important structural section.

Use alternating project layouts inspired by the reference:

Project 1:
Text left / visual right

Project 2:
Visual left / text right

Project 3:
Text left / visual right

Project 4:
Visual left / text right

The projects will eventually include:
- Data Analytics Case Study #1
- Power BI Project #1
- Automation + Analytics Project
- Data Analytics Case Study #2 / Power BI Project #2

Do not invent project content yet.

Each project should eventually support:
- title
- category
- business problem
- short description
- tools
- visual/screenshot
- key insight
- View Case Study link

CONTACT:
Do not use consulting language such as "Book a free consult."

This is an employment portfolio.

Use:

"Let's connect."

Supporting text:
"Open to opportunities in Power BI, data analytics, business intelligence, and automation."

Include:
- Resume
- LinkedIn
- Email

VISUAL IDENTITY:

Use:
- Blue-green as primary accent
- Warm yellow as CTA/action accent
- White backgrounds
- Dark charcoal sections
- Gray supporting text

The uploaded reference image is NOT a branding reference.
Use it only as inspiration for the page flow and alternating project layout.

The result should feel like Edward's own professional
Data + Automation + Business Intelligence portfolio.