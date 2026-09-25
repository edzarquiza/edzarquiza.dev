export type IconName = 'support' | 'code' | 'automation' | 'leadership' | 'data' | 'infrastructure'

type IconProps = {
  name: IconName
  className?: string
}

export default function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  switch (name) {
    case 'support':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M3 4h18v11.5H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 20h6M12 15.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="m7 11 2.5-3.5L12 10l2-2.5L17 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'code':
      // Slanted brackets — subtle forward lean instead of symmetric chevrons
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M10 7 5 12l4 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 7l5 5-4 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'automation':
      // Segmented ring — a cyclical, automated process. Bold segments read clearly at small sizes.
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="2" strokeDasharray="8 5.2" strokeLinecap="round" />
        </svg>
      )
    case 'leadership':
      // A lead node connected outward — network, not clip-art figures. Bold, equal-weight dots for clarity at small sizes.
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M8 9 17 8M8 9l7 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="8" cy="9" r="3.4" fill="currentColor" />
          <circle cx="17.3" cy="8" r="2.6" fill="currentColor" />
          <circle cx="15.3" cy="19" r="2.6" fill="currentColor" />
        </svg>
      )
    case 'data':
      // Ascending slanted bars, mirroring the brand mark's diagonal geometry
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <polygon points="4,20 7,20 9,15 6,15" fill="currentColor" fillOpacity="0.55" />
          <polygon points="10,20 13,20 15,10 12,10" fill="currentColor" fillOpacity="0.8" />
          <polygon points="16,20 19,20 21,4 18,4" fill="currentColor" />
        </svg>
      )
    case 'infrastructure':
      // Stacked layers — systems/operations oversight, distinct from the team-leadership network mark
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <polygon points="4,7.5 12,4.5 20,7.5 12,10.5" fill="currentColor" />
          <polygon points="4,13 12,10 20,13 12,16" fill="currentColor" fillOpacity="0.75" />
          <polygon points="4,18.5 12,15.5 20,18.5 12,21.5" fill="currentColor" fillOpacity="0.5" />
        </svg>
      )
  }
}
