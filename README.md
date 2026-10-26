# Ruan D'elia — Portfólio

Site de portfólio pessoal com foco em **Cloud, Dados e IA**, com segurança como prática transversal. É, ao mesmo tempo, o meu cartão de visitas e um projeto prático: do design no Figma ao deploy no Google Cloud.

> **Status:** em desenvolvimento, rumo à **v1.0**.

## Stack

| Camada | Tecnologia | Por quê |
| --- | --- | --- |
| Design | Figma | Desktop (1680px) e mobile (390px) desenhados antes do código |
| Framework | Next.js (App Router) com exportação estática | Gera HTML estático: rápido, barato de hospedar e com menos superfície de ataque |
| Linguagem | TypeScript | Erros de props e de dados aparecem no editor, antes de chegar ao navegador |
| Estilos | CSS global (tokens do Figma) + CSS Modules | Variáveis do design num só lugar e estilos isolados por componente, sem dependências extras |
| Qualidade | ESLint (regras do Next.js e de acessibilidade) | Pega bugs e problemas de acessibilidade no JSX |
| Hospedagem | Google Cloud Run *(planejado)* | Container servindo o build estático, dentro do nível gratuito |

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org/) na versão definida em `.nvmrc` (recomendado instalar via [nvm](https://github.com/nvm-sh/nvm)) e Git.

```bash
# clonar o repositório
git clone git@github.com:ruandelia/portfolio.git
cd portfolio

# usar a versão do Node fixada no projeto
nvm use

# instalar as dependências
npm install

# iniciar o servidor de desenvolvimento em http://localhost:3000
npm run dev
```

Outros comandos:

```bash
npm run lint    # verificar o código com o ESLint
npm run build   # gerar o build de produção
```

## Roadmap

O site é entregue em versões pequenas, cada uma publicada assim que fica pronta.

- [ ] **v1.0** — MVP em português: hero, sobre, experiência, habilidades, projetos e contato
- [ ] **v1.1** — versão em inglês (`/en/`), seletor de idioma e currículo em inglês
- [ ] **v1.2** — tradução para Libras com VLibras
- [ ] **v1.3** — estudo de caso em página própria para cada projeto
- [ ] **v2** — terminal interativo no hero, chatbot sobre a minha trajetória e alternância de tema

## Princípios do projeto

- **Acessibilidade:** HTML semântico, navegação por teclado, contraste adequado e textos alternativos.
- **Desempenho:** páginas estáticas e fontes servidas pelo próprio site via `next/font`, sem requisições a terceiros.
- **Segurança:** nenhum segredo no repositório (`.env*` no `.gitignore`), chave SSH com passphrase e e-mail privado nos commits.
- **Reprodutibilidade:** versão do Node fixada em `.nvmrc` e dependências travadas no `package-lock.json`.

## Autor

**Ruan D'elia** — estagiário em Cloud Services, estudando Google Cloud, Linux e segurança.

<!-- TODO: adicionar o link do LinkedIn quando for publicar -->
