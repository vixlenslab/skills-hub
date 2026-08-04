import { useState } from 'react'
import { Copy, Check, Command, Sparkle, Lightbulb } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const badgeStyle = {
  Proprietária: 'bg-vix-amarelo text-vix-preto',
  Marketing: 'bg-secondary text-secondary-foreground',
  Design: 'bg-secondary text-secondary-foreground',
  Escrita: 'bg-secondary text-secondary-foreground',
  Plugin: 'bg-secondary text-secondary-foreground',
  Nativa: 'bg-secondary text-secondary-foreground',
}

const badgeLabel = {
  Proprietária: 'Vixlens',
}

export default function SkillCard({ skill, onCopy }) {
  const [copied, setCopied] = useState(false)
  const isRef = skill.type === 'reference'
  const isProp = skill.category === 'Proprietária'

  function copy() {
    navigator.clipboard.writeText(skill.command).then(() => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-vix-input border bg-card p-5 transition-all',
        isProp
          ? 'border-vix-amarelo/40 shadow-[0_0_0_1px_rgba(250,198,23,0.15)] hover:border-vix-amarelo'
          : 'border-border hover:border-vix-amarelo/50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="break-all font-vix text-[15px] font-semibold leading-tight text-card-foreground">
          {skill.name}
        </span>
        <span
          className={cn(
            'shrink-0 rounded-vix-chip px-2 py-1 text-[11px] font-medium leading-none',
            badgeStyle[skill.category] || 'bg-secondary text-secondary-foreground',
          )}
        >
          {badgeLabel[skill.category] || skill.category}
        </span>
      </div>

      <button
        onClick={copy}
        title={isRef ? 'Skill de referência — copiar nome' : 'Clique para copiar o comando'}
        className={cn(
          'group inline-flex w-fit max-w-full items-center gap-2 rounded-vix-chip border border-border bg-muted px-3 py-1.5 font-mono text-[13px] text-muted-foreground transition-colors hover:border-vix-amarelo hover:text-foreground',
        )}
      >
        {copied ? (
          <Check size={14} weight="bold" className="text-vix-amarelo" />
        ) : isRef ? (
          <Sparkle size={14} weight="bold" />
        ) : (
          <Command size={14} weight="bold" />
        )}
        <span className="truncate">{skill.command}</span>
        {!copied && <Copy size={13} className="opacity-50 group-hover:opacity-100" />}
        {isRef && (
          <span className="ml-1 rounded-vix-chip bg-background px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-muted-foreground">
            ref
          </span>
        )}
      </button>

      <p className="text-[13px] leading-relaxed text-muted-foreground">{skill.description}</p>

      {skill.tip && (
        <div className="mt-1 flex items-start gap-2 rounded-vix-chip border border-vix-amarelo/25 bg-vix-amarelo/[0.07] px-3 py-2">
          <Lightbulb size={15} weight="fill" className="mt-0.5 shrink-0 text-vix-amarelo" />
          <p className="text-[12px] leading-snug text-muted-foreground">
            <span className="font-semibold text-foreground">Quando usar: </span>
            {skill.tip}
          </p>
        </div>
      )}
    </div>
  )
}
