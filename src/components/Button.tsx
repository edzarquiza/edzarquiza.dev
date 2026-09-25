import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-dark' | 'dark'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  icon?: ReactNode
  download?: boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-yellow text-charcoal hover:bg-yellow-dark',
  secondary:
    'bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal/60',
  ghost: 'bg-transparent text-teal-text hover:text-charcoal',
  'outline-dark': 'bg-transparent text-white border border-white/30 hover:border-white/70',
  dark: 'bg-charcoal text-white border border-charcoal hover:bg-charcoal/90',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  icon,
  download,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variantStyles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        {icon}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={download ? undefined : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
      >
        {children}
        {icon}
      </a>
    )
  }

  return <button className={classes}>{children}</button>
}
