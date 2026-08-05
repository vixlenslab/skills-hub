import { useEffect, useState } from 'react'
import { Sun, Moon } from '@phosphor-icons/react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('vix-theme', dark ? 'dark' : 'light')
    } catch (e) {}
  }, [dark])

  return (
    <button
      onClick={() => setDark((d) => !d)}
      title="Alternar tema"
      aria-label="Alternar tema"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-vix-button border border-border bg-secondary text-secondary-foreground transition-colors hover:border-vix-amarelo hover:text-vix-amarelo"
    >
      {dark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
    </button>
  )
}
