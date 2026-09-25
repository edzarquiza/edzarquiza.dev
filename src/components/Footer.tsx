import { Link } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-white/60">{siteConfig.positioning}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">Site</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">Connect</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/70 transition-colors hover:text-teal"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-teal"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-teal"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
            {siteConfig.positioning}
          </p>
        </div>
      </div>
    </footer>
  )
}
