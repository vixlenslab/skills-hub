import { Sparkle, Wrench, ArrowsClockwise, BookOpen } from '@phosphor-icons/react'
import { novidades, ehRecente } from '@/data/novidades'
import { cn } from '@/lib/utils'

const TIPO = {
  novo: { label: 'Novo', icon: Sparkle, chip: 'bg-vix-amarelo text-vix-preto' },
  corrigido: { label: 'Corrigido', icon: Wrench, chip: 'bg-secondary text-secondary-foreground' },
  mudou: { label: 'Mudou', icon: ArrowsClockwise, chip: 'bg-secondary text-secondary-foreground' },
}

function formatarData(iso) {
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}

export default function NewsPage({ onNavigate }) {
  // Agrupa por data para não repetir o mesmo dia em cada item.
  const porData = novidades.reduce((acc, n) => {
    ;(acc[n.data] ||= []).push(n)
    return acc
  }, {})

  return (
    <main className="mx-auto max-w-vix-site px-6 py-10">
      <div className="max-w-[68ch]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          O que mudou
        </span>
        <h1 className="mt-2 font-vix text-[34px] font-extrabold leading-[1.15] tracking-tight text-foreground">
          Novidades
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
          Toda vez que uma skill nova entra, alguma coisa é corrigida ou o guia muda, aparece aqui. O que for dos
          últimos dias fica marcado com <span className="font-semibold text-foreground">Novo</span> também no guia.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {Object.entries(porData).map(([data, itens]) => (
          <section key={data} className="border-t border-border pt-8">
            <div className="flex items-baseline gap-3">
              <h2 className="font-vix text-[17px] font-semibold text-foreground">{formatarData(data)}</h2>
              {ehRecente(data) && (
                <span className="rounded-vix-chip bg-vix-amarelo px-2 py-0.5 text-[11px] font-medium leading-none text-vix-preto">
                  recente
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {itens.map((n) => {
                const t = TIPO[n.tipo] || TIPO.mudou
                return (
                  <article key={n.titulo} className="max-w-[68ch] rounded-vix-input border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-vix-chip px-2 py-1 text-[11px] font-medium leading-none',
                          t.chip,
                        )}
                      >
                        <t.icon size={12} weight="fill" />
                        {t.label}
                      </span>
                      <h3 className="font-vix text-[16px] font-semibold leading-tight text-card-foreground">
                        {n.titulo}
                      </h3>
                    </div>

                    <p
                      className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground vix-rich"
                      dangerouslySetInnerHTML={{ __html: n.corpo }}
                    />

                    {n.guia && (
                      <button
                        onClick={() => onNavigate?.('#/guia', null, n.guia)}
                        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground underline decoration-vix-amarelo/50 underline-offset-4 hover:decoration-vix-amarelo"
                      >
                        <BookOpen size={14} weight="fill" className="text-vix-amarelo" />
                        Ler no guia
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
