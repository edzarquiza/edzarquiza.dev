import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  backTo?: string
  backLabel?: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, description, backTo, backLabel, children }: PageHeaderProps) {
  return (
    <section className="border-b border-white/10 bg-charcoal">
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
        {backTo && (
          <Link
            to={backTo}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-teal"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {backLabel}
          </Link>
        )}
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-teal">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-white/70">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
