import { useEffect, useMemo, useState } from 'react'
import { MagnifyingGlass, Star, Package } from '@phosphor-icons/react'
import { skills, categories } from '@/data/skills'
import { cn } from '@/lib/utils'
import ThemeToggle from './components/ThemeToggle'
import TabsFilter from './components/TabsFilter'
import SkillGrid from './components/SkillGrid'
import InstallBlock from './components/InstallBlock'
import GuidePage from './components/GuidePage'

const TABS = [
  { value: 'Todas', label: 'Todas' },
  { value: 'Proprietária', label: 'Vixlens' },
  ...categories.filter((c) => c !== 'Proprietária').map((c) => ({ value: c, label: c })),
]

const GUIA_HASH = '#/guia'
const NAV = [
  { hash: '', label: 'Skills' },
  { hash: GUIA_HASH, label: 'Guia' },
]

// Rota por hash: o link do guia é compartilhável direto.
// `#/como-funciona` era a URL da versão anterior — mantida como redirect.
function resolve(hash) {
  if (hash.startsWith('#/como-funciona')) return GUIA_HASH
  return hash.startsWith(GUIA_HASH) ? GUIA_HASH : ''
}

function useRoute() {
  const [route, setRoute] = useState(() => resolve(window.location.hash))
  useEffect(() => {
    const onHash = () => setRoute(resolve(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('Todas')
  const [toast, setToast] = useState(false)
  const route = useRoute()

  const counts = useMemo(() => {
    const c = { Todas: skills.length }
    for (const s of skills) c[s.category] = (c[s.category] || 0) + 1
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return skills.filter((s) => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      const matchC = active === 'Todas' || s.category === active
      return matchQ && matchC
    })
  }, [query, active])

  function onCopy() {
    setToast(true)
    setTimeout(() => setToast(false), 1600)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-vix-site items-center gap-4 px-6 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-vix-chip bg-vix-amarelo font-vix text-lg font-extrabold text-vix-preto">
            V
          </div>
          <div className="min-w-0">
            <h1 className="font-vix text-[17px] font-semibold tracking-tight text-foreground">Skills Index</h1>
            <p className="truncate text-[13px] text-muted-foreground">
              Vixlens · referência rápida de skills do Claude Code
            </p>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.hash}
                href={n.hash || '#'}
                className={cn(
                  'rounded-vix-chip px-3 py-2 text-[13px] font-medium transition-colors',
                  route === n.hash
                    ? 'bg-vix-amarelo text-vix-preto'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {route === GUIA_HASH ? (
        <GuidePage onCopy={onCopy} />
      ) : (
        <>
      {/* Controls */}
      <div className="mx-auto flex max-w-vix-site flex-col gap-4 px-6 pb-2 pt-6">
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="h-12 w-full rounded-vix-input border border-input bg-secondary pl-11 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-vix-amarelo"
          />
        </div>
        <TabsFilter tabs={TABS} active={active} onChange={setActive} counts={counts} />
        {active !== 'Proprietária' && (
          <button
            onClick={() => setActive('Proprietária')}
            className="group flex w-fit items-center gap-2 rounded-vix-chip px-1 py-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Package size={16} weight="fill" className="text-vix-amarelo" />
            <span className="underline decoration-vix-amarelo/50 underline-offset-4 group-hover:decoration-vix-amarelo">
              Como instalar as skills Vixlens no seu Claude Code
            </span>
          </button>
        )}
      </div>

      {/* Banner proprietárias */}
      {active === 'Proprietária' && (
        <div className="mx-auto flex max-w-vix-site flex-col gap-4 px-6 pt-4">
          <div className="flex items-start gap-3 rounded-vix-input border border-vix-amarelo/40 bg-vix-amarelo/10 p-4">
            <Star size={20} weight="fill" className="mt-0.5 shrink-0 text-vix-amarelo" />
            <p className="text-[13px] leading-relaxed text-foreground">
              <strong className="font-semibold">Skills proprietárias Vixlens.</strong> Construídas internamente para o
              ecossistema (UI, Design System, marca e documentos). As de referência carregam por contexto; as com{' '}
              <span className="font-mono">/</span> são invocáveis direto no chat.
            </p>
          </div>
          <InstallBlock onCopy={onCopy} />
        </div>
      )}

      {/* Grid */}
      <main className="mx-auto max-w-vix-site px-6 py-6">
        <div className="mb-4 text-[13px] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
        </div>
        <SkillGrid skills={filtered} onCopy={onCopy} />
      </main>
        </>
      )}

      {/* Toast */}
      <div
        className={
          'fixed bottom-6 left-1/2 -translate-x-1/2 rounded-vix-button bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition-all ' +
          (toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0')
        }
      >
        Copiado!
      </div>
    </div>
  )
}
