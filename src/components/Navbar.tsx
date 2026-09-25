import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/site'
import Button from './Button'
import logo from '../assets/edward-logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white">
          <img src={logo} alt="" className="h-8 w-auto shrink-0" aria-hidden="true" />
          <span className="sm:hidden">{siteConfig.shortName}</span>
          <span className="hidden sm:inline">{siteConfig.name.toUpperCase()}</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `border-b-2 pb-0.5 text-sm font-medium transition-colors ${
                  isActive ? 'border-teal text-white' : 'border-transparent text-white/70 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/contact" variant="primary" className="px-5 py-2.5">
            Let&rsquo;s Connect
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-charcoal md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block py-3 text-base font-medium ${isActive ? 'text-teal' : 'text-white/80'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Button to="/contact" variant="primary" className="w-full">
                Let&rsquo;s Connect
              </Button>
            </li>
            <li className="pt-4 text-xs text-white/50">{siteConfig.location}</li>
          </ul>
        </nav>
      )}
    </header>
  )
}
