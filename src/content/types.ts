// IDs das seções: usados no href (#id), no id da <section> e no scroll spy.
// O union type impede erros de digitação, como "#experiência" com acento.
export type SectionId =
  | "sobre"
  | "experiencia"
  | "habilidades"
  | "projetos"
  | "contato";

// Um link da navegação: para onde aponta e o texto visível
export interface NavItem {
  id: SectionId;
  label: string;
}

// Teste temporário: deve dar erro, porque "experiência" não é um SectionId
// const teste: NavItem = { id: "experiência", label: "Experiência" };

// Conteúdo do header. A versão EN (v1.1) usa este mesmo tipo.
export interface HeaderContent {
  logoText: string;        // texto visível do wordmark
  logoLabel: string;       // nome acessível do link da logo (RF-01)
  navLabel: string;        // aria-label do <nav>
  nav: readonly NavItem[]; // readonly: o componente só lê a lista
  resume: {
    label: string;  // texto visível do botão
    srHint: string; // só para leitor de tela: " (PDF)" (RF-03)
    href: string;   // caminho do arquivo dentro de public/
  };
}

// Conteúdo do site inteiro, por idioma
export interface SiteContent {
  name: string;
  skipLink: string;
  header: HeaderContent;
}

