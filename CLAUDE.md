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
Você trabalha com autonomia no código do app. Eu não escrevo código nem aprovo diff por diff; confiro o resultado no fim de cada fase.

1. **Branch `dev/app`, só ela.** Trabalhe sozinho nela. Nunca dê push, não reescreva histórico e não troque de branch.
2. **Uma etapa do plano = um commit seu**, em Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `build`, `ci`, `test`), feito só depois de `npm run lint` e `npm run build` passarem.
3. **Pare e me pergunte só quando:** precisar desviar do Figma, quiser adicionar uma dependência, ou uma decisão não estiver coberta pelo plano ou pelos ADRs.
4. **A infraestrutura continua fora do seu escopo** (ver "Escopo" acima).
5. **Ao terminar uma fase, pare** e escreva um resumo: os commits, as decisões tomadas (com o porquê) e o que eu devo conferir no navegador.
6. Aponte riscos de segurança, custo, desempenho e manutenção. Se eu propuser algo ruim, diga diretamente.
7. Baseie-se na documentação oficial. Se não tiver certeza, diga.

## Convenções de código
- Acessibilidade WCAG 2.2 AA: HTML semântico, foco visível (`:focus-visible`), contraste mínimo 4,5:1, `prefers-reduced-motion` respeitado, nada interativo escondido só visualmente.
- Comentários explicam o porquê, não o quê, e não citam números de etapa.
- Propriedades lógicas (`padding-inline`, `margin-block`); `rem` para espaço e texto, `em` para espaços internos de um componente tipográfico, `px` para bordas e contornos.
- Rode `npm run lint` e `npm run build` antes de cada commit.

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