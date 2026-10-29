import Image from "next/image";
import type { HeaderContent } from "@/content/types";
import styles from "./Header.module.css";
import { DownloadIcon } from "@/components/icons/DownloadIcon";

interface HeaderProps {
  content: HeaderContent; // por props: a v1.1 passa o conteúdo EN sem mudar o componente
}

// Sem "use client": é um Server Component e vira HTML estático no build
export function Header({ content }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* "#top" rola ao topo do documento (definido na especificação HTML), sem JS */}
      <a href="#top" aria-label={content.logoLabel} className={styles.logo}>
        {/* alt="" porque é decorativo: o nome acessível vem do aria-label.
            width/height reservam o espaço e evitam CLS; eager porque está na primeira tela. */}
        <Image
          src="/images/avatar.webp"
          alt=""
          width={51}
          height={51}
          loading="eager"
          className={styles.avatar}
        />
        {/* ">" do prompt, só visual: escondido do leitor de tela */}
        <span className={styles.prompt} aria-hidden="true">
          &gt;
        </span>
        <span className={styles.wordmark}>{content.logoText}</span>
      </a>
      {/* aria-label: dá nome ao <nav>, porque o rodapé pode ter outro no futuro */}
      <nav className={styles.nav} aria-label={content.navLabel}>
        <ul className={styles.navList}>
          {content.nav.map((item) => (
            // key: identifica cada item para o React; precisa ser único e estável
            <li key={item.id}>
              {/* <a> comum, não next/link: é âncora na mesma página, não troca de rota */}
              <a href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* download: baixa o arquivo em vez de abrir; só funciona na mesma origem (é o caso) */}
      <a className={styles.resume} href={content.resume.href} download>
        <DownloadIcon />
        {content.resume.label}
        {/* Só para leitor de tela: avisa que o link baixa um PDF */}
        <span className="visually-hidden">{content.resume.srHint}</span>
      </a>
    </header>
  );
}
