# ADR 0001 — Breakpoint próprio para o header (80rem)

- **Status:** aceito
- **Data:** 2026-11-11
- **Substitui em parte:** a regra "breakpoint único `@media (min-width: 64rem)`" do `CLAUDE.md`

## Contexto

O site é mobile first, com um breakpoint só: 64rem (1024px). O Figma tem dois frames, desktop (1680px) e mobile (390px), e não desenha nada no meio.

Na verificação de acessibilidade do header (Fase 1), medimos o header desktop no Chrome:

| Largura | Resultado |
|---|---|
| 1024px | Rolagem horizontal; o nome quebra em duas linhas e fica por cima do "Sobre"; o Currículo é cortado |
| 1100px | O nome ainda quebra e sobrepõe a nav |
| 1280px | Cabe numa linha |
| 1440px | Cabe numa linha |

A barra desktop precisa de ~1050px de conteúdo (logo ~246, nav ~671, Currículo ~130), mais o padding lateral de 88px de cada lado. Uma tela de 1280px com zoom de 125% tem viewport de 1024px, então o problema aparece com uma configuração comum, e não só em telas incomuns. Para quem amplia a tela, isso é perda de conteúdo e sobreposição (WCAG 1.4.4 e 1.4.10).

## Opções

- **Opção 1: subir o breakpoint do site inteiro para 80rem.** É simples e fiel ao Figma, mas leva para o layout mobile todas as seções que já funcionam bem entre 1024 e 1279px (em telas de notebook comuns, a página inteira ficaria com cara de celular).
- **Opção 1b: breakpoint próprio para o header, 80rem.** O header (nav, Currículo e menu) só vira barra desktop em 1280px; o resto do site continua em 64rem. Entre 1024 e 1279px, o header usa o menu mobile sobre uma página desktop.
- **Opção 2: compactar o espaçamento entre 1024 e 1280px** (padding dos links, gap e margens com `clamp()`). Mantém um breakpoint só, mas desvia do Figma nessa faixa e fica no limite: qualquer link novo ou tradução mais longa (v1.1, inglês) quebra de novo.
- **Opção 3: esconder o nome na faixa intermediária** (fica só o avatar com ">"). Resolve pouco: só o nome libera ~190px, e some um conteúdo visível da marca.

## Decisão

**Opção 1b.** O header usa `@media (min-width: 80rem)`; o resto do site continua em 64rem.

A falta de espaço é do header, então a solução fica no header. A opção 1b não muda o design de nenhuma tela do Figma: em 1680px a barra é igual, e em 390px o menu é igual. Ela só escolhe, para a faixa que o Figma não desenha, um layout que já existe e já foi verificado, o menu mobile. Também deixa folga para a versão em inglês, que pode ter rótulos mais longos.

## Consequências

- **Dois breakpoints, em lugares conhecidos:**
  - `Header.module.css` (bloco `@media (min-width: 80rem)`);
  - os tokens do header no `globals.css` (`--fs-logo`, `--fs-nav`, `--color-nav-active-bg`, `--header-offset`), num bloco `@media (min-width: 80rem)` separado do bloco de 64rem;
  - o `matchMedia("(min-width: 80rem)")` do `MenuPopover.tsx`, que fecha o painel ao virar desktop.

  Os três precisam mudar juntos. Variáveis CSS não funcionam em `@media`, então o valor é literal.
- **Entre 1024 e 1279px,** o header tem a altura do mobile (72px) e `--header-offset` de 5rem, enquanto a página usa a margem lateral e a tipografia do desktop. O header acompanha a margem da página porque usa `--space-gutter`.
- **Testes:** toda mudança no header precisa ser conferida em 1024, 1100, 1280 e 1680px, além de 390px.
- **Regra no `CLAUDE.md`:** atualizada para "64rem no site, 80rem no header (este ADR)".
