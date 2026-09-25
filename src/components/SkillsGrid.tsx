import { skillCategories, SkillTier } from '../data/skills'

const tierStyles: Record<SkillTier, { label: string; item: string; gap: string }> = {
  primary: {
    label: 'text-base font-extrabold text-charcoal',
    item: 'text-sm text-charcoal/80',
    gap: 'mt-4 space-y-2',
  },
  secondary: {
    label: 'text-sm font-bold text-charcoal',
    item: 'text-sm text-text-secondary',
    gap: 'mt-3 space-y-2',
  },
  supporting: {
    label: 'text-sm font-semibold text-charcoal',
    item: 'text-xs text-text-secondary',
    gap: 'mt-3 space-y-1.5',
  },
  compact: {
    label: 'text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary',
    item: 'text-xs text-text-secondary/80',
    gap: 'mt-2',
  },
}

export default function SkillsGrid() {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
      {skillCategories.map((category) => {
        const style = tierStyles[category.tier]
        return (
          <div key={category.label}>
            <p className={style.label}>{category.label}</p>

            {category.tier === 'compact' ? (
              <p className={`${style.gap} ${style.item} leading-relaxed`}>{category.items.join(' · ')}</p>
            ) : (
              <ul className={style.gap}>
                {category.items.map((item) => (
                  <li key={item} className={style.item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {category.secondaryItems && category.secondaryItems.length > 0 && (
              <p className="mt-2 text-xs text-text-secondary/60">Also: {category.secondaryItems.join(', ')}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
