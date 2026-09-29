import { useEffect, useState } from 'react'

export default function ScrollAids() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const scrollable = doc.scrollHeight - doc.clientHeight
        const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0
        setProgress(pct)
        setShowTop(doc.scrollTop > 600)
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

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-teal transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-charcoal shadow-md transition-all duration-200 hover:border-teal/50 hover:text-teal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}
