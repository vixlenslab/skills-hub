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
