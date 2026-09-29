import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function BackToProjectsFloat() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setShow(document.documentElement.scrollTop > 600)
        raf = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Link
      to="/work"
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal shadow-md transition-all duration-200 hover:border-teal/50 hover:text-teal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to Projects
    </Link>
  )
}
