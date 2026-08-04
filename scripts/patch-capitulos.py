"""Substitui os capítulos de Skills/Plugins do guia e insere o de Crons.

O guia legado ensinava `npx skills add` e `.agents/skills/`, que não é o
caminho que a gente usa nem o que foi verificado na prática. Este script troca
esses dois capítulos por versões conferidas e acrescenta o de tarefas agendadas.

Uso: python scripts/patch-capitulos.py
"""

import io
import json
import os
import sys

OUT = 'src/data/guia.js'

SKILLS = {
    'id': 'skills',
    'kicker': 'Superpoder 1',
    'title': 'Skills',
    'level': 'Iniciante',
    'lead': 'Imagine dar ao Claude um “modo especialista” pra qualquer coisa que você faz repetido. É isso.',
    'blocks': [
        {
            'type': 'p',
            'body': 'Skill é uma pasta com um arquivo de texto dentro. Esse arquivo explica como fazer um tipo de tarefa: o formato, as regras, o que nunca fazer. Zero código — é português, escrito pro Claude ler.',
        },
        {
            'type': 'box',
            'tone': 'fun',
            'title': 'Analogia:',
            'body': 'Skill é o chapéu que o Claude coloca. <code>/proposta-comercial</code> = modo comercial da Vixlens. <code>/ui-boas-praticas</code> = modo designer chato que acha erro em tudo. <code>/manual-cliente</code> = modo documentação. Você escolhe o chapéu, ele muda de comportamento.',
        },
        {'type': 'h3', 'text': 'O pulo do gato: a descrição'},
        {
            'type': 'p',
            'body': 'O Claude não carrega todas as skills o tempo todo — ele lê só a <em>descrição</em> de cada uma e puxa o resto quando o assunto bate. Ou seja: a descrição é o que decide se a sua skill vai ser usada ou vai morar esquecida numa pasta.',
        },
        {
            'type': 'compare',
            'sides': [
                {
                    'kind': 'bad',
                    'label': 'Descrição preguiçosa',
                    'text': '"Gera relatórios." O Claude nunca vai saber que aquele momento é a hora. Skill morta.',
                },
                {
                    'kind': 'good',
                    'label': 'Descrição que funciona',
                    'text': '"Use quando pedirem relatório de produção, fechamento da semana ou números de surfaçagem." Agora ele reconhece.',
                },
            ],
        },
        {'type': 'h3', 'text': 'Criar a sua'},
        {
            'type': 'p',
            'body': 'Uma pasta em <code>~/.claude/skills/</code> — no Windows, <code>C:\\Users\\seu-usuario\\.claude\\skills\\</code> — e dentro dela um <code>SKILL.md</code>. Só isso:',
        },
        {
            'type': 'code',
            'label': '~/.claude/skills/relatorio-producao/SKILL.md',
            'code': '''---
name: relatorio-producao
description: Monta o relatório semanal de produção do laboratório no padrão Vixlens. Use quando pedirem relatório de produção, fechamento da semana ou números de surfaçagem e montagem.
---

# Relatório de produção

## Formato
1. Cabeçalho com a semana (segunda a sábado)
2. Tabela: lentes surfaçadas, montadas, refugo, % de refugo
3. Comparativo com a semana anterior
4. Ocorrências que travaram produção

## Regras
- Refugo acima de 3% entra em destaque, com a causa
- Valores em português (1.234, não 1,234)

## O que nunca fazer
- Inventar número. Dado que não veio, escreve "sem dado"''',
        },
        {
            'type': 'box',
            'tone': 'tip',
            'title': 'Atalho:',
            'body': 'não quer escrever na mão? Fala <code>/skill-creator</code> no chat. Você descreve o que quer, ele monta o arquivo pra você.',
        },
        {'type': 'h3', 'text': 'Usar'},
        {
            'type': 'p',
            'body': 'Fecha e abre o Claude Code. A partir daí, dois jeitos — e quem escolhe é a skill, não você:',
        },
        {
            'type': 'table',
            'head': ['Tipo', 'Como dispara', 'Exemplo'],
            'rows': [
                ['<strong>Você chama</strong>', 'Digita <code>/nome-da-skill</code> no chat', '<code>/proposta-comercial</code>'],
                [
                    '<strong>Ela se chama</strong>',
                    'O Claude sacou que o assunto bate e carregou sozinha',
                    'O Design System entra em todo material sem ninguém pedir',
                ],
            ],
        },
        {
            'type': 'p',
            'body': 'Na lista de skills, as primeiras aparecem com barra. As segundas vêm marcadas como <code>ref</code>.',
        },
        {'type': 'h3', 'text': 'Onde a skill mora'},
        {
            'type': 'table',
            'head': ['Local', 'Quem enxerga', 'Quando usar'],
            'rows': [
                ['<code>~/.claude/skills/</code>', 'Só você, em todos os projetos', 'Rascunho, coisa sua'],
                ['<code>.claude/skills/</code>', 'Quem clonar aquele repositório', 'Regra que só vale ali'],
                ['Dentro de um plugin', 'Todo mundo que instalar', 'Quando virou padrão da casa'],
            ],
        },
        {'type': 'h3', 'text': 'Quando NÃO fazer skill'},
        {
            'type': 'p',
            'body': 'Tarefa única, que você vai fazer uma vez na vida: pede direto no chat e segue o baile. Skill vale quando é <strong>recorrente</strong> ou quando exige um conhecimento que o Claude não tem — o jeito Vixlens de fazer, o formato que o cliente espera, a regra que só a gente sabe.',
        },
    ],
}

