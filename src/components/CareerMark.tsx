import { siteConfig } from '../data/site'
import cutout from '../assets/edward-cutout.png'

export default function CareerMark() {
  return (
    <div className="relative flex w-full max-w-sm justify-center">
      {/* Primary light source — soft, off-center, restrained */}
      <div
        className="absolute -top-8 right-4 h-64 w-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(11,138,140,0.32) 0%, rgba(11,138,140,0) 70%)',
          filter: 'blur(44px)',
        }}
        aria-hidden="true"
      />

      {/* Faint warm counter-light, low corner */}
      <div
        className="absolute -bottom-7 left-2 h-32 w-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,194,71,0.1) 0%, rgba(255,194,71,0) 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      <img
        src={cutout}
        alt={`Portrait of ${siteConfig.name}`}
        className="relative z-10 h-auto w-full max-w-[400px] object-contain"
      />
    </div>
  )
}
