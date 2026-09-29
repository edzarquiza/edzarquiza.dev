import type { ReactNode } from 'react'

type EyebrowTone = 'default' | 'invert' | 'muted' | 'mutedInvert'

const toneClasses: Record<EyebrowTone, string> = {
  default: 'text-teal-text',
  invert: 'text-teal',
  muted: 'text-text-secondary',
  mutedInvert: 'text-white/40',
}

type EyebrowProps = {
  children: ReactNode
  tone?: EyebrowTone
  className?: string
}

export default function Eyebrow({ children, tone = 'default', className = '' }: EyebrowProps) {
  return (
    <p className={`font-sans text-xs font-semibold uppercase tracking-[0.06em] ${toneClasses[tone]} ${className}`}>
      {children}
    </p>
  )
}