PLUGINS = {
    'id': 'plugins',
    'kicker': 'Superpoder 2',
    'title': 'Plugins',
    'level': 'Intermediário',
    'lead': 'Se skill é um chapéu, plugin é o armário inteiro — e um armário que dá pra mandar pra 55 pessoas de uma vez.',
    'blocks': [
        {
            'type': 'p',
            'body': 'Plugin é um pacote de skills com nome e versão. Sem plugin, compartilhar skill é mandar arquivo no zap e torcer pra pessoa colar na pasta certa. Com plugin, ela roda um comando. Quando você melhora alguma coisa, ela roda outro e já tá atualizada.',
        },
        {
            'type': 'box',
            'tone': 'fun',
            'title': 'Analogia:',
            'body': 'skill é contratar alguém e explicar uma tarefa. Plugin é o onboarding completo, versionado — e todo mundo que entrar recebe o mesmo, sem você repetir.',
        },
        {
            'type': 'p',
            'body': 'O plugin mora num repositório do GitHub. Esse repositório é o <strong>marketplace</strong> — o catálogo, que pode ter vários plugins dentro. O nosso é o <code>vixlenslab/vixlens-ds</code>, com dois:',
        },
        {
            'type': 'table',
            'head': ['Plugin', 'O que tem dentro'],
            'rows': [
                [
                    '<strong>vixlens-brand</strong>',
                    'Marca, Design System em documentos, comunicado interno, manual de cliente, proposta comercial',
                ],
                [
                    '<strong>vixlens-ui</strong>',
                    'Interface em React + Tailwind no padrão da casa, auditoria de 80 boas práticas de UI',
                ],
            ],
        },
        {'type': 'h3', 'text': 'Instalar os nossos'},
        {
            'type': 'code',
            'label': 'Uma vez só, no terminal',
            'code': 'claude plugin marketplace add vixlenslab/vixlens-ds\nclaude plugin install vixlens-brand\nclaude plugin install vixlens-ui',
        },
        {
            'type': 'code',
            'label': 'Quando sair versão nova',
            'code': 'claude plugin marketplace update vixlens-marketplace',
        },
        {
            'type': 'box',
            'tone': 'warn',
            'title': 'No terminal, não no chat.',
            'body': 'Esses comandos vão no Prompt de Comando, PowerShell ou Terminal do Mac — não dentro da conversa com o Claude. E precisa ter o Claude Code instalado antes.',
        },
        {'type': 'h3', 'text': 'Criar o seu'},
        {'type': 'p', 'body': 'Duas pastas e dois arquivos de identificação. Essa é a receita inteira:'},
        {
            'type': 'code',
            'label': 'Estrutura',
            'code': '''meu-repo/
├── .claude-plugin/
│   └── marketplace.json          ← o catálogo: lista os plugins do repo
└── plugins/
    └── meu-plugin/
        ├── .claude-plugin/
        │   └── plugin.json       ← a identidade: nome, versão, descrição
        └── skills/
            ├── skill-um/SKILL.md
            └── skill-dois/SKILL.md''',
        },
        {
            'type': 'code',
            'label': 'plugin.json',
            'code': '''{
  "name": "meu-plugin",
  "version": "0.1.0",
  "description": "O que este plugin faz, em uma linha",
  "author": { "name": "Seu Nome" }
}''',
        },
        {
            'type': 'code',
            'label': 'marketplace.json',
            'code': '''{
  "name": "meu-marketplace",
  "owner": { "name": "Vixlens", "email": "contato@vixlens.com.br" },
  "plugins": [
    {
      "name": "meu-plugin",
      "source": "./plugins/meu-plugin",
      "description": "O que este plugin faz",
      "version": "0.1.0"
    }
  ]
}''',
        },
        {
            'type': 'box',
            'tone': 'warn',
            'title': 'A pegadinha que já nos custou tempo:',
            'body': 'o <code>source</code> tem que ser caminho começando com <code>./</code>. Só o nome do plugin o Claude recusa — e não recusa só aquele plugin, recusa o marketplace inteiro com um <code>Invalid input</code> que não explica nada.',
        },
        {
            'type': 'p',
            'body': 'Feito isso, push no GitHub e acabou. Pra publicar uma correção depois: edita a skill, sobe o número da versão nos <strong>dois</strong> json e dá push.',
        },
        {
            'type': 'box',
            'tone': 'tip',
            'title': 'Testa antes de subir:',
            'body': '<code>claude plugin marketplace add /caminho/da/pasta</code> aponta pro repo na sua máquina. Se aceitar ali, aceita no GitHub.',
        },
    ],
}

