# Portfólio Pessoal — instruções para o Claude Code

## Projeto
Site de portfólio pessoal, voltado a recrutadores e profissionais de cloud, dados e IA (segurança como prática transversal). Não é um site de vendas.

Design no Figma (frames desktop 1680px e mobile 390px). O código segue o Figma, com desvios só quando justificados (acessibilidade, contraste, consistência de tokens) e registrados no documento de requisitos.

## Stack e arquitetura
- Next.js (App Router) com exportação estática (`output: "export"`), React 19, TypeScript sem `any`.
- Estilos: CSS Modules por componente + tokens globais em `src/app/globals.css` (primitivas → semânticos). Sem Tailwind. Componentes nunca usam valores crus (hex, px soltos) quando existe token.
- Mobile first, breakpoint único `@media (min-width: 64rem)` (literal: variáveis CSS não funcionam em `@media`).
- Server Components por padrão. Client Components só como "ilhas" mínimas (ex.: `HeaderShell`, `NavLinks`); o JS decide estados via `data-*`/`aria-*`, o CSS desenha.
- Conteúdo tipado em `src/content/` (por idioma), componentes em `src/components/`.
- Hospedagem (contexto; quem cuida é o Ruan): o build estático (`out/`) é servido por nginx num container no Cloud Run, com deploy por GitHub Actions + Workload Identity Federation, sem chave de conta de serviço.

## Escopo: você cuida só do código da aplicação
- **Seu escopo:** tudo dentro de `src/`, `public/`, configuração do Next.js, do TypeScript e do ESLint, `package.json` e o `README`.
- **Fora do seu escopo (infraestrutura, feita pelo Ruan):** `Dockerfile`, `nginx/`, `.github/workflows/`, `docs/infra/` e qualquer recurso do Google Cloud. Não crie nem edite esses arquivos e não rode comandos `gcloud`. Se o código depender de algo da infra (ex.: uma variável de ambiente no build), descreva o que precisa e eu faço.
- Revise arquivos de infraestrutura só quando eu pedir, apontando problemas sem editar.

## Decisões já tomadas (não reabrir sem um ADR em `docs/adr/`)
- Next.js estático + nginx no Cloud Run; deploy por GitHub Actions + WIF.
- Regra de evidência: só aparece como "aplicado" ou "concluído" no site o que tem prova verificável.
- Idiomas por páginas geradas no build (`/` e `/en/`), sem tradução em tempo real.
- Ícones como SVG inline em componentes próprios (`currentColor`), sem biblioteca de ícones.
- Novas dependências só com justificativa (cada pacote é superfície de supply chain).
- Roadmap: v1.0 (PT) → v1.1 (inglês) → v1.2 (Libras/VLibras) → v1.3 (estudos de caso) → v2 (terminal interativo e chatbot com IA).

## Como trabalhar comigo
Eu estou aprendendo React, Next.js e infraestrutura construindo este site. O objetivo é eu entender cada passo, não só ter o site pronto.

1. **Uma etapa por vez.** Cada etapa vira um commit. Não adiante etapas nem gere o site de uma vez.
2. **Antes de editar**, diga o que vai fazer, em quais arquivos, e por quê. Quando houver mais de um caminho razoável, mostre 2 ou 3 alternativas com prós e contras e diga qual escolheria.
3. **Me deixe tentar** quando a parte for pequena e o conceito for novo para mim: descreva o que precisa ser feito, dê pistas e espere eu escrever. Depois revise o que eu fiz.
4. **Mostre o diff e espere minha aprovação** antes de aplicar cada alteração.
5. **Depois de aplicar**, diga como conferir que funcionou (o que olhar no navegador, no DevTools ou no terminal).
6. **Sugira a mensagem de commit** em Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `build`, `ci`, `test`) e **espere eu commitar**. Nunca rode `git commit`, `git push` nem altere o histórico.
7. Explique o "porquê" das decisões, não só o "como". Aponte riscos de segurança, custo, desempenho e manutenção. Se eu propuser algo ruim, diga diretamente.
8. Baseie-se na documentação oficial. Se não tiver certeza, diga.

## Convenções de código
- Acessibilidade WCAG 2.2 AA: HTML semântico, foco visível (`:focus-visible`), contraste mínimo 4,5:1, `prefers-reduced-motion` respeitado, nada interativo escondido só visualmente.
- Comentários explicam o porquê, não o quê, e não citam números de etapa.
- Propriedades lógicas (`padding-inline`, `margin-block`); `rem` para espaço e texto, `em` para espaços internos de um componente tipográfico, `px` para bordas e contornos.
- Rode `npm run lint` e `npm run build` antes de sugerir o commit.

## Segurança
- Nunca coloque no repositório: credenciais, tokens, chaves, IDs ou números de projeto do Google Cloud, nomes de conta de serviço, e-mails pessoais. Valores assim entram como variáveis do GitHub Actions ou do ambiente, nunca no código.
- `.env` e `.env.*` ficam no `.gitignore`. Não leia esses arquivos.
- Nada de `dangerouslySetInnerHTML`, `eval` ou scripts inline: a infra aplica uma CSP restritiva, e o código precisa ser compatível com ela.
- Links externos com `target="_blank"` levam `rel="noopener noreferrer"`.

## Ambiente
- Windows com WSL 2 (Ubuntu). O repositório fica dentro do sistema de arquivos do WSL; use bash.
- Node via nvm (versão no `.nvmrc`).

## Comandos
- `npm run dev` — servidor de desenvolvimento
- `npm run lint` — ESLint
- `npm run build` — build estático em `out/`