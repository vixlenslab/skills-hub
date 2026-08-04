import SkillCard from './SkillCard'
import { categories } from '@/data/skills'

export default function SkillGrid({ skills, onCopy }) {
  if (!skills.length) {
    return (
      <div className="rounded-vix-input border border-dashed border-border py-16 text-center text-muted-foreground">
        Nenhuma skill encontrada.
      </div>
    )
  }

  const groups = {}
  for (const s of skills) {
    ;(groups[s.category] ||= []).push(s)
  }

  return (
    <div className="flex flex-col gap-8">
      {categories.map((cat) => {
        const list = groups[cat]
        if (!list) return null
        return (
          <section key={cat}>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="font-vix text-sm font-semibold uppercase tracking-wide text-foreground">
                {cat === 'Proprietária' ? 'Vixlens · Proprietárias' : cat}
              </h2>
              <span className="rounded-vix-chip bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {list.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <SkillCard key={s.name} skill={s} onCopy={onCopy} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
