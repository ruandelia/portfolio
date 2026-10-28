import type { NavItem, SiteContent } from "../types";

// Ordem da página. A posição de cada item também gera o "NN/05" do callout (etapa 3).
const nav: readonly NavItem[] = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "habilidades", label: "Habilidades" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

const name = "Ruan D'elia";

export const site: SiteContent = {
  name, // atalho para name: name
  skipLink: "Pular para o conteúdo",
  header: {
    logoText: name,
    // Contém o texto visível "Ruan D'elia" (WCAG 2.5.3, Label in Name)
    logoLabel: `${name}, ir para o início`,
    navLabel: "Principal",
    nav, // a lista da 1.3
    resume: {
      label: "Currículo",
      srHint: " (PDF)", // espaço inicial: o leitor de tela lê "Currículo (PDF)"
      href: "/curriculo-ruan-delia.pdf",
    },
  },
};