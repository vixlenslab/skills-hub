import { MagnifyingGlass, Sparkle, BookOpen, Package, ArrowRight } from '@phosphor-icons/react'
import { counts } from '@/lib/search'

const CAMINHOS = [
  {
    icon: Package,
    kicker: 'Comece por aqui',
    title: 'Instalar as skills da Vixlens',
    body: 'Dois comandos no terminal e você passa a ter as nossas skills em qualquer projeto — marca, documentos, interface.',
    cta: 'Ver como instalar',
    hash: '#/skills',
    tab: 'Proprietária',
    primary: true,
  },
  {
    icon: BookOpen,
    kicker: `${counts.capitulos} capítulos`,
    title: 'Entender como tudo funciona',
    body: 'O que são skills, plugins, crons, MCP, hooks e memória — e como criar os seus. Do zero ao avançado, sem enrolação.',
    cta: 'Abrir o guia',
    hash: '#/guia',
  },
  {
    icon: Sparkle,
    kicker: `${counts.skills} skills`,
    title: 'Explorar o catálogo',
    body: 'Tudo que está disponível no seu Claude Code, por categoria, com o comando pronto pra copiar.',
    cta: 'Ver as skills',
    hash: '#/skills',
  },
]

export default function HomePage({ onOpenSearch, onNavigate }) {
  return (
    <main className="mx-auto max-w-vix-site px-6 py-14">
      {/* Hero */}
      <div className="max-w-[62ch]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Vixlens · Claude Code
        </span>
        <h1 className="mt-3 font-vix text-[40px] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[48px]">
          Tudo que o Claude
          <br />
          já sabe fazer por aqui
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          O catálogo das <strong className="font-semibold text-foreground">{counts.skills} skills</strong> disponíveis,
          as <strong className="font-semibold text-foreground">{counts.vixlens} nossas</strong> — feitas pra Vixlens — e
          o guia que explica como usar, criar e compartilhar. Um lugar só.
        </p>

        <button
          onClick={onOpenSearch}
          className="mt-7 flex w-full max-w-md items-center gap-3 rounded-vix-input border border-input bg-secondary px-4 py-3.5 text-left transition-colors hover:border-vix-amarelo"
        >
          <MagnifyingGlass size={18} className="shrink-0 text-muted-foreground" />
          <span className="flex-1 text-[15px] text-muted-foreground">Buscar em skills e no guia...</span>
          <kbd className="shrink-0 text-[11px]">Ctrl K</kbd>
        </button>
      </div>

      {/* Caminhos */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {CAMINHOS.map((c) => (
          <button
            key={c.title}
            onClick={() => onNavigate(c.hash, c.tab)}
            className={
              'group flex flex-col items-start gap-3 rounded-vix-input border bg-card p-6 text-left transition-all ' +
              (c.primary
                ? 'border-vix-amarelo/45 shadow-[0_0_0_1px_rgba(250,198,23,0.15)] hover:border-vix-amarelo'
                : 'border-border hover:border-vix-amarelo/50')
            }
          >
            <c.icon size={22} weight="fill" className="text-vix-amarelo" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {c.kicker}
            </span>
            <h2 className="font-vix text-[18px] font-semibold leading-tight text-card-foreground">{c.title}</h2>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{c.body}</p>
            <span className="mt-auto flex items-center gap-1.5 pt-2 text-[13px] font-medium text-foreground">
              {c.cta}
              <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>

      {/* Rodapé de contexto */}
      <p className="mt-12 max-w-[62ch] text-[13px] leading-relaxed text-muted-foreground">
        As skills da Vixlens vivem em{' '}
        <a
          href="https://github.com/vixlenslab/vixlens-ds"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline decoration-vix-amarelo/50 underline-offset-4 hover:decoration-vix-amarelo"
        >
          vixlenslab/vixlens-ds
        </a>
        . Skill nova pra publicar ou dúvida: fala com o Otávio.
      </p>
    </main>
  )
}
