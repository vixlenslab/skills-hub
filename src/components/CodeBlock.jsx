import { useState } from 'react'
import { Copy, Check } from '@phosphor-icons/react'

export default function CodeBlock({ children, onCopy, label }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).trim()

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-[12px] font-medium text-foreground">{label}</span>}
      <div className="relative rounded-vix-chip border border-border bg-muted">
        <button
          onClick={copy}
          title="Copiar"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-vix-chip border border-border bg-background text-muted-foreground transition-colors hover:border-vix-amarelo hover:text-foreground"
        >
          {copied ? <Check size={14} weight="bold" className="text-vix-amarelo" /> : <Copy size={13} />}
        </button>
        <pre className="overflow-x-auto px-3 py-3 pr-12 font-mono text-[12px] leading-relaxed text-muted-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
