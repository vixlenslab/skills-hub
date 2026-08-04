import { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlass, Sparkle, BookOpen } from '@phosphor-icons/react'
import { search } from '@/lib/search'
import { cn } from '@/lib/utils'

export default function SearchOverlay({ open, onClose, onPick }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => search(query), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      // espera o overlay pintar antes de focar
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setCursor(0), [query])

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursor((c) => Math.max(c - 1, 0))
      } else if (e.key === 'Enter' && results[cursor]) {
        e.preventDefault()
        onPick(results[cursor])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, cursor, onClose, onPick])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-vix-preto/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-vix-input border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <MagnifyingGlass size={18} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar em skills e no guia..."
            className="h-14 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="shrink-0 text-[11px]">esc</kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {query.trim().length < 2 && (
            <p className="px-3 py-6 text-center text-[13px] text-muted-foreground">
              Digite pra buscar entre as skills e os capítulos do guia.
            </p>
          )}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-muted-foreground">
              Nada encontrado para “{query}”.
            </p>
          )}
          {results.map((r, i) => {
            const Icon = r.kind === 'skill' ? Sparkle : BookOpen
            return (
              <button
                key={`${r.kind}-${r.id}`}
                data-active={i === cursor}
                onMouseEnter={() => setCursor(i)}
                onClick={() => onPick(r)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-vix-chip px-3 py-2.5 text-left transition-colors',
                  i === cursor ? 'bg-vix-amarelo/15' : 'hover:bg-secondary',
                )}
              >
                <Icon size={16} weight="fill" className="mt-0.5 shrink-0 text-vix-amarelo" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span className="font-vix text-[14px] font-semibold text-card-foreground">{r.title}</span>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {r.kind === 'skill' ? r.subtitle : 'Guia'}
                    </span>
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-[12px] leading-snug text-muted-foreground">
                    {r.body}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navegar
          </span>
          <span>
            <kbd>enter</kbd> abrir
          </span>
        </div>
      </div>
    </div>
  )
}
