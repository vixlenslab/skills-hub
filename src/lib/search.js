import { skills } from '@/data/skills'
import { guia } from '@/data/guia'

const stripTags = (s) => String(s || '').replace(/<[^>]+>/g, ' ')

function blockText(b) {
  switch (b.type) {
    case 'p':
    case 'quote':
      return b.body
    case 'h3':
    case 'h4':
      return b.text
    case 'code':
      return `${b.label || ''} ${b.code}`
    case 'box':
      return `${b.title || ''} ${b.body}`
    case 'list':
      return b.items.join(' ')
    case 'cards':
      return b.items.map((c) => `${c.title} ${c.body}`).join(' ')
    case 'compare':
      return b.sides.map((s) => `${s.label} ${s.text}`).join(' ')
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ')
    default:
      return ''
  }
}

// Índice único: skills e capítulos do guia na mesma busca.
export const index = [
  ...skills.map((s) => ({
    kind: 'skill',
    id: s.name,
    title: s.name,
    subtitle: s.command,
    body: s.description,
    category: s.category,
    haystack: `${s.name} ${s.command} ${s.description} ${s.tip || ''}`.toLowerCase(),
  })),
  ...guia.sections.map((s) => {
    const body = stripTags(s.blocks.map(blockText).join(' '))
    return {
      kind: 'guia',
      id: s.id,
      title: s.title,
      subtitle: s.kicker || 'Guia Claude',
      body: stripTags(s.lead) || body.slice(0, 160),
      haystack: `${s.title} ${stripTags(s.lead)} ${body}`.toLowerCase(),
    }
  }),
]

/** Ordena por onde o termo bateu: título > começo do texto > qualquer lugar. */
export function search(query, limit = 12) {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return []
  return index
    .map((it) => {
      const at = it.haystack.indexOf(q)
      if (at === -1) return null
      const inTitle = it.title.toLowerCase().includes(q)
      return { ...it, score: (inTitle ? 0 : 1000) + at }
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
}

export const counts = {
  skills: skills.length,
  vixlens: skills.filter((s) => s.category === 'Proprietária').length,
  capitulos: guia.sections.length,
}
