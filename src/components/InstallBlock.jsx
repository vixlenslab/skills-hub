import { useState } from 'react'
import { Copy, Check, Package, Terminal, ArrowClockwise } from '@phosphor-icons/react'
import { counts } from '@/lib/search'

// Um comando por linha, sempre: cada linha se copia e se roda sozinha.
const STEPS = [
  {
    label: '1. Registre o marketplace da Vixlens',
    hint: 'Só precisa fazer isso uma vez.',
    commands: ['claude plugin marketplace add vixlenslab/vixlens-ds'],
  },
  {
    label: '2. Instale os três plugins',
    hint: 'Rode uma linha de cada vez. vixlens-brand traz marca e documentos; vixlens-ui traz interface e código; vixlens-catalogo monta a tabela de preço no Figma.',
    commands: [
      'claude plugin install vixlens-brand',
      'claude plugin install vixlens-ui',
      'claude plugin install vixlens-catalogo',
    ],
  },
  {
    label: '3. Sempre que sair versão nova',
    hint: 'Rode uma linha de cada vez, nesta ordem: a primeira atualiza o catálogo; as outras atualizam de fato cada plugin.',
    commands: [
      'claude plugin marketplace update vixlens-marketplace',
      'claude plugin update vixlens-brand@vixlens-marketplace',
      'claude plugin update vixlens-ui@vixlens-marketplace',
      'claude plugin update vixlens-catalogo@vixlens-marketplace',
    ],
  },
]

function CommandLine({ command, onCopy }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <button
      onClick={copy}
      title="Clique para copiar esta linha"
      className="group flex min-h-[44px] w-full items-center gap-2.5 rounded-vix-chip border border-border bg-background px-3 py-2 text-left font-mono text-[12px] leading-relaxed text-muted-foreground transition-colors hover:border-vix-amarelo hover:text-foreground"
    >
      {copied ? (
        <Check size={15} weight="bold" className="shrink-0 text-vix-amarelo" />
      ) : (
        <Copy size={14} className="shrink-0 opacity-60 group-hover:opacity-100" />
      )}
      <span className="min-w-0 flex-1 break-all">{command}</span>
    </button>
  )
}

function CommandRow({ label, hint, commands, onCopy }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      {hint && <span className="text-[12px] leading-snug text-muted-foreground">{hint}</span>}
      <div className="mt-0.5 flex flex-col gap-2">
        {commands.map((c) => (
          <CommandLine key={c} command={c} onCopy={onCopy} />
        ))}
      </div>
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
            As {counts.vixlens} skills desta aba não vêm junto com o Claude Code. Elas são nossas, e ficam num repositório da
            Vixlens. Você instala uma vez e elas passam a valer em qualquer projeto seu, não só num repo específico.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Quando o time publicar melhorias, você atualiza rodando o passo 3, sem ninguém precisar te mandar arquivo.
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
          <CommandRow key={s.label} label={s.label} hint={s.hint} commands={s.commands} onCopy={onCopy} />
        ))}
      </div>

      {/* Depois */}
      <div className="flex items-start gap-2.5 rounded-vix-chip border border-vix-amarelo/30 bg-vix-amarelo/[0.07] px-3 py-2.5">
        <ArrowClockwise size={16} weight="bold" className="mt-0.5 shrink-0 text-vix-amarelo" />
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Depois de instalar: </span>
          feche e abra o Claude Code. Todo atalho de skill começa com <span className="font-mono">/</span> e é digitado
          no chat. As marcadas como <span className="font-mono">ref</span> carregam sozinhas quando o assunto aparece —
          digitar o comando só força na hora. Já as marcadas como <span className="font-mono">terminal</span> não são
          skills de chat: rodam no terminal, como os comandos aqui de cima. A{' '}
          <span className="font-mono">/tabela-optica-figma</span> ainda precisa do conector do Figma ligado, numa conta
          com permissão de edição no arquivo.
        </p>
      </div>

      <p className="text-[12px] leading-relaxed text-muted-foreground">
        As skills das outras abas já vêm com o Claude Code ou com plugins públicos. Essas você não precisa instalar.{' '}
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
