import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlass, Star, Package, List, X } from '@phosphor-icons/react'
import { skills, categories } from '@/data/skills'
import { cn } from '@/lib/utils'
import ThemeToggle from './components/ThemeToggle'
import TabsFilter from './components/TabsFilter'
import SkillGrid from './components/SkillGrid'
import InstallBlock from './components/InstallBlock'
import GuidePage from './components/GuidePage'
import HomePage from './components/HomePage'
import SearchOverlay from './components/SearchOverlay'
import NewsPage from './components/NewsPage'
import { temNovidade } from '@/data/novidades'

const TABS = [
  { value: 'Todas', label: 'Todas' },
  { value: 'Proprietária', label: 'Vixlens' },
  ...categories.filter((c) => c !== 'Proprietária').map((c) => ({ value: c, label: c })),
]

const HOME = '#/'
const SKILLS = '#/skills'
const GUIA = '#/guia'
const NOVIDADES = '#/novidades'

const NAV = [
  { hash: HOME, label: 'Início' },
  { hash: SKILLS, label: 'Skills' },
  { hash: GUIA, label: 'Guia' },
  { hash: NOVIDADES, label: 'Novidades', selo: temNovidade },
]

// Rotas por hash — cada página tem link próprio, compartilhável.
// `#/como-funciona` foi a URL da primeira versão do guia; segue redirecionando.
function resolve(hash) {
  if (hash.startsWith('#/como-funciona') || hash.startsWith(GUIA)) return GUIA
  if (hash.startsWith(NOVIDADES)) return NOVIDADES
  if (hash.startsWith(SKILLS)) return SKILLS
  return HOME
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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

  // Ctrl/⌘ + K abre a busca de qualquer página.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Trocar de rota tem que voltar pro topo — inclusive quando a pessoa clica no
  // menu ou cola a URL. Excecao: quando o destino e uma ancora dentro da pagina.
  const ancoraPendente = useRef(null)

  // Trocar de rota fecha o menu, senão ele fica aberto sobre a página nova.
  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  useEffect(() => {
    if (ancoraPendente.current) {
      const id = ancoraPendente.current
      ancoraPendente.current = null
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' }), 60)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [route])

  const navigate = useCallback((hash, tab, ancora) => {
    if (tab) setActive(tab)
    if (ancora) ancoraPendente.current = ancora
    if (window.location.hash === hash) {
      // Mesma rota: o hashchange nao dispara, entao resolve aqui.
      if (ancora) document.getElementById(ancora)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    window.location.hash = hash
  }, [])

  // Resultado da busca leva direto ao destino: skill no catálogo, capítulo no guia.
  const onPick = useCallback(
    (r) => {
      setSearchOpen(false)
      if (r.kind === 'skill') {
        setActive('Todas')
        setQuery(r.title)
        navigate(SKILLS)
      } else {
        navigate(GUIA, null, r.id)
      }
    },
    [navigate],
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-vix-site items-center gap-3 px-6 py-4 sm:gap-4 sm:py-5">
          <a href={HOME} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-vix-chip bg-vix-amarelo font-vix text-lg font-extrabold text-vix-preto">
              V
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block font-vix text-[15px] font-semibold tracking-tight text-foreground">
                Skills Vixlens
              </span>
              <span className="block truncate text-[12px] text-muted-foreground">catálogo e guia do Claude Code</span>
            </span>
          </a>

          {/* Desktop: nav inline. No mobile os quatro itens não cabem ao lado dos
              dois botões — o de Novidades quebrava linha por causa do ponto — então
              abaixo de md viram menu. */}
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.hash}
                href={n.hash}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-vix-chip px-3 py-2 text-[13px] font-medium transition-colors',
                  route === n.hash
                    ? 'bg-vix-amarelo text-vix-preto'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {n.label}
                {n.selo && route !== n.hash && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vix-amarelo" />
                )}
              </a>
            ))}
          </nav>

          {/* Os três botões andam juntos: um ml-auto no grupo, nunca em cada um,
              senão o espaço livre se divide entre eles. */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <button
            onClick={() => setSearchOpen(true)}
            title="Buscar (Ctrl K)"
            aria-label="Buscar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-vix-button border border-border bg-secondary text-secondary-foreground transition-colors hover:border-vix-amarelo hover:text-vix-amarelo"
          >
            <MagnifyingGlass size={16} weight="bold" />
          </button>
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-vix-button border border-border bg-secondary text-secondary-foreground transition-colors hover:border-vix-amarelo hover:text-vix-amarelo md:hidden"
          >
            {menuOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            {!menuOpen && temNovidade && route !== NOVIDADES && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-vix-amarelo" />
            )}
          </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 pb-3 pt-2 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.hash}
                href={n.hash}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex min-h-[48px] items-center gap-2 rounded-vix-chip px-3 text-[15px] font-medium transition-colors',
                  route === n.hash
                    ? 'bg-vix-amarelo text-vix-preto'
                    : 'text-foreground active:bg-secondary',
                )}
              >
                {n.label}
                {n.selo && route !== n.hash && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vix-amarelo" />
                )}
              </a>
            ))}
          </nav>
        )}
      </header>

      {route === HOME && <HomePage onOpenSearch={() => setSearchOpen(true)} onNavigate={navigate} />}

      {route === GUIA && <GuidePage onCopy={onCopy} />}

      {route === NOVIDADES && <NewsPage onNavigate={navigate} />}

      {route === SKILLS && (
        <>
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
                placeholder="Filtrar por nome ou descrição..."
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

          {active === 'Proprietária' && (
            <div className="mx-auto flex max-w-vix-site flex-col gap-4 px-6 pt-4">
              <div className="flex items-start gap-3 rounded-vix-input border border-vix-amarelo/40 bg-vix-amarelo/10 p-4">
                <Star size={20} weight="fill" className="mt-0.5 shrink-0 text-vix-amarelo" />
                <p className="text-[13px] leading-relaxed text-foreground">
                  <strong className="font-semibold">Skills proprietárias Vixlens.</strong> Construídas internamente
                  para o ecossistema (UI, Design System, marca e documentos). As de referência carregam por contexto;
                  as com <span className="font-mono">/</span> são invocáveis direto no chat.
                </p>
              </div>
              <InstallBlock onCopy={onCopy} />
            </div>
          )}

          <main className="mx-auto max-w-vix-site px-6 py-6">
            <div className="mb-4 text-[13px] text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
            </div>
            <SkillGrid skills={filtered} onCopy={onCopy} />
          </main>
        </>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onPick={onPick} />

      <div
        className={
          'fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-vix-button bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition-all ' +
          (toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0')
        }
      >
        Copiado!
      </div>
    </div>
  )
}
