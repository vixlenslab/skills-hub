// Changelog do hub, das skills e do guia. Mais recente primeiro.
//
// tipo: 'novo' | 'corrigido' | 'mudou'
// guia: id da seção do guia que essa entrada afeta (opcional). Usado para
//       marcar o capítulo com um selo "Novo" enquanto a entrada estiver
//       dentro da janela de DIAS_NOVIDADE.
//
// Datas em AAAA-MM-DD.

export const DIAS_NOVIDADE = 21

export const novidades = [
  {
    data: '2026-10-01',
    titulo: 'Catálogo sai com o nome que a ótica deu às linhas',
    tipo: 'mudou',
    corpo:
      'O simulador de markup ganhou a tabela <strong>Nome das suas linhas</strong>: a ótica de marca própria escreve, uma vez, o nome de cada linha dela ao lado da equivalente Vixlens (Virtu Start = Vix Total). O nome vai no CSV numa coluna nova, a 29ª, <code>Linha do cliente</code>, e a <strong>vixlens-catalogo 0.10.0</strong> usa esse nome como título da família no catálogo — só pergunta o de-para do que vier em branco. As 28 colunas de antes não mudaram, e CSV antigo segue aceito. No mesmo dia, os códigos das 13 famílias de marca própria passaram para os da Matriz (15000–15437), iguais para todo cliente de MP.',
  },
  {
    data: '2026-09-30',
    titulo: 'Promovix do mês ganhou skill: /promovix',
    tipo: 'novo',
    corpo:
      'A tabela promocional mensal agora sai de um Excel. A <strong>vixlens-catalogo 0.9.0</strong> traz a <code>/promovix</code>: você atualiza mês, validade e preços no Excel modelo, e ela confere tudo antes de ir ao Figma — calcula Reflecta Guard e Blue pela regra dos 50%, acusa preço fora da regra e cor Transitions fora de ordem — e monta as páginas no layout novo. A tabela é a mesma do catálogo, com cara de promoção: faixa amarelo-clara e adesivo <strong>REFLECTA −50%</strong> nas colunas em oferta, preço em negrito, rodapé com a validade em toda página e o painel VixClub. A Promovix de outubro já foi gerada assim.',
  },
  {
    data: '2026-09-28',
    titulo: 'Os quatro plugins numa linha: claude plugin install vixlens',
    tipo: 'mudou',
    corpo:
      'Novo plugin <strong>vixlens</strong>, um pacote sem skill própria que puxa os quatro de uma vez: <code>vixlens-brand</code>, <code>vixlens-ui</code>, <code>vixlens-catalogo</code> e <code>vixlens-relatorios</code>. Instalar virou <code>claude plugin install vixlens</code>, no terminal. Atualizar continua sendo <code>/atualizar-skills</code> no chat, porque o update do pacote não sobe as dependências.',
  },
  {
    data: '2026-09-28',
    titulo: 'Marca própria ganhou skill: /marca-propria',
    tipo: 'novo',
    corpo:
      'Pedir "marca própria da ótica X" numa sessão aberta em outra pasta levava o Claude a procurar o gerador no lugar errado, ou a cair na <code>/manual-cliente</code>, que monta outro manual e não passa pelas 7 travas. A <strong>vixlens-catalogo 0.8.0</strong> traz a <code>/marca-propria</code>: ela acha a pasta do Drive compartilhado em qualquer letra de unidade, manda ler o <code>CLAUDE.md</code> de lá antes de tudo e resolve as pegadinhas do Windows (<code>python</code> no lugar de <code>python3</code>, o <code>pdfplumber</code> da trava 7). As regras não mudaram e continuam só no Drive.',
  },
  {
    data: '2026-09-28',
    titulo: 'Índice do catálogo sem vermelho no cilindro',
    tipo: 'mudou',
    corpo:
      'O <code>0.00 a -4.00</code> das famílias de entrada saía em vermelho na matriz de receita. A pedido do Otávio, a <strong>vixlens-catalogo 0.7.1</strong> tirou a cor: o cilindro sai igual às outras linhas, e a nota abaixo da matriz fala só do negrito da Alt. mín. Na tabela da Native, a coluna Pág. vazava 16px pela borda por causa das larguras antigas; corrigido direto no Figma.',
  },
  {
    data: '2026-09-28',
    titulo: 'Atualizar as skills virou um comando só',
    tipo: 'novo',
    corpo:
      'Eram cinco linhas de terminal, na ordem certa: primeiro o catálogo do marketplace, depois um update para cada plugin. Quem trocava a ordem atualizava o catálogo e não os plugins, e seguia na versão velha achando que tinha atualizado — e a lista crescia a cada plugin novo. Agora é <code>/atualizar-skills</code>, digitado no chat do Claude. Ele roda os comandos por dentro, descobre os plugins sozinho (plugin novo entra sem ninguém mexer aqui), diz o que mudou de versão e avisa para reiniciar. Os passos 1 e 2, de instalação, continuam no terminal.',
  },
  {
    data: '2026-09-28',
    titulo: 'Catálogo mais barato de imprimir: famílias dividem página',
    tipo: 'novo',
    corpo:
      'O múltiplo de 4 da gráfica é degrau, não rampa: 21 páginas custam o mesmo que 24. A <strong>vixlens-catalogo 0.7.0</strong> ganhou as duas alavancas que faltavam para descer um degrau inteiro sem encolher letra. Famílias pequenas e parecidas agora dividem uma página, com separador por família no lugar do separador por índice — e quando elas divergem em cilindro ou adição, essas pílulas descem para o separador de cada bloco. A segunda alavanca é tirar os separadores de índice de uma família que estoura por pouco: eles custam 21px cada, e é isso, não o número de lentes, que empurra família para a segunda página. No catálogo da Ótica do Toninho as duas levaram de 24 para 20 páginas.',
  },
  {
    data: '2026-09-28',
    titulo: 'As pílulas do cabeçalho passavam por cima da borda',
    tipo: 'corrigido',
    corpo:
      'Nome de família longo com três ou quatro pílulas passa da largura útil do cabeçalho, e auto-layout que não quebra também não trunca: ele cresce por cima da borda do bloco colorido, sem erro nenhum aparecer. Estava em 8 dos 24 cabeçalhos, o pior com 740px num espaço de 523. Agora a linha de título quebra. Entrou junto a checagem que deixou isso passar — a validação media truncamento de célula, que é outra coisa — e um teste que roda o construtor fora do Figma, contra um stub da API, para pegar erro de lógica antes de gastar chamada.',
  },
  {
    data: '2026-09-28',
    titulo: 'A tabela no Figma aprendeu marca própria da ótica',
    tipo: 'novo',
    corpo:
      'Até agora o catálogo assumia que toda lente era marca própria Vixlens e que todo antirreflexo se chamava Reflecta. Não é o caso: a ótica pode batizar as lentes — a do Toninho chama a linha dela de <strong>EyeTech</strong> — e até o antirreflexo, e ainda revender algumas famílias sem marca nenhuma. A <strong>vixlens-catalogo 0.6.0</strong> trata os dois grupos na mesma peça: quem leva o nome da ótica e quem continua Vixlens. Também aprendeu a suprimir a coluna de um tratamento que a família inteira não tem — antes saía uma coluna inteira de travessões.',
  },
  {
    data: '2026-09-28',
    titulo: 'O índice do catálogo perdia duas colunas sem avisar',
    tipo: 'corrigido',
    corpo:
      'As larguras que a skill mandava usar somavam 535 contra 495 disponíveis. O Figma não reclama: ele empurra o que não cabe para fora da caixa, e as colunas <strong>Ø máx.</strong> e <strong>Pág.</strong> sumiam da peça. Foram junto outras três correções de legibilidade: o vermelho do cilindro reprovava contraste em corpo 7, as bolinhas Cinza e Esmeralda não davam o mínimo com a sigla dentro, e <code>Esf. +0.00</code> afirmava atender grau positivo até zero — zero não leva sinal.',
  },
  {
    data: '2026-09-28',
    titulo: 'A conta de quantas páginas o catálogo tem estava errada',
    tipo: 'mudou',
    corpo:
      'A skill estimava as páginas pelo número de famílias, e errava. Agora a altura de cada tabela sai de uma fórmula aferida contra páginas reais, com margem de 2px, e daí vem a regra que decide tudo: <strong>21 produtos com 5 índices já ocupam 606px contra 602 disponíveis</strong> — essas famílias quebram em duas, sempre. Quem estoura por pouco cabe numa página só abrindo mão da foto. Com 16 famílias o catálogo fecha em 24 páginas.',
  },
  
  {
    data: '2026-09-26',
    titulo: 'Landing page em minutos: /nova-pagina',
    tipo: 'novo',
    guia: 'plugins',
    corpo:
      'Nova skill no plugin <strong>vixlens-ui</strong> (0.5.0). Ela cria página ou landing page no site da Vixlens, em <code>vixlens.com.br/palavra</code> ou <code>palavra.vixlens.com.br</code>: recomenda o formato, gera a página no padrão (menu, animações, formulário que cai no Pipedrive), confere no celular, tablet e desktop e abre o PR. Atualize com <code>claude plugin marketplace update vixlens-marketplace</code> e digite <code>/nova-pagina</code>.',
  },
  {
    data: '2026-09-08',
    titulo: 'Relatório Transitions do mês virou skill: /transitionsvix',
    tipo: 'novo',
    guia: 'plugins',
    corpo:
      'Novo plugin <strong>vixlens-relatorios</strong>, o primeiro que tira relatório direto do Volpe. A skill <strong>transitionsvix</strong> gera em um comando o relatório que o Fabricio recebe todo mês (quem comprou Transitions, quem comprou lente e não levou, total geral) e o completo interno, e confere sozinha que os dois fecham antes de entregar. Instale com <code>claude plugin install vixlens-relatorios</code>. Precisa do clone do AI-Vixlens e do cofre do Volpe na máquina.',
  },
  {
    data: '2026-08-04',
    titulo: 'vixlens-brand e vixlens-design-system viraram uma só',
    tipo: 'mudou',
    corpo:
      'As duas faziam quase a mesma coisa: 84% das cores e todos os termos canônicos eram idênticos, e já tinham começado a divergir. Agora existe uma mestre, a <strong>vixlens-design-system</strong>, com tudo o que as duas tinham. Se você digitava <code>vixlens-brand</code>, passe a usar a outra. O plugin continua com o mesmo nome, só a skill saiu.',
  },
  {
    data: '2026-08-04',
    titulo: 'Comunicado, manual e proposta usavam cores que não existem',
    tipo: 'corrigido',
    corpo:
      'As três mandavam usar "barra Navy" e "barra Amber". Nenhuma das duas existe no Design System, então o documento saía com uma cor inventada na hora. Agora usam os quatro callouts de verdade (Destaque, Informativo, Crítico, Sucesso) com os hex exatos. As três também citavam códigos de voz sem carregar onde eles estão definidos; agora abrem carregando a mestre.',
  },
  {
    data: '2026-08-04',
    titulo: 'Tipografia da skill de UI estava um passo grande demais',
    tipo: 'corrigido',
    corpo:
      'Seis dos onze níveis divergiam do Design System: H1 saía 96px em vez de 64, e o corpo de texto 18px em vez de 16. Quem gerava componente pela skill entregava tipografia fora do sistema. Corrigido a partir do token do DS, com tracking incluído.',
  },
  {
    data: '2026-08-04',
    titulo: 'As skills da Vixlens agora se instalam por comando',
    tipo: 'novo',
    guia: 'plugins',
    corpo:
      'Saíram do "me manda o arquivo": os plugins <strong>vixlens-brand</strong> e <strong>vixlens-ui</strong> ficam num marketplace no GitHub e você instala com dois comandos. Quando a gente publicar melhoria, você atualiza rodando o passo 3 da aba Vixlens.',
  },
  {
    data: '2026-08-04',
    titulo: 'Quatro skills estavam publicadas sem disparar sozinhas',
    tipo: 'corrigido',
    corpo:
      'Um dois-pontos no lugar errado derrubava a descrição inteira delas, em silêncio. Elas apareciam na lista, instalavam normalmente, e nunca eram acionadas por contexto. Corrigido em <strong>vixlens-brand 0.3.1</strong> e <strong>vixlens-ui 0.2.1</strong>, e agora existe uma validação que barra o push se acontecer de novo.',
  },
  {
    data: '2026-08-04',
    titulo: 'Nova skill: auditoria de UI',
    tipo: 'novo',
    corpo:
      '<code>/ui-boas-praticas</code> revisa qualquer tela, componente ou formulário contra 80 boas práticas de interface: tipografia, cor, contraste, botões, grid, ícones e formulários. Aponta os achados por severidade e já sugere o valor corrigido.',
  },
  {
    data: '2026-08-04',
    titulo: 'O Guia Claude virou parte do hub',
    tipo: 'mudou',
    guia: 'crons',
    corpo:
      'Era uma página solta; agora tem a mesma navegação, tema escuro e índice lateral. Ganhou capítulo sobre <strong>tarefas agendadas</strong>, e os capítulos de Skills e Plugins foram reescritos, porque os antigos ensinavam caminhos que não funcionam mais. O link antigo continua abrindo.',
  },
  {
    data: '2026-08-04',
    titulo: 'Busca única em tudo',
    tipo: 'novo',
    corpo:
      'O atalho <kbd>Ctrl</kbd> <kbd>K</kbd> procura ao mesmo tempo nas skills e nos capítulos do guia. Achou uma skill, filtra o catálogo nela; achou um capítulo, abre o guia na hora certa.',
  },
]

const hoje = () => new Date()

export function ehRecente(data) {
  const d = new Date(`${data}T00:00:00`)
  const dias = (hoje() - d) / 86400000
  return dias >= 0 && dias <= DIAS_NOVIDADE
}

/** Seções do guia com novidade dentro da janela, para o selo "Novo". */
export const secoesComNovidade = new Set(
  novidades.filter((n) => n.guia && ehRecente(n.data)).map((n) => n.guia),
)

export const temNovidade = novidades.some((n) => ehRecente(n.data))
