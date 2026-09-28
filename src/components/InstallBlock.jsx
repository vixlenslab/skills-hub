import { useState } from 'react'
import { Copy, Check, Package, Terminal, ArrowClockwise } from '@phosphor-icons/react'
import { counts } from '@/lib/search'

// Cada linha se copia e se roda sozinha. A instalação dos plugins é uma linha
// só, encadeada com ";": funciona no PowerShell (5.1 e 7) e no Terminal do Mac.
// Não use "&&" (o PowerShell 5.1 do Windows rejeita). Plugin já instalado só é
// confirmado, então rodar de novo não faz mal.
const STEPS = [
  {
    label: '1. Registre o marketplace da Vixlens',
    hint: 'Só precisa fazer isso uma vez.',
    commands: ['claude plugin marketplace add vixlenslab/vixlens-ds'],
  },
  {
    label: '2. Instale os quatro plugins',
    hint: 'Uma linha só instala os quatro. vixlens-brand traz marca e documentos; vixlens-ui traz interface e código; vixlens-catalogo monta a tabela de preço no Figma e leva ao projeto de Marca Própria; vixlens-relatorios tira os relatórios mensais do Volpe.',
    commands: [
      'claude plugin install vixlens-brand; claude plugin install vixlens-ui; claude plugin install vixlens-catalogo; claude plugin install vixlens-relatorios',
    ],
  },
  {
    label: '3. Sempre que sair versão nova',
    // Eram cinco linhas de terminal na ordem certa. Quem trocava a ordem
    // atualizava o catálogo e não os plugins, e seguia na versão velha.
    hint: 'Esta aqui não é no terminal: digite no chat do Claude. Ele atualiza o catálogo e todos os plugins, diz o que mudou de versão e avisa para reiniciar.',
    commands: ['/atualizar-skills'],
    noTerminal: true,
  },
]

function CommandLine({ command, noTerminal, onCopy }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1400)
    })
  }

  // O comando de chat ganha destaque: é o único que não vai no terminal, e
  // confundir os dois é o erro que faz a pessoa achar que atualizou.
  return (
    <button
      onClick={copy}
      title="Clique para copiar esta linha"
      className={
        'group flex min-h-[44px] w-full items-center gap-2.5 rounded-vix-chip border px-3 py-2 text-left font-mono text-[12px] leading-relaxed transition-colors hover:border-vix-amarelo hover:text-foreground ' +
        (noTerminal
          ? 'border-vix-amarelo/40 bg-vix-amarelo/[0.07] text-foreground'
          : 'border-border bg-background text-muted-foreground')
      }
    >
      {copied ? (
        <Check size={15} weight="bold" className="shrink-0 text-vix-amarelo" />
      ) : (
        <Copy size={14} className="shrink-0 opacity-60 group-hover:opacity-100" />
      )}
      <span className="min-w-0 flex-1 break-all">{command}</span>
      {noTerminal && (
        <span className="shrink-0 rounded-vix-chip bg-vix-amarelo px-2 py-0.5 font-sans text-[10px] font-semibold text-black">
          no chat
        </span>
      )}
    </button>
  )
}

function CommandRow({ label, hint, commands, noTerminal, onCopy }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      {hint && <span className="text-[12px] leading-snug text-muted-foreground">{hint}</span>}
      <div className="mt-0.5 flex flex-col gap-2">
        {commands.map((c) => (
          <CommandLine key={c} command={c} noTerminal={noTerminal} onCopy={onCopy} />
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
            Quando o time publicar melhorias, você atualiza digitando{' '}
            <span className="font-mono text-foreground">/atualizar-skills</span> no chat do Claude — ele faz o resto
            sozinho, sem ninguém precisar te mandar arquivo.
          </p>
        </div>
      </div>

      {/* Pré-requisito */}
      <div className="flex items-start gap-2.5 rounded-vix-chip border border-border bg-muted px-3 py-2.5">
        <Terminal size={16} weight="bold" className="mt-0.5 shrink-0 text-muted-foreground" />
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Antes de começar: </span>
          os passos 1 e 2 rodam no <strong className="font-semibold text-foreground">terminal</strong> (PowerShell
          no Windows, Terminal no Mac; o Prompt de Comando antigo não roda a linha do passo 2), não dentro do chat do
          Claude. Precisa ter o Claude Code já instalado.
          O passo 3 é o contrário: vai no chat, e está marcado.
        </p>
      </div>

      {/* Comandos */}
      <div className="flex flex-col gap-4">
        {STEPS.map((s) => (
          <CommandRow key={s.label} label={s.label} hint={s.hint} commands={s.commands} noTerminal={s.noTerminal} onCopy={onCopy} />
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
          com permissão de edição no arquivo. A <span className="font-mono">/transitionsvix</span> roda de dentro do
          clone do AI-Vixlens e precisa do cofre do Volpe na máquina.
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
