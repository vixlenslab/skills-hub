# skills-hub

Hub interno das skills Vixlens — o que existe, o que cada uma faz e como instalar. No ar em **[skills.vixlens.com.br](https://skills.vixlens.com.br)**.

## Rodar local

```bash
npm install
npm run dev
```

## Deploy

Automático. Push no `main` publica em produção pela Vercel (projeto `skills-hub`, time `vixlens2015-2062's projects`).

Até 02/09/2026 o deploy era manual e ninguém sabia disso — o site ficou 18 dias servindo uma versão antiga do `main`, com dois commits publicados no GitHub que nunca chegaram no ar. A integração com o Git foi conectada nessa data para fechar esse buraco.

Se precisar publicar à mão, o projeto já está linkado:

```bash
npx vercel --prod
```

## Onde ficam as skills

O conteúdo desta página é só a vitrine. As skills de verdade vivem em [`vixlenslab/vixlens-ds`](https://github.com/vixlenslab/vixlens-ds), distribuídas como plugins pelo marketplace `vixlens-marketplace`.

Ao adicionar ou renomear uma skill lá, atualize aqui:

- `src/data/skills.js` — a entrada da skill (nome, categoria, tipo, descrição, dica)
- `src/components/InstallBlock.jsx` — só se entrar ou sair um **plugin**, já que os comandos de instalação listam plugin por plugin

## Convenções

- Todo atalho de skill começa com `/`, inclusive os de tipo `reference`
- `type`: `slash` (o usuário digita), `reference` (carrega sozinha pelo contexto), `terminal` (roda no terminal, não no chat)
- Comandos de instalação ficam um por linha, para cada linha se copiar e rodar sozinha
