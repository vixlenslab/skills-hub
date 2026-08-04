import { useState } from 'react'
import { Copy, Check, Package, Terminal, ArrowClockwise } from '@phosphor-icons/react'

const STEPS = [
  {
    label: '1. Registre o marketplace da Vixlens',
    hint: 'Só precisa fazer isso uma vez.',
    command: 'claude plugin marketplace add vixlenslab/vixlens-ds',
  },
  {
    label: '2. Instale os dois plugins',
    hint: 'vixlens-brand traz marca e documentos. vixlens-ui traz interface e código.',
    command: 'claude plugin install vixlens-brand && claude plugin install vixlens-ui',
  },
  {
    label: '3. Sempre que sair versão nova',
    hint: 'A primeira linha atualiza o catálogo; as outras duas atualizam de fato cada plugin.',
    command: 'claude plugin marketplace update vixlens-marketplace
claude plugin update vixlens-brand@vixlens-marketplace
claude plugin update vixlens-ui@vixlens-marketplace',
  },
]

function CommandRow({ label, hint, command, onCopy }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      {hint && <span className="text-[12px] leading-snug text-muted-foreground">{hint}</span>}
      <button
        onClick={copy}
        title="Clique para copiar"
        className="group mt-0.5 flex min-h-[44px] w-full items-center gap-2.5 rounded-vix-chip border border-border bg-background px-3 py-2 text-left font-mono text-[12px] leading-relaxed text-muted-foreground transition-colors hover:border-vix-amarelo hover:text-foreground"
      >
        {copied ? (
          <Check size={15} weight="bold" className="shrink-0 text-vix-amarelo" />
        ) : (
          <Copy size={14} className="shrink-0 opacity-60 group-hover:opacity-100" />
        )}
        <span className="min-w-0 flex-1 break-all">{command}</span>
      </button>
    </div>
  )
}

export default function InstallBlock({ onCopy }) {
  return (
    <div className="flex flex-col gap-5 rounded-vix-input border border-border bg-card p-5">
      {/* Explicação */}
      <div className="flex items-start gap-3">
        <Package size={20} weight="fill" className="mt-0.5 shrink-0 text-vix-amarelo" />
        <div className="min-w-0 flex-1">
          <h2 className="font-vix text-[16px] font-semibold text-card-foreground">
            Como instalar as skills Vixlens
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            As 7 skills desta aba não vêm junto com o Claude Code — elas são nossas, e ficam num repositório da
            Vixlens. Você instala uma vez e elas passam a valer em qualquer projeto seu, não só num repo específico.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Quando o time publicar melhorias, você atualiza com um comando — sem ninguém precisar te mandar arquivo.
          </p>
        </div>
      </div>

      {/* Pré-requisito */}
      <div className="flex items-start gap-2.5 rounded-vix-chip border border-border bg-muted px-3 py-2.5">
        <Terminal size={16} weight="bold" className="mt-0.5 shrink-0 text-muted-foreground" />
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Antes de começar: </span>
          rode os comandos no <strong className="font-semibold text-foreground">terminal</strong> (Prompt de Comando,
          PowerShell ou Terminal do Mac), não dentro do chat do Claude. Precisa ter o Claude Code já instalado.
        </p>
      </div>

      {/* Comandos */}
      <div className="flex flex-col gap-4">
        {STEPS.map((s) => (
          <CommandRow key={s.command} label={s.label} hint={s.hint} command={s.command} onCopy={onCopy} />
        ))}
      </div>

      {/* Depois */}
      <div className="flex items-start gap-2.5 rounded-vix-chip border border-vix-amarelo/30 bg-vix-amarelo/[0.07] px-3 py-2.5">
        <ArrowClockwise size={16} weight="bold" className="mt-0.5 shrink-0 text-vix-amarelo" />
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Depois de instalar: </span>
          feche e abra o Claude Code. As skills com <span className="font-mono">/</span> você chama digitando o comando
          no chat. As marcadas como <span className="font-mono">ref</span> carregam sozinhas quando o assunto aparece —
          não precisa digitar nada.
        </p>
      </div>

      <p className="text-[12px] leading-relaxed text-muted-foreground">
        As skills das outras abas já vêm com o Claude Code ou com plugins públicos — essas você não precisa instalar.{' '}
        <a
          href="#/guia"
          className="text-foreground underline decoration-vix-amarelo/50 underline-offset-4 hover:decoration-vix-amarelo"
        >
          Leia o Guia Claude: skills, plugins, crons e o resto
        </a>
        .
      </p>
    </div>
  )
}
