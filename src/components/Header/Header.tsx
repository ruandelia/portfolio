import Image from "next/image";
import type { HeaderContent } from "@/content/types";

interface HeaderProps {
  content: HeaderContent; // por props: a v1.1 passa o conteúdo EN sem mudar o componente
}

// Sem "use client": é um Server Component e vira HTML estático no build
export function Header({ content }: HeaderProps) {
  return (
    <header>
      {/* "#top" rola ao topo do documento (definido na especificação HTML), sem JS */}
      <a href="#top" aria-label={content.logoLabel}>
        {/* alt="" porque é decorativo: o nome acessível vem do aria-label.
            width/height reservam o espaço e evitam CLS; eager porque está na primeira tela. */}
        <Image src="/images/avatar.webp" alt="" width={51} height={51} loading="eager" />
        <span aria-hidden="true">&gt;</span> {/* ">" do prompt, só visual */}
        <span>{content.logoText}</span>
      </a>
            {/* aria-label: dá nome ao <nav>, porque o rodapé pode ter outro no futuro */}
      <nav aria-label={content.navLabel}>
        <ul>
          {content.nav.map((item) => (
            // key: identifica cada item para o React; precisa ser único e estável
            <li key={item.id}>
              {/* <a> comum, não next/link: é âncora na mesma página, não troca de rota */}
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
            {/* download: baixa o arquivo em vez de abrir; só funciona na mesma origem (é o caso) */}
      <a href={content.resume.href} download>
        {content.resume.label}
        {/* Só para leitor de tela. A classe visually-hidden é criada na 1.8 */}
        <span className="visually-hidden">{content.resume.srHint}</span>
      </a>
    </header>
  );
}