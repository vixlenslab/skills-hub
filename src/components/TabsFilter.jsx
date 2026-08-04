import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// aba proprietária em destaque + demais categorias
export default function TabsFilter({ tabs, active, onChange, counts }) {
  return (
    <div className="tabs-scroll flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const isActive = active === tab.value
        const isProp = tab.value === 'Proprietária'
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-vix-button border px-4 py-2 text-sm font-medium transition-all',
              isProp
                ? isActive
                  ? 'border-vix-amarelo bg-vix-amarelo text-vix-preto'
                  : 'border-vix-amarelo/50 bg-vix-amarelo/10 text-foreground hover:bg-vix-amarelo/20'
                : isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-secondary text-secondary-foreground hover:border-vix-amarelo/50',
            )}
          >
            {isProp && <Star size={14} weight="fill" />}
            {tab.label}
            {counts?.[tab.value] != null && (
              <span
                className={cn(
                  'rounded-vix-chip px-1.5 text-[11px] leading-tight',
                  isActive ? 'bg-black/10 dark:bg-white/15' : 'bg-background/60',
                )}
              >
                {counts[tab.value]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
