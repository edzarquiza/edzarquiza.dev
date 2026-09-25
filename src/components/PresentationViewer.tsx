import { useCallback, useEffect, useRef, useState } from 'react'
import Button from './Button'

type Slide = { src: string; alt: string }

type PresentationViewerProps = {
  slides: Slide[]
  pptxUrl: string
  aspectRatio: string
}

export default function PresentationViewer({ slides, pptxUrl, aspectRatio }: PresentationViewerProps) {
  const [active, setActive] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbStripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const total = slides.length

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo])
  const goNext = useCallback(() => goTo(active + 1), [active, goTo])

  // Prefetch neighboring slides so navigation feels immediate without loading the whole deck upfront
  useEffect(() => {
    const neighbors = [active - 1, active + 1].map((i) => ((i % total) + total) % total)
    neighbors.forEach((i) => {
      const img = new Image()
      img.src = slides[i].src
    })
  }, [active, slides, total])

  // Scroll only the thumbnail strip horizontally — scrollIntoView here would also scroll
  // the whole page vertically to reveal the strip, since it sits well below the fold.
  useEffect(() => {
    const strip = thumbStripRef.current
    const thumb = thumbRefs.current[active]
    if (!strip || !thumb) return
    const stripRect = strip.getBoundingClientRect()
    const thumbRect = thumb.getBoundingClientRect()
    if (thumbRect.left < stripRect.left) {
      strip.scrollBy({ left: thumbRect.left - stripRect.left - 16, behavior: 'smooth' })
    } else if (thumbRect.right > stripRect.right) {
      strip.scrollBy({ left: thumbRect.right - stripRect.right + 16, behavior: 'smooth' })
    }
  }, [active])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [goPrev, goNext])

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }

  return (
    <div
      ref={containerRef}
      className={isFullscreen ? 'flex h-full flex-col justify-center bg-charcoal px-6 py-8' : ''}
    >
      <div className={isFullscreen ? 'mx-auto w-full max-w-6xl' : ''}>
        <div className="relative overflow-hidden border border-border bg-surface" style={{ aspectRatio }}>
          <img
            src={slides[active].src}
            alt={slides[active].alt}
            className="h-full w-full object-contain"
          />
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal"
          />
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${isFullscreen ? 'text-white/70 hover:text-white' : 'text-charcoal hover:text-teal-text'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Previous
          </button>

          <p className={`font-mono text-xs ${isFullscreen ? 'text-white/60' : 'text-teal-text'}`} aria-live="polite">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${isFullscreen ? 'text-white/70 hover:text-white' : 'text-charcoal hover:text-teal-text'}`}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div
          ref={thumbStripRef}
          className="mt-4 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Slide thumbnails"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              ref={(el) => (thumbRefs.current[i] = el)}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-current={i === active}
              aria-label={`Go to slide ${i + 1}: ${slide.alt}`}
              onClick={() => goTo(i)}
              className={`shrink-0 overflow-hidden border-2 transition-colors ${
                i === active ? 'border-teal' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              style={{ width: 84, aspectRatio }}
            >
              <img src={slide.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isFullscreen ? 'text-white/70 hover:text-white' : 'text-charcoal hover:text-teal-text'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 6V3a1 1 0 0 1 1-1h3M14 6V3a1 1 0 0 0-1-1h-3M2 10v3a1 1 0 0 0 1 1h3M14 10v3a1 1 0 0 1-1 1h-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>

          {!isFullscreen && (
            <Button href={pptxUrl} download variant="primary">
              Download PPTX
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
