import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-start px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-text">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-3 max-w-md font-serif text-sm leading-relaxed text-text-secondary">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-6">
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  )
}
