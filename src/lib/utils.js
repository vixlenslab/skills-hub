import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Atalho de skill sempre com "/". Comando de terminal (tem espaço, ex.: "npx claude-mem start")
// fica como está — ali a barra quebraria o comando.
export function skillCommand(command) {
  const cmd = String(command || '').trim()
  if (!cmd || cmd.startsWith('/') || /\s/.test(cmd)) return cmd
  return `/${cmd}`
}
