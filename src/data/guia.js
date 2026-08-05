// Conteúdo do Guia Claude, em dados.
// Gerado a partir do guia-claude.html legado por scripts/convert-guia.py.
// A partir daqui, edite ESTE arquivo — o HTML antigo não é mais a fonte.

export const guia = {
  "hero": {
    "title": "Domina o Claude de vez",
    "lead": "Você tá usando 10% do que dá pra fazer. Esse guia muda isso. Sem blá-blá, sem papo acadêmico — só o que funciona na prática, na ordem certa pra aprender."
  },
  "sections": [
    {
      "id": "intro",
      "kicker": "Ponto de partida",
      "title": "O mapa do tesouro",
      "level": "",
      "lead": "Antes de sair usando tudo, entende o ecossistema. São três mundos diferentes com poderes diferentes.",
      "blocks": [
        {
          "type": "cards",
          "items": [
            {
              "title": "💬 Claude Chat",
              "body": "O claude.ai que você já conhece. Conversa, análise, criação de conteúdo, pesquisa. Simples. Mas tem uns segredos (Projetos, Artifacts) que a maioria ignora."
            },
            {
              "title": "⌨️ Claude Code",
              "body": "Claude que vive no seu terminal. Lê os seus arquivos, edita código, roda comandos. É tipo contratar um dev que trabalha na sua máquina. Assustador? Só no começo."
            },
            {
              "title": "🤝 Cowork",
              "body": "Claude Code configurado para trabalho em equipe e fluxos de negócio. Agents com papéis, skills de time, contexto compartilhado. Pensa como um escritório inteiro de IAs."
            }
          ]
        },
        {
          "type": "quote",
          "body": "A maioria das pessoas usa só o Chat. Quem usa o Code + Skills + Plugins tá jogando num jogo completamente diferente."
        },
        {
          "type": "h3",
          "text": "Qual usar quando?"
        },
        {
          "type": "table",
          "head": [
            "Situação",
            "Use"
          ],
          "rows": [
            [
              "Escrever copy, email, conteúdo, pesquisar",
              "<strong>Chat</strong>"
            ],
            [
              "Mexer em arquivos, código, git, automações",
              "<strong>Code</strong>"
            ],
            [
              "Projetos longos com contexto persistente",
              "<strong>Chat (com Projetos)</strong>"
            ],
            [
              "Tasks recorrentes especializadas",
              "<strong>Code + Skills</strong>"
            ],
            [
              "Trabalhar em equipe, múltiplas áreas",
              "<strong>Cowork</strong>"
            ]
          ]
        }
      ]
    },
    {
      "id": "mindset",
      "kicker": "Fundamentos",
      "title": "Como Claude pensa",
      "level": "",
      "lead": "Entender isso é o maior unlock que existe. A maioria nunca para pra pensar nisso.",
      "blocks": [
        {
          "type": "h3",
          "text": "Claude é literalmente amnésico por padrão"
        },
        {
          "type": "p",
          "body": "Cada nova conversa começa do <strong>zero absoluto</strong>. Claude não lembra que você existe. Não lembra do seu negócio. Não lembra que você prefere respostas curtas. Nada. Por isso você fica reexplicando as mesmas coisas toda hora."
        },
        {
          "type": "p",
          "body": "A solução? <strong>CLAUDE.md</strong>, <strong>Projetos</strong> e <strong>plugins de memória</strong>. Veremos cada um. Mas por enquanto: a razão das suas respostas serem genéricas é que Claude não te conhece."
        },
        {
          "type": "h3",
          "text": "Contexto = qualidade da resposta"
        },
        {
          "type": "p",
          "body": "Claude não é mágico. Ele responde baseado no que você deu pra ele. Pouco contexto = resposta genérica. Muito contexto relevante = resposta cirúrgica."
        },
        {
          "type": "compare",
          "sides": [
            {
              "kind": "bad",
              "label": "❌ Pergunta sem contexto",
              "text": "\"Escreve uma copy pra mim\"<br><br>Claude vai escrever algo genérico que poderia ser qualquer coisa pra qualquer empresa."
            },
            {
              "kind": "good",
              "label": "✅ Pergunta com contexto",
              "text": "\"Sou CMO de uma startup de software pra óticas. Público: oculistas pequenos. Produto: gestão de estoque. Escreve headline pra landing page.\"<br><br>Agora sim."
            }
          ]
        },
        {
          "type": "h3",
          "text": "As camadas de instrução (quem manda em quem)"
        },
        {
          "type": "p",
          "body": "Claude segue instruções em ordem de prioridade. Da mais fraca pra mais forte:"
        },
        {
          "type": "table",
          "head": [
            "Camada",
            "Onde fica",
            "Quando vale"
          ],
          "rows": [
            [
              "Personalidade base da Anthropic",
              "Embutida no modelo",
              "Sempre (mas pode ser sobrescrita)"
            ],
            [
              "CLAUDE.md global",
              "<code>~/.claude/CLAUDE.md</code>",
              "Em todos os projetos na sua máquina"
            ],
            [
              "CLAUDE.md do projeto",
              "<code>./CLAUDE.md</code>",
              "Só nesse projeto"
            ],
            [
              "Skill carregada",
              "<code>~/.claude/skills/</code> ou dentro de um plugin",
              "Quando você digita <code>/nome</code> ou quando o assunto bate com a descrição"
            ],
            [
              "Sua mensagem agora",
              "A conversa",
              "Prioridade máxima"
            ]
          ]
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "TL;DR do mindset:",
          "body": "Claude é um estagiário brilhante com amnésia total. Quanto mais contexto você der, mais ele brilha. Sua missão é criar sistemas que guardem esse contexto automaticamente."
        }
      ]
    },
    {
      "id": "chat",
      "kicker": "Chat",
      "title": "Claude Chat",
      "level": "Básico",
      "lead": "claude.ai — você já usa, mas provavelmente não usa os recursos que realmente importam.",
      "blocks": [
        {
          "type": "h3",
          "text": "Projetos — o recurso que muda tudo no Chat"
        },
        {
          "type": "p",
          "body": "Projetos são pastas de conversa com <strong>contexto persistente</strong>. Você configura uma vez, e todas as conversas dentro do projeto herdam esse contexto. Acabou de reexplicar teu negócio todo dia."
        },
        {
          "type": "p",
          "body": "O que colocar num projeto:"
        },
        {
          "type": "list",
          "items": [
            "<strong>Arquivo de contexto:</strong> O que é a empresa, produtos, público, tom de voz",
            "<strong>Instruções fixas:</strong> \"Sempre responde em português\", \"Não usa gerundismo\", \"Tom direto\"",
            "<strong>Documentos de referência:</strong> Brand guide, briefings, tabelas de preço",
            "<strong>Exemplos de output:</strong> Textos que você gosta, emails que funcionaram"
          ]
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Analogia:",
          "body": "Projeto é como contratar um funcionário e dar pra ele um onboarding completo. Em vez de repetir tudo pra cada conversa nova (estagiário novo todo dia), você faz o onboarding uma vez e pronto."
        },
        {
          "type": "h3",
          "text": "Artifacts — o canvas do Claude"
        },
        {
          "type": "p",
          "body": "Quando Claude gera código, HTML, SVG ou documento longo, aparece um <strong>Artifact</strong> ao lado. Você vê o resultado renderizado, pede alterações direto nele, e itera sem perder o histórico. É o jeito certo de fazer qualquer coisa visual ou técnica no Chat."
        },
        {
          "type": "h3",
          "text": "Memória automática"
        },
        {
          "type": "p",
          "body": "O ícone de livro no Chat — Claude pode salvar informações entre conversas. Você pode pedir: <em>\"Lembra que eu prefiro respostas sem introdução\"</em> ou <em>\"Salva que meu produto é X\"</em>. Funciona, mas é menos confiável que CLAUDE.md."
        },
        {
          "type": "h3",
          "text": "Modelos — qual usar?"
        },
        {
          "type": "table",
          "head": [
            "Modelo",
            "Quando usar",
            "Velocidade"
          ],
          "rows": [
            [
              "<strong>Opus 4.8</strong>",
              "Tarefa difícil, análise complexa, código desafiador. Quando qualidade importa mais que velocidade.",
              "☕ (vai buscar café)"
            ],
            [
              "<strong>Sonnet 4.6</strong>",
              "90% das tarefas. Ótimo equilíbrio. Padrão inteligente.",
              "⚡ rápido"
            ],
            [
              "<strong>Haiku 4.5</strong>",
              "Respostas rápidas, resumos, tasks simples.",
              "🚀 muito rápido"
            ]
          ]
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "Regra prática:",
          "body": "Começa com Sonnet. Só muda pro Opus se o Sonnet errar ou simplificar demais. Haiku só pra coisas que não precisam de raciocínio."
        }
      ]
    },
    {
      "id": "code",
      "kicker": "Code",
      "title": "Claude Code",
      "level": "Intermediário",
      "lead": "O Claude que vive no seu terminal e tem acesso real à sua máquina. Parece assustador. Na prática é libertador.",
      "blocks": [
        {
          "type": "h3",
          "text": "A diferença que muda sua vida"
        },
        {
          "type": "p",
          "body": "No Chat, você copia e cola código manualmente. No Code, Claude lê seu arquivo, faz a alteração, roda o teste e te fala o resultado. Você só aprova ou rejeita. É a diferença entre ter um assistente remoto e ter alguém sentado do seu lado."
        },
        {
          "type": "h3",
          "text": "Instalando e iniciando"
        },
        {
          "type": "code",
          "code": "npm install -g @anthropic-ai/claude-code\n\nclaude                    # abre sessão interativa\nclaude \"faz X no projeto\" # modo rápido, processa e sai\nclaude -p \"faz X\" --model opus  # escolhe modelo"
        },
        {
          "type": "h3",
          "text": "O que Claude Code consegue fazer"
        },
        {
          "type": "list",
          "items": [
            "Ler qualquer arquivo do seu sistema",
            "Editar código, criar arquivos, deletar (com confirmação)",
            "Rodar comandos no terminal (npm, git, python, o que for)",
            "Fazer commit, criar branch, abrir PR no GitHub",
            "Pesquisar na web, acessar APIs via MCP servers",
            "Spawnar outros Claudes pra trabalhar em paralelo"
          ]
        },
        {
          "type": "h3",
          "text": "Permissões — o segurança na porta"
        },
        {
          "type": "p",
          "body": "Claude pede confirmação antes de coisas destrutivas. Isso é bom. Você pode afinar o que ele pode ou não fazer sem pedir:"
        },
        {
          "type": "code",
          "code": "// .claude/settings.json\n{\n  \"permissions\": {\n    \"allow\": [\n      \"Bash(npm run *)\",\n      \"Bash(git *)\",\n      \"Read(**)\",\n      \"Edit(src/**)\"\n    ],\n    \"deny\": [\"Bash(rm -rf *)\"]\n  }\n}"
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "Não faça isso em produção:",
          "body": "<code>--dangerously-skip-permissions</code> desliga todas as confirmações. Claude vai fazer tudo sem perguntar. Use só em ambientes controlados e isolados."
        },
        {
          "type": "h3",
          "text": "Modos de operação"
        },
        {
          "type": "cards",
          "items": [
            {
              "title": "Interativo",
              "body": "Você conversa, Claude age. Perfeito pra desenvolvimento, análise, tarefas que precisam de vai-e-vem."
            },
            {
              "title": "Não-interativo (-p)",
              "body": "Manda um prompt, recebe resposta, sai. Perfeito pra scripts, CI/CD, automações."
            },
            {
              "title": "Pipe (|)",
              "body": "<code>cat arquivo | claude -p \"revisa\"</code>. Integra com qualquer pipeline Unix."
            },
            {
              "title": "Background (--bg)",
              "body": "Roda como agente em segundo plano enquanto você faz outra coisa."
            }
          ]
        },
        {
          "type": "h3",
          "text": "O Code lê automaticamente"
        },
        {
          "type": "p",
          "body": "Quando você abre uma sessão num diretório, Claude já leu:"
        },
        {
          "type": "list",
          "items": [
            "O <code>CLAUDE.md</code> do projeto e dos diretórios pai",
            "O status do git atual",
            "A estrutura de arquivos quando relevante"
          ]
        },
        {
          "type": "p",
          "body": "Não precisa ficar explicando a estrutura do projeto toda vez. É por isso que o CLAUDE.md vale tanto ouro."
        }
      ]
    },
    {
      "id": "cowork",
      "kicker": "Cowork",
      "title": "Claude Cowork",
      "level": "Intermediário",
      "lead": "Claude Code turboalimentado para trabalho em equipe. Agents com papéis definidos, skills de negócio, contexto compartilhado.",
      "blocks": [
        {
          "type": "h3",
          "text": "A diferença em uma linha"
        },
        {
          "type": "p",
          "body": "Code é você e Claude. Cowork é você, Claude e um ecossistema inteiro de agents especializados trabalhando juntos. Pensa como um escritório onde cada agent tem um papel."
        },
        {
          "type": "h3",
          "text": "Setup"
        },
        {
          "type": "code",
          "code": "/setup-cowork   # guia de configuração inicial"
        },
        {
          "type": "p",
          "body": "Ele pergunta seu papel (dev, designer, marketing, etc), instala as ferramentas certas e conecta com seus sistemas."
        },
        {
          "type": "h3",
          "text": "Skills exclusivas do ecossistema"
        },
        {
          "type": "cards",
          "items": [
            {
              "title": "/standup",
              "body": "Gera relatório de standup baseado no que você fez na última sessão. Chega de escrever update manual."
            },
            {
              "title": "/make-plan",
              "body": "Cria plano estruturado com etapas, dependências e estimativas. Antes de codificar, planeja."
            },
            {
              "title": "/timeline-report",
              "body": "Cronologia do que foi feito no projeto. Útil pra briefings e retrospectivas."
            },
            {
              "title": "/pathfinder",
              "body": "Mapeia um codebase que você nunca viu. Essencial ao entrar em projeto legado."
            },
            {
              "title": "/weekly-digests",
              "body": "Resumo semanal do que foi feito, automático, baseado na memória acumulada."
            },
            {
              "title": "/oh-my-issues",
              "body": "Analisa issues do GitHub e sugere prioridade, tamanho de esforço e próximos passos."
            }
          ]
        }
      ]
    },
    {
      "id": "skills",
      "kicker": "Superpoder 1",
      "title": "Skills",
      "level": "Iniciante",
      "lead": "Imagine dar ao Claude um “modo especialista” pra qualquer coisa que você faz repetido. É isso.",
      "blocks": [
        {
          "type": "p",
          "body": "Skill é uma pasta com um arquivo de texto dentro. Esse arquivo explica como fazer um tipo de tarefa: o formato, as regras, o que nunca fazer. Zero código: é português, escrito pro Claude ler."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Analogia:",
          "body": "Skill é o chapéu que o Claude coloca. <code>/proposta-comercial</code> = modo comercial da Vixlens. <code>/ui-boas-praticas</code> = modo designer chato que acha erro em tudo. <code>/manual-cliente</code> = modo documentação. Você escolhe o chapéu, ele muda de comportamento."
        },
        {
          "type": "h3",
          "text": "O pulo do gato: a descrição"
        },
        {
          "type": "p",
          "body": "O Claude não carrega todas as skills o tempo todo. Ele lê só a <em>descrição</em> de cada uma e puxa o resto quando o assunto bate. Ou seja: a descrição é o que decide se a sua skill vai ser usada ou vai morar esquecida numa pasta."
        },
        {
          "type": "compare",
          "sides": [
            {
              "kind": "bad",
              "label": "Descrição preguiçosa",
              "text": "\"Gera relatórios.\" O Claude nunca vai saber que aquele momento é a hora. Skill morta."
            },
            {
              "kind": "good",
              "label": "Descrição que funciona",
              "text": "\"Use quando pedirem relatório de produção, fechamento da semana ou números de surfaçagem.\" Agora ele reconhece."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Criar a sua"
        },
        {
          "type": "p",
          "body": "Uma pasta em <code>~/.claude/skills/</code>. No Windows é <code>C:\\Users\\seu-usuario\\.claude\\skills\\</code>, e dentro dela um <code>SKILL.md</code>. Só isso:"
        },
        {
          "type": "code",
          "label": "~/.claude/skills/relatorio-producao/SKILL.md",
          "code": "---\nname: relatorio-producao\ndescription: Monta o relatório semanal de produção do laboratório no padrão Vixlens. Use quando pedirem relatório de produção, fechamento da semana ou números de surfaçagem e montagem.\n---\n\n# Relatório de produção\n\n## Formato\n1. Cabeçalho com a semana (segunda a sábado)\n2. Tabela: lentes surfaçadas, montadas, refugo, % de refugo\n3. Comparativo com a semana anterior\n4. Ocorrências que travaram produção\n\n## Regras\n- Refugo acima de 3% entra em destaque, com a causa\n- Valores em português (1.234, não 1,234)\n\n## O que nunca fazer\n- Inventar número. Dado que não veio, escreve \"sem dado\""
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "Atalho:",
          "body": "não quer escrever na mão? Fala <code>/skill-creator</code> no chat. Você descreve o que quer, ele monta o arquivo pra você."
        },
        {
          "type": "h3",
          "text": "Usar"
        },
        {
          "type": "p",
          "body": "Fecha e abre o Claude Code. A partir daí, dois jeitos, e quem escolhe é a skill, não você:"
        },
        {
          "type": "table",
          "head": [
            "Tipo",
            "Como dispara",
            "Exemplo"
          ],
          "rows": [
            [
              "<strong>Você chama</strong>",
              "Digita <code>/nome-da-skill</code> no chat",
              "<code>/proposta-comercial</code>"
            ],
            [
              "<strong>Ela se chama</strong>",
              "O Claude sacou que o assunto bate e carregou sozinha",
              "O Design System entra em todo material sem ninguém pedir"
            ]
          ]
        },
        {
          "type": "p",
          "body": "Na lista de skills, as primeiras aparecem com barra. As segundas vêm marcadas como <code>ref</code>."
        },
        {
          "type": "h3",
          "text": "Onde a skill mora"
        },
        {
          "type": "table",
          "head": [
            "Local",
            "Quem enxerga",
            "Quando usar"
          ],
          "rows": [
            [
              "<code>~/.claude/skills/</code>",
              "Só você, em todos os projetos",
              "Rascunho, coisa sua"
            ],
            [
              "<code>.claude/skills/</code>",
              "Quem clonar aquele repositório",
              "Regra que só vale ali"
            ],
            [
              "Dentro de um plugin",
              "Todo mundo que instalar",
              "Quando virou padrão da casa"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Quando NÃO fazer skill"
        },
        {
          "type": "p",
          "body": "Tarefa única, que você vai fazer uma vez na vida: pede direto no chat e segue o baile. Skill vale quando é <strong>recorrente</strong> ou quando exige um conhecimento que o Claude não tem: o jeito Vixlens de fazer, o formato que o cliente espera, a regra que só a gente sabe."
        }
      ]
    },
    {
      "id": "plugins",
      "kicker": "Superpoder 2",
      "title": "Plugins",
      "level": "Intermediário",
      "lead": "Se skill é um chapéu, plugin é o armário inteiro, e um armário que dá pra mandar pra 55 pessoas de uma vez.",
      "blocks": [
        {
          "type": "p",
          "body": "Plugin é um pacote de skills com nome e versão. Sem plugin, compartilhar skill é mandar arquivo no zap e torcer pra pessoa colar na pasta certa. Com plugin, ela roda um comando. Quando você melhora alguma coisa, ela roda outro e já tá atualizada."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Analogia:",
          "body": "skill é contratar alguém e explicar uma tarefa. Plugin é o onboarding completo, versionado, e todo mundo que entrar recebe o mesmo, sem você repetir."
        },
        {
          "type": "p",
          "body": "O plugin mora num repositório do GitHub. Esse repositório é o <strong>marketplace</strong>, o catálogo, que pode ter vários plugins dentro. O nosso é o <code>vixlenslab/vixlens-ds</code>, com dois:"
        },
        {
          "type": "table",
          "head": [
            "Plugin",
            "O que tem dentro"
          ],
          "rows": [
            [
              "<strong>vixlens-brand</strong>",
              "Skill mestre da marca (paleta, tipografia, tokens, voz, vocabulário) mais comunicado interno, manual de cliente e proposta comercial"
            ],
            [
              "<strong>vixlens-ui</strong>",
              "Interface em React + Tailwind no padrão da casa, auditoria de 80 boas práticas de UI"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Instalar os nossos"
        },
        {
          "type": "code",
          "label": "Uma vez só, no terminal",
          "code": "claude plugin marketplace add vixlenslab/vixlens-ds\nclaude plugin install vixlens-brand\nclaude plugin install vixlens-ui"
        },
        {
          "type": "code",
          "label": "Quando sair versão nova",
          "code": "claude plugin marketplace update vixlens-marketplace\nclaude plugin update vixlens-brand@vixlens-marketplace\nclaude plugin update vixlens-ui@vixlens-marketplace"
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "No terminal, não no chat.",
          "body": "Esses comandos vão no Prompt de Comando, PowerShell ou Terminal do Mac, não dentro da conversa com o Claude. E precisa ter o Claude Code instalado antes."
        },
        {
          "type": "h3",
          "text": "Criar o seu"
        },
        {
          "type": "p",
          "body": "Duas pastas e dois arquivos de identificação. Essa é a receita inteira:"
        },
        {
          "type": "code",
          "label": "Estrutura",
          "code": "meu-repo/\n├── .claude-plugin/\n│   └── marketplace.json          ← o catálogo: lista os plugins do repo\n└── plugins/\n    └── meu-plugin/\n        ├── .claude-plugin/\n        │   └── plugin.json       ← a identidade: nome, versão, descrição\n        └── skills/\n            ├── skill-um/SKILL.md\n            └── skill-dois/SKILL.md"
        },
        {
          "type": "code",
          "label": "plugin.json",
          "code": "{\n  \"name\": \"meu-plugin\",\n  \"version\": \"0.1.0\",\n  \"description\": \"O que este plugin faz, em uma linha\",\n  \"author\": { \"name\": \"Seu Nome\" }\n}"
        },
        {
          "type": "code",
          "label": "marketplace.json",
          "code": "{\n  \"name\": \"meu-marketplace\",\n  \"owner\": { \"name\": \"Vixlens\", \"email\": \"contato@vixlens.com.br\" },\n  \"plugins\": [\n    {\n      \"name\": \"meu-plugin\",\n      \"source\": \"./plugins/meu-plugin\",\n      \"description\": \"O que este plugin faz\",\n      \"version\": \"0.1.0\"\n    }\n  ]\n}"
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "A pegadinha que já nos custou tempo:",
          "body": "o <code>source</code> tem que ser caminho começando com <code>./</code>. Só o nome do plugin o Claude recusa, e não recusa só aquele plugin, recusa o marketplace inteiro com um <code>Invalid input</code> que não explica nada."
        },
        {
          "type": "p",
          "body": "Feito isso, push no GitHub e acabou. Pra publicar uma correção depois: edita a skill, sobe o número da versão nos <strong>dois</strong> json e dá push."
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "Testa antes de subir:",
          "body": "<code>claude plugin marketplace add /caminho/da/pasta</code> aponta pro repo na sua máquina. Se aceitar ali, aceita no GitHub."
        }
      ]
    },
    {
      "id": "crons",
      "kicker": "Superpoder 3",
      "title": "Tarefas agendadas (cron)",
      "level": "Intermediário",
      "lead": "“Cron” é nome feio pra uma ideia simples: despertador. Você marca a hora, ele trabalha sozinho.",
      "blocks": [
        {
          "type": "p",
          "body": "Serve pro que é repetitivo e tem hora certa. Puxar os números toda segunda de manhã. Conferir se algum pedido travou. Montar o resumo do dia às 18h. Coisa que hoje alguém lembra de fazer, ou esquece."
        },
        {
          "type": "h3",
          "text": "Não precisa decorar sintaxe nenhuma"
        },
        {
          "type": "p",
          "body": "Fala a periodicidade em português dentro do Claude Code. Ele monta o agendamento:"
        },
        {
          "type": "code",
          "label": "No chat do Claude Code",
          "code": "Toda segunda às 8h, monte o relatório de produção da semana\nanterior e salve em C:\\vixfactory\\relatorios com a data no nome."
        },
        {
          "type": "p",
          "body": "Vale pra uma vez só também: \"amanhã às 15h me lembra de conferir o pedido da Ótica Central\". Pra ver o que tá agendado ou desligar algo, pergunta: \"quais tarefas eu tenho agendadas?\"."
        },
        {
          "type": "h3",
          "text": "Duas coisas que pegam todo mundo"
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "1. O app precisa estar aberto.",
          "body": "A tarefa roda enquanto o Claude Code tá aberto. Se estava fechado na hora marcada, ela roda quando você abrir de novo, atrasada, mas roda. Não confia nisso pra coisa com prazo duro."
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "2. A tarefa é amnésica.",
          "body": "Cada execução começa do zero absoluto, ela não lembra da conversa em que foi criada. O texto tem que se explicar sozinho: onde buscar, onde salvar, em que formato. <em>\"Faz igual a gente combinou\"</em> não funciona, porque na hora que rodar não existe \"a gente combinou\"."
        },
        {
          "type": "p",
          "body": "E se o que você quer é ficar de olho em algo que muda a qualquer momento, e não em hora marcada, agendamento é a ferramenta errada. Aí é só pedir pro Claude monitorar, que ele te avisa na hora que mudar."
        }
      ]
    },
    {
      "id": "mcp",
      "kicker": "MCP Servers",
      "title": "MCP Servers",
      "level": "Avançado",
      "lead": "Model Context Protocol. Basicamente: você dá ao Claude acesso a sistemas externos — GitHub, banco de dados, Google Drive, qualquer API.",
      "blocks": [
        {
          "type": "h3",
          "text": "O que são na prática"
        },
        {
          "type": "p",
          "body": "MCP servers são processos rodando em paralelo com o Claude que expõem ferramentas. Claude chama essas ferramentas exatamente como chama Read, Edit ou Bash. A diferença é que você define o que elas fazem."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Analogia:",
          "body": "Claude nasceu com mãos (Read, Edit, Bash). MCP server é você dar ao Claude um braço novo com ferramentas customizadas. \"Agora você tem acesso ao GitHub.\" \"Agora você consegue consultar nosso banco.\" \"Agora você lê o Google Drive.\""
        },
        {
          "type": "h3",
          "text": "Configurar um MCP server"
        },
        {
          "type": "code",
          "code": "// .claude/settings.json\n{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n      \"env\": { \"GITHUB_TOKEN\": \"seu_token_aqui\" }\n    }\n  }\n}"
        },
        {
          "type": "h3",
          "text": "MCP servers mais úteis no dia a dia"
        },
        {
          "type": "table",
          "head": [
            "Server",
            "O que dá pro Claude",
            "Caso de uso"
          ],
          "rows": [
            [
              "<code>server-github</code>",
              "Criar PRs, issues, ler repos",
              "Dev workflow completo"
            ],
            [
              "<code>server-filesystem</code>",
              "Acesso a pastas fora do projeto",
              "Arquivos em outros diretórios"
            ],
            [
              "<code>server-postgres</code>",
              "Consultar e escrever no banco",
              "Análise de dados, migrations"
            ],
            [
              "Figma MCP",
              "Ler designs, extrair tokens",
              "Design → código"
            ],
            [
              "Gmail MCP",
              "Ler e rascunhar emails",
              "Automação de email"
            ],
            [
              "Google Calendar MCP",
              "Ver e criar eventos",
              "Gestão de agenda"
            ]
          ]
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "Instale com critério:",
          "body": "MCP server tem acesso real ao sistema que ele conecta. Se é o GitHub server, Claude consegue criar, editar e deletar repos. Só instala de fontes confiáveis e revisa o que o server pode fazer."
        }
      ]
    },
    {
      "id": "hooks",
      "kicker": "Hooks",
      "title": "Hooks",
      "level": "Avançado",
      "lead": "Automações que disparam em resposta a eventos do Claude Code. Claude edita um arquivo? Roda prettier. Claude inicia sessão? Injeta contexto.",
      "blocks": [
        {
          "type": "h3",
          "text": "A regra de ouro: hooks vs skills"
        },
        {
          "type": "compare",
          "sides": [
            {
              "kind": "bad",
              "label": "📚 Use SKILL quando...",
              "text": "É uma orientação que <em>deve ser seguida</em>. Um estilo, um padrão, contexto especializado. Você ativa com <code>/nome</code>. Opcional."
            },
            {
              "kind": "good",
              "label": "⚙️ Use HOOK quando...",
              "text": "É algo que <em>deve acontecer sempre</em>, sem você precisar pedir. Formatar código, bloquear ações perigosas, logar eventos."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Eventos disponíveis"
        },
        {
          "type": "table",
          "head": [
            "Evento",
            "Quando dispara",
            "Exemplo de uso"
          ],
          "rows": [
            [
              "<code>SessionStart</code>",
              "Claude inicia",
              "Injetar contexto, ativar modo caveman"
            ],
            [
              "<code>UserPromptSubmit</code>",
              "Você envia mensagem",
              "Pré-processar, adicionar contexto ao prompt"
            ],
            [
              "<code>PreToolUse</code>",
              "Antes de qualquer ferramenta",
              "Bloquear ações perigosas"
            ],
            [
              "<code>PostToolUse</code>",
              "Depois de qualquer ferramenta",
              "Formatar código editado, notificações"
            ],
            [
              "<code>Stop</code>",
              "Sessão termina",
              "Gerar relatório, limpeza"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Hook na prática: prettier automático"
        },
        {
          "type": "code",
          "code": "// .claude/settings.json\n{\n  \"hooks\": {\n    \"PostToolUse\": [{\n      \"matcher\": \"Edit\",\n      \"hooks\": [{\n        \"type\": \"command\",\n        \"command\": \"npx prettier --write $CLAUDE_FILE_PATHS\"\n      }]\n    }]\n  }\n}"
        },
        {
          "type": "p",
          "body": "Agora toda vez que Claude edita um arquivo, prettier roda automaticamente. Nunca mais código mal formatado saindo de uma sessão."
        }
      ]
    },
    {
      "id": "memory",
      "kicker": "Memória",
      "title": "Sistema de Memória",
      "level": "Intermediário",
      "lead": "O problema: Claude tem amnésia. A solução: vários sistemas diferentes pra persistir contexto. Aqui estão todos.",
      "blocks": [
        {
          "type": "h3",
          "text": "Os 4 jeitos de dar memória ao Claude"
        },
        {
          "type": "cards",
          "items": [
            {
              "title": "1. CLAUDE.md",
              "body": "Arquivo de texto que Claude lê automaticamente. O mais confiável. Você escreve, ele lê toda sessão. Melhor pra contexto permanente."
            },
            {
              "title": "2. Projetos (Chat)",
              "body": "No claude.ai, Projetos têm contexto persistente. Arquivos, instruções e conversas ficam conectados. Perfeito pro Chat."
            },
            {
              "title": "3. Auto-memória",
              "body": "Claude Code salva memórias em arquivos quando você pede. <code>/memory</code> abre o arquivo. Pra preferências e contexto de projeto."
            },
            {
              "title": "4. claude-mem plugin",
              "body": "Worker que observa tudo e constrói base de conhecimento buscável. O mais poderoso, requer setup do worker."
            }
          ]
        },
        {
          "type": "h3",
          "text": "Auto-memória — os 4 tipos"
        },
        {
          "type": "p",
          "body": "Quando você pede ao Claude pra lembrar algo, ele cria um arquivo de memória categorizado:"
        },
        {
          "type": "table",
          "head": [
            "Tipo",
            "O que salvar",
            "Exemplo"
          ],
          "rows": [
            [
              "<code>user</code>",
              "Seu perfil e preferências",
              "\"Prefere respostas diretas sem introdução\""
            ],
            [
              "<code>feedback</code>",
              "Correções e confirmações",
              "\"Não usa comentários óbvios em código\""
            ],
            [
              "<code>project</code>",
              "Estado do projeto, decisões",
              "\"Projeto usa React 19, deploy na Vercel\""
            ],
            [
              "<code>reference</code>",
              "Onde encontrar informações",
              "\"Docs da API estão em /docs/api\""
            ]
          ]
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "Como pedir:",
          "body": "<em>\"Lembra que eu prefiro respostas sem introdução\"</em>, <em>\"Salva que o projeto usa Tailwind v4\"</em>, <em>\"Guarda que o deploy é feito com esse comando\"</em>."
        },
        {
          "type": "h3",
          "text": "Onde ficam as memórias"
        },
        {
          "type": "code",
          "code": "~/.claude/CLAUDE.md                    # global: sempre carregado\n~/.claude/projects/[projeto]/memory/  # memórias automáticas por projeto\n./CLAUDE.md                            # memória do projeto atual"
        }
      ]
    },
    {
      "id": "prompting",
      "kicker": "Arte do prompting",
      "title": "A Arte do Prompting",
      "level": "Intermediário",
      "lead": "Isso aqui vai ser difícil de ouvir: a maioria das respostas ruins que você recebe é culpa do prompt. Boas notícias: dá pra aprender.",
      "blocks": [
        {
          "type": "h3",
          "text": "A fórmula que funciona"
        },
        {
          "type": "quote",
          "body": "Contexto → Objetivo → Restrições → Pedido → Formato"
        },
        {
          "type": "h3",
          "text": "Na prática"
        },
        {
          "type": "compare",
          "sides": [
            {
              "kind": "bad",
              "label": "❌ Que a maioria faz",
              "text": "\"Escreve um email de vendas pro meu cliente\"<br><br>Claude vai inventar um cliente, um produto e um tom. Vai ficar genérico demais pra servir."
            },
            {
              "kind": "good",
              "label": "✅ O que funciona",
              "text": "\"Contexto: Software de gestão pra óticas pequenas. Cliente: Diego, oculista, 2 lojas, viu demo ontem. Objetivo: marcar reunião de fechamento. Tom: profissional mas direto. Máximo 150 palavras. Assunto: máximo 6 palavras.\""
            }
          ]
        },
        {
          "type": "h3",
          "text": "5 técnicas que mudam o jogo"
        },
        {
          "type": "h4",
          "text": "1. Mostre, não descreva"
        },
        {
          "type": "p",
          "body": "Em vez de descrever o estilo que quer, cole um exemplo. <em>\"Escreve no estilo deste parágrafo: [exemplo]\"</em> é mil vezes mais eficaz que <em>\"tom informal mas profissional\"</em>."
        },
        {
          "type": "h4",
          "text": "2. Diga o que NÃO fazer"
        },
        {
          "type": "p",
          "body": "Claude tem vieses. Proibir explicitamente funciona: <em>\"Não use 'transformar', 'elevar', 'jornada', 'potencializar'. Não comece frases com 'Além disso' ou 'Portanto'.\"</em>"
        },
        {
          "type": "h4",
          "text": "3. Peça o formato antes de responder"
        },
        {
          "type": "code",
          "code": "\"Responde neste formato:\nHEADLINE: [texto]\nSUBHEADLINE: [texto]\nCTA: [texto]\nJUSTIFICATIVA: [uma linha por item]\""
        },
        {
          "type": "h4",
          "text": "4. Peça pra pensar antes"
        },
        {
          "type": "code",
          "code": "\"Antes de escrever, identifica os 3 principais riscos\ndesta abordagem e como contornaria cada um. Depois escreve.\""
        },
        {
          "type": "h4",
          "text": "5. Itere precisamente"
        },
        {
          "type": "compare",
          "sides": [
            {
              "kind": "bad",
              "label": "❌ Vago",
              "text": "\"Melhora esse texto\"<br>\"Faz ficar melhor\"<br>\"Não gostei, refaz\""
            },
            {
              "kind": "good",
              "label": "✅ Cirúrgico",
              "text": "\"Mantém a estrutura, torna o tom 30% mais direto, corta todos os advérbios e remove a última frase\""
            }
          ]
        },
        {
          "type": "h3",
          "text": "Anti-padrões clássicos"
        },
        {
          "type": "table",
          "head": [
            "Você diz",
            "Claude entende",
            "O que fazer"
          ],
          "rows": [
            [
              "\"Melhora isso\"",
              "Muda qualquer coisa aleatória",
              "Especifica o que melhorar e como"
            ],
            [
              "\"Escreve sobre X\"",
              "Escreve Wikipedia sobre X",
              "Define ângulo, público, objetivo e tamanho"
            ],
            [
              "\"O que você acha?\"",
              "Resposta genérica e diplomática",
              "Perguntas critério específicas"
            ],
            [
              "\"Cria algo criativo\"",
              "Criativo segundo Claude, não você",
              "Dê referências, mostre exemplos, defina o que é criativo pra você"
            ]
          ]
        }
      ]
    },
    {
      "id": "claudemd",
      "kicker": "CLAUDE.md",
      "title": "CLAUDE.md",
      "level": "Intermediário",
      "lead": "O arquivo mais impactante que você pode criar. Claude lê automaticamente toda sessão. É o onboarding permanente.",
      "blocks": [
        {
          "type": "h3",
          "text": "Por que isso é o maior unlock do Code"
        },
        {
          "type": "p",
          "body": "Sem CLAUDE.md: você passa os primeiros 5 minutos de toda sessão explicando quem você é, o que é o projeto, como funciona a stack. Com CLAUDE.md bem escrito: Claude já sabe de tudo quando você digita a primeira mensagem."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "É sério:",
          "body": "Escrever um bom CLAUDE.md global (<code>~/.claude/CLAUDE.md</code>) é o investimento com maior ROI que existe no Claude Code. 30 minutos agora economiza horas por semana."
        },
        {
          "type": "h3",
          "text": "Template global (~/.claude/CLAUDE.md)"
        },
        {
          "type": "code",
          "code": "# Sobre mim\nSou [seu papel]. Trabalho principalmente com [tecnologias/áreas].\nNível técnico: [iniciante/intermediário/sênior] em [áreas].\n\n# Como prefiro trabalhar\n- Respostas diretas, sem introdução tipo \"Claro! Fico feliz em ajudar\"\n- Português brasileiro sempre\n- Perguntas antes de ação se o escopo for ambíguo\n- Código com comentários só quando realmente necessário\n\n# O que NUNCA fazer\n- Não adiciona features que não foram pedidas\n- Não refatora código fora do escopo\n- Não cria arquivos de doc sem pedir\n- Não usa gerundismo (\"Estou fazendo X\")\n\n# Meu contexto de negócio\n[Descreva: empresa, produto, público, tom de voz]"
        },
        {
          "type": "h3",
          "text": "Template de projeto (./CLAUDE.md)"
        },
        {
          "type": "code",
          "code": "# [Nome do Projeto]\n[Uma linha do que é o projeto]\n\n## Stack\n- Frontend: React 19 + TypeScript + Tailwind v4\n- Backend: Node.js + Express\n- DB: PostgreSQL (Supabase)\n- Deploy: Vercel (frontend) + Railway (backend)\n\n## Estrutura de pastas\nsrc/\n  components/    # componentes React reutilizáveis\n  pages/         # páginas Next.js\n  lib/           # utilitários e helpers\n  types/         # tipos TypeScript\n\n## Comandos que você precisa saber\nnpm run dev       # desenvolvimento local\nnpm run build     # build de produção\nnpm test          # roda testes\nnpm run lint      # lint + format check\n\n## Convenções do projeto\n- Componentes em PascalCase\n- Funções e hooks em camelCase\n- Commits: conventional commits (feat/fix/chore/docs)\n- Branches: feature/nome, fix/nome, chore/nome\n\n## Decisões de arquitetura importantes\n[Explica por que certas decisões foram tomadas,\nevita que Claude \"melhore\" o código desfazendo decisões]\n\n## O que NÃO mexer sem perguntar\n[Lista áreas críticas ou com dependências não óbvias]"
        }
      ]
    },
    {
      "id": "agents",
      "kicker": "Agentes",
      "title": "Exército de Claudes",
      "level": "Avançado",
      "lead": "Claude pode criar outros Claudes pra trabalhar em paralelo. Coisas grandes ficam rápidas quando você tem um exército.",
      "blocks": [
        {
          "type": "h3",
          "text": "A ideia por trás"
        },
        {
          "type": "p",
          "body": "Tarefas grandes têm partes independentes. Em vez de fazer uma por uma, o Claude principal delega a subagentes que rodam em paralelo. No final, sintetiza tudo. É como gerenciar uma equipe em vez de fazer tudo sozinho."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Exemplo real:",
          "body": "\"Audita todos os 50 componentes React deste projeto\" sem agentes = Claude lê um por um, leva horas. Com agentes = Claude spawna 10 agentes, cada um audita 5, termina em 10% do tempo."
        },
        {
          "type": "h3",
          "text": "Agentes disponíveis no caveman"
        },
        {
          "type": "table",
          "head": [
            "Agente",
            "Propósito",
            "Quando usar"
          ],
          "rows": [
            [
              "<strong>cavecrew-builder</strong>",
              "Edições cirúrgicas em 1-2 arquivos",
              "Typo, rename de variável, pequena função"
            ],
            [
              "<strong>cavecrew-investigator</strong>",
              "Localizar código (só leitura)",
              "\"Onde é definido X?\" — retorna file:line"
            ],
            [
              "<strong>cavecrew-reviewer</strong>",
              "Review de diff/branch",
              "\"Revisa esse PR\" — saída comprimida"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Agentes gerais"
        },
        {
          "type": "table",
          "head": [
            "Agente",
            "Para que"
          ],
          "rows": [
            [
              "<strong>Explore</strong>",
              "Busca ampla no codebase. \"Encontra todos os lugares que usam X\""
            ],
            [
              "<strong>Plan</strong>",
              "Arquiteta implementação antes de codificar"
            ],
            [
              "<strong>code-reviewer</strong>",
              "Review independente — perspectiva diferente do agente principal"
            ]
          ]
        },
        {
          "type": "box",
          "tone": "warn",
          "title": "Custo real:",
          "body": "Cada subagente tem contexto próprio e consome tokens. Use pra tarefas que genuinamente precisam de paralelismo. Não spawna agentes pra coisas simples — é canhão pra matar mosquito."
        }
      ]
    },
    {
      "id": "workflows",
      "kicker": "Fluxos",
      "title": "Fluxos na Prática",
      "level": "Avançado",
      "lead": "Recipes reais. Pega, adapta pro teu contexto, usa.",
      "blocks": [
        {
          "type": "h3",
          "text": "🖊️ Criar conteúdo de marketing"
        },
        {
          "type": "code",
          "code": "1. /customer-research    → quem é a persona de verdade\n2. /marketing-plan       → estratégia e canais\n3. /copywriting          → escreve o copy\n4. /humanizer            → remove padrões de IA do texto\n5. /copy-editing         → revisão final de qualidade"
        },
        {
          "type": "h3",
          "text": "⚙️ Desenvolver uma feature"
        },
        {
          "type": "code",
          "code": "1. \"Analisa o código atual e mapeia a arquitetura\"\n2. /design-taste-frontend  (se tiver componentes UI)\n3. \"Implementa [feature] seguindo os padrões do projeto\"\n4. /code-review            → revisa o que foi feito\n5. /verify                 → confirma que funciona no browser"
        },
        {
          "type": "h3",
          "text": "🔍 Pesquisa com relatório"
        },
        {
          "type": "code",
          "code": "1. /deep-research \"sua pergunta aqui\"\n   → múltiplas buscas, verifica fontes, sintetiza\n2. /humanizer              → remove padrões de IA\n3. /pdf                    → gera PDF do relatório"
        },
        {
          "type": "h3",
          "text": "🎯 Análise de concorrência"
        },
        {
          "type": "code",
          "code": "1. /competitor-profiling   → pesquisa o concorrente em profundidade\n2. /competitors            → gera página de comparação pra SEO\n3. /copywriting            → escreve positioning baseado no gap encontrado"
        },
        {
          "type": "h3",
          "text": "🚀 Lançamento de produto"
        },
        {
          "type": "code",
          "code": "1. /launch                 → plano de lançamento (framework ORB)\n2. /social                 → calendário de conteúdo pra redes\n3. /emails                 → sequência de lançamento por email\n4. /ads                    → estratégia de mídia paga\n5. /directory-submissions  → submete em diretórios de SaaS/AI"
        },
        {
          "type": "h3",
          "text": "Dicas de produtividade que realmente importam"
        },
        {
          "type": "list",
          "items": [
            "<strong>Uma sessão = uma tarefa.</strong> Misturar assuntos polui o contexto e piora as respostas.",
            "<strong>/compact quando a sessão ficar longa.</strong> Comprime histórico, mantém qualidade.",
            "<strong>CLAUDE.md bem escrito > qualquer prompt.</strong> 30 min investidos hoje = horas economizadas por semana.",
            "<strong>Itere rápido e preciso.</strong> Claude trabalha melhor com refinamentos específicos do que com pedidos vagos de melhoria.",
            "<strong>Verifique output crítico.</strong> Claude pode errar — especialmente em código novo, cálculos e fatos específicos. Não confie cegamente.",
            "<strong>Quando Claude errar, corrija e peça pra lembrar.</strong> \"Isso tá errado por causa de X. Lembra essa regra.\" Constrói memória útil."
          ]
        }
      ]
    },
    {
      "id": "shortcuts",
      "kicker": "Cola rápida",
      "title": "Atalhos de Teclado",
      "level": "",
      "lead": "Os que você vai usar toda hora.",
      "blocks": [
        {
          "type": "h3",
          "text": "Claude Code (terminal)"
        },
        {
          "type": "table",
          "head": [
            "Atalho",
            "O que faz"
          ],
          "rows": [
            [
              "<kbd>Enter</kbd>",
              "Envia mensagem"
            ],
            [
              "<kbd>Shift</kbd> + <kbd>Enter</kbd>",
              "Nova linha sem enviar (pra prompts longos)"
            ],
            [
              "<kbd>Ctrl</kbd> + <kbd>C</kbd>",
              "Cancela operação em andamento"
            ],
            [
              "<kbd>Ctrl</kbd> + <kbd>R</kbd>",
              "Busca no histórico de prompts anteriores"
            ],
            [
              "<kbd>↑</kbd> / <kbd>↓</kbd>",
              "Navega no histórico"
            ],
            [
              "<kbd>Shift</kbd> + <kbd>Tab</kbd>",
              "Auto-aceita todas as sugestões sem confirmar uma por uma"
            ],
            [
              "<kbd>Tab</kbd>",
              "Autocomplete de skill ou comando"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "Claude Chat (claude.ai)"
        },
        {
          "type": "table",
          "head": [
            "Atalho",
            "O que faz"
          ],
          "rows": [
            [
              "<kbd>Ctrl</kbd> + <kbd>Enter</kbd>",
              "Envia mensagem"
            ],
            [
              "<kbd>Ctrl</kbd> + <kbd>K</kbd>",
              "Nova conversa"
            ],
            [
              "<kbd>Ctrl</kbd> + <kbd>/</kbd>",
              "Busca nas conversas"
            ]
          ]
        }
      ]
    },
    {
      "id": "commands",
      "kicker": "Cola rápida",
      "title": "Comandos Slash Nativos",
      "level": "",
      "lead": "Comandos que vêm com o Claude Code — não são skills instaladas, são nativos.",
      "blocks": [
        {
          "type": "table",
          "head": [
            "Comando",
            "O que faz"
          ],
          "rows": [
            [
              "<code>/help</code>",
              "Lista tudo disponível na sessão atual"
            ],
            [
              "<code>/clear</code>",
              "Limpa a conversa, começa do zero"
            ],
            [
              "<code>/compact</code>",
              "Comprime o histórico sem perder contexto (use quando a sessão tá longa)"
            ],
            [
              "<code>/status</code>",
              "Modelo atual, uso de tokens, configurações ativas"
            ],
            [
              "<code>/cost</code>",
              "Custo estimado da sessão em tokens"
            ],
            [
              "<code>/model [nome]</code>",
              "Troca o modelo agora — ex: <code>/model opus</code>"
            ],
            [
              "<code>/memory</code>",
              "Abre o arquivo de memória do projeto pra editar"
            ],
            [
              "<code>/init</code>",
              "Cria um CLAUDE.md básico no projeto atual"
            ],
            [
              "<code>/review</code>",
              "Code review do diff atual"
            ],
            [
              "<code>/doctor</code>",
              "Diagnostica problemas de configuração"
            ],
            [
              "<code>/permissions</code>",
              "Gerencia o que Claude pode ou não fazer"
            ],
            [
              "<code>/config</code>",
              "Abre configurações interativas"
            ]
          ]
        },
        {
          "type": "box",
          "tone": "tip",
          "title": "Seu próximo passo agora mesmo:",
          "body": "Abre um editor, cria <code>~/.claude/CLAUDE.md</code> e escreve quem você é, suas preferências e contexto do negócio. Isso muda a qualidade das respostas a partir da próxima sessão."
        },
        {
          "type": "box",
          "tone": "fun",
          "title": "Checklist do iniciante ao avançado:",
          "body": "<br> ☐ Criou CLAUDE.md global<br> ☐ Criou Projeto no Chat com contexto da empresa<br> ☐ Instalou Claude Code e abriu primeira sessão<br> ☐ Usou 3 skills diferentes<br> ☐ Instalou os plugins da Vixlens (<code>vixlens-brand</code> e <code>vixlens-ui</code>)<br> ☐ Configurou claude-mem e rodou <code>npx claude-mem start</code><br> ☐ Criou sua própria skill pra algo recorrente<br> ☐ Configurou um MCP server<br> ☐ Criou um hook de automação<br> ☐ Rodou um workflow com subagentes"
        }
      ]
    }
  ]
}
