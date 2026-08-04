import { useEffect, useState } from 'react'
import { Lightning, List } from '@phosphor-icons/react'
import { guia } from '@/data/guia'
import { cn } from '@/lib/utils'
import CodeBlock from './CodeBlock'
import { secoesComNovidade } from '@/data/novidades'

const LEVEL_STYLE = {
  Iniciante: 'bg-vix-amarelo text-vix-preto',
  Básico: 'bg-vix-amarelo text-vix-preto',
  Intermediário: 'bg-secondary text-secondary-foreground',
  Avançado: 'bg-secondary text-secondary-foreground',
}

const BOX_TONE = {
  fun: 'border-vix-amarelo/35 bg-vix-amarelo/[0.07]',
  tip: 'border-vix-amarelo/35 bg-vix-amarelo/[0.07]',
  warn: 'border-vix-amarelo/45 bg-vix-amarelo/[0.1]',
}

// O conteúdo vem do nosso próprio repositório e só carrega markup inline
// (strong/em/code/a/br/kbd), filtrado no conversor. Nada de entrada de usuário.
function Rich({ html, className }) {
  return <span className={cn('vix-rich', className)} dangerouslySetInnerHTML={{ __html: html }} />
}

function Block({ block, onCopy }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="mt-4 font-vix text-[18px] font-semibold text-foreground">{block.text}</h3>
    case 'h4':
      return <h4 className="mt-2 font-vix text-[15px] font-semibold text-foreground">{block.text}</h4>
    case 'p':
      return <Rich className="block max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground" html={block.body} />
    case 'quote':
      return (
        <blockquote className="max-w-[68ch] border-l-2 border-vix-amarelo pl-4 font-vix text-[17px] font-medium leading-relaxed text-foreground">
          <Rich html={block.body} />
        </blockquote>
      )
    case 'code':
      return (
        <CodeBlock onCopy={onCopy} label={block.label}>
          {block.code}
        </CodeBlock>
      )
    case 'box':
      return (
        <div
          className={cn(
            'max-w-[68ch] rounded-vix-chip border px-3.5 py-3',
            BOX_TONE[block.tone] || 'border-border bg-muted',
          )}
        >
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {block.title && <span className="font-semibold text-foreground">{block.title} </span>}
            <Rich html={block.body} />
          </p>
        </div>
      )
    case 'list':
      return (
        <ul className="flex max-w-[68ch] flex-col gap-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vix-amarelo" />
              <Rich html={it} />
            </li>
          ))}
        </ul>
      )
    case 'cards':
      return (
        <div className="grid max-w-[68ch] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((c, i) => (
            <div key={i} className="rounded-vix-chip border border-border bg-card p-4">
              <div className="font-vix text-[14px] font-semibold text-card-foreground">{c.title}</div>
              <Rich className="mt-2 block text-[13px] leading-relaxed text-muted-foreground" html={c.body} />
            </div>
          ))}
        </div>
      )
    case 'compare':
      return (
        <div className="grid max-w-[68ch] gap-3 sm:grid-cols-2">
          {block.sides.map((s, i) => (
            <div
              key={i}
              className={cn(
                'rounded-vix-chip border p-4',
                s.kind === 'good' ? 'border-vix-amarelo/40 bg-vix-amarelo/[0.07]' : 'border-border bg-card',
              )}
            >
              <span className="text-[13px] font-semibold text-foreground">
                {s.kind === 'good' ? '✅' : '❌'} {s.label}
              </span>
              <Rich className="mt-2 block text-[13px] leading-relaxed text-muted-foreground" html={s.text} />
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="max-w-[68ch] overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border">
                {block.head.map((h, i) => (
                  <th key={i} className="py-2 pr-4 font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {block.rows.map((r, i) => (
                <tr key={i} className={i < block.rows.length - 1 ? 'border-b border-border' : ''}>
                  {r.map((cell, j) => (
                    <td key={j} className="py-2.5 pr-4 align-top">
                      <Rich html={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids.join(',')])
  return active
}

export default function GuidePage({ onCopy }) {
  const ids = guia.sections.map((s) => s.id)
  const active = useActiveSection(ids)
  const [openToc, setOpenToc] = useState(false)

  return (
    <main className="mx-auto max-w-vix-site px-6 py-10">
      <div className="lg:flex lg:gap-10">
        {/* Índice lateral */}
        <aside className="lg:w-56 lg:shrink-0">
          <button
            onClick={() => setOpenToc((v) => !v)}
            className="mb-3 flex w-full items-center gap-2 rounded-vix-chip border border-border bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground lg:hidden"
          >
            <List size={16} weight="bold" />
            Índice do guia
          </button>
          <nav
            className={cn(
              'flex-col gap-0.5 lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto',
              openToc ? 'mb-6 flex' : 'hidden',
            )}
          >
            {guia.sections.map((s) => (
              <a
                key={s.id}
                href={`#/guia/${s.id}`}
                onClick={(e) => {
                  // A rota ja usa o hash, entao o scroll e feito na mao.
                  // 'instant' de proposito: com animacao o salto nao completa de
                  // forma confiavel e a pessoa para no meio do capitulo errado.
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
                  setOpenToc(false)
                }}
                className={cn(
                  'rounded-vix-chip px-3 py-1.5 text-[13px] transition-colors',
                  active === s.id
                    ? 'bg-vix-amarelo/15 font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {s.title}
                {secoesComNovidade.has(s.id) && (
                  <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-vix-amarelo align-middle" />
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <div className="min-w-0 flex-1">
          <div className="max-w-[68ch]">
            <div className="flex items-center gap-2">
              <Lightning size={18} weight="fill" className="text-vix-amarelo" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Guia Claude
              </span>
            </div>
            <h1 className="mt-2 font-vix text-[34px] font-extrabold leading-[1.15] tracking-tight text-foreground">
              {guia.hero.title}
            </h1>
            <Rich className="mt-4 block text-[16px] leading-relaxed text-muted-foreground" html={guia.hero.lead} />
          </div>

          <div className="mt-12 flex flex-col gap-12">
            {guia.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-border pt-10">
                {s.kicker && (
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {s.kicker}
                  </span>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <h2 className="font-vix text-[26px] font-semibold leading-tight tracking-tight text-foreground">
                    {s.title}
                  </h2>
                  {secoesComNovidade.has(s.id) && (
                    <span className="rounded-vix-chip bg-vix-amarelo px-2 py-1 text-[11px] font-medium leading-none text-vix-preto">
                      Novo
                    </span>
                  )}
                  {s.level && (
                    <span
                      className={cn(
                        'rounded-vix-chip px-2 py-1 text-[11px] font-medium leading-none',
                        LEVEL_STYLE[s.level] || 'bg-secondary text-secondary-foreground',
                      )}
                    >
                      {s.level}
                    </span>
                  )}
                </div>
                {s.lead && (
                  <Rich
                    className="mt-3 block max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground"
                    html={s.lead}
                  />
                )}
                <div className="mt-5 flex flex-col gap-5">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} onCopy={onCopy} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