CRONS = {
    'id': 'crons',
    'kicker': 'Superpoder 3',
    'title': 'Tarefas agendadas (cron)',
    'level': 'Intermediário',
    'lead': '“Cron” é nome feio pra uma ideia simples: despertador. Você marca a hora, ele trabalha sozinho.',
    'blocks': [
        {
            'type': 'p',
            'body': 'Serve pro que é repetitivo e tem hora certa. Puxar os números toda segunda de manhã. Conferir se algum pedido travou. Montar o resumo do dia às 18h. Coisa que hoje alguém lembra de fazer — ou esquece.',
        },
        {'type': 'h3', 'text': 'Não precisa decorar sintaxe nenhuma'},
        {'type': 'p', 'body': 'Fala a periodicidade em português dentro do Claude Code. Ele monta o agendamento:'},
        {
            'type': 'code',
            'label': 'No chat do Claude Code',
            'code': 'Toda segunda às 8h, monte o relatório de produção da semana\nanterior e salve em C:\\vixfactory\\relatorios com a data no nome.',
        },
        {
            'type': 'p',
            'body': 'Vale pra uma vez só também — "amanhã às 15h me lembra de conferir o pedido da Ótica Central". Pra ver o que tá agendado ou desligar algo, pergunta: "quais tarefas eu tenho agendadas?".',
        },
        {'type': 'h3', 'text': 'Duas coisas que pegam todo mundo'},
        {
            'type': 'box',
            'tone': 'warn',
            'title': '1. O app precisa estar aberto.',
            'body': 'A tarefa roda enquanto o Claude Code tá aberto. Se estava fechado na hora marcada, ela roda quando você abrir de novo — atrasada, mas roda. Não confia nisso pra coisa com prazo duro.',
        },
        {
            'type': 'box',
            'tone': 'warn',
            'title': '2. A tarefa é amnésica.',
            'body': 'Cada execução começa do zero absoluto — ela não lembra da conversa em que foi criada. O texto tem que se explicar sozinho: onde buscar, onde salvar, em que formato. <em>"Faz igual a gente combinou"</em> não funciona, porque na hora que rodar não existe "a gente combinou".',
        },
        {
            'type': 'p',
            'body': 'E se o que você quer é ficar de olho em algo que muda a qualquer momento — não em hora marcada — agendamento é a ferramenta errada. Aí é só pedir pro Claude monitorar, que ele te avisa na hora que mudar.',
        },
    ],
}


def main():
    if not os.path.exists(OUT):
        sys.exit(f'nao achei {OUT} — rode scripts/convert-guia.py antes')

    src = open(OUT, encoding='utf-8').read()
    head = src[: src.find('export const guia = ')]
    data = json.loads(src[src.find('{', src.find('export const guia =')) :].rstrip())

    out, done = [], False
    for s in data['sections']:
        if s['id'] == 'skills':
            out += [SKILLS, PLUGINS, CRONS]
            done = True
        elif s['id'] == 'plugins':
            continue
        else:
            out.append(s)
    if not done:
        sys.exit('secao #skills nao encontrada — nada foi alterado')

    data['sections'] = out
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    io.open(OUT, 'w', encoding='utf-8', newline='\n').write(head + f'export const guia = {payload}\n')

    print(f"{len(out)} secoes apos o patch")
    for s in out:
        print(f"  #{s['id']:<12} {len(s['blocks']):>3} blocos  {s['title'][:44]}")


if __name__ == '__main__':
    main()
