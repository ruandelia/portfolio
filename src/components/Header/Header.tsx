import Image from "next/image";
import type { HeaderContent } from "@/content/types";
import styles from "./Header.module.css";
import { DownloadIcon } from "@/components/icons/DownloadIcon";

// "2" → "02": formato do callout (#experiencia · 02/05)
const pad = (n: number) => String(n).padStart(2, "0");

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
          {content.nav.map((item, index) => (
            <li key={item.id} className={styles.navItem}>
              <a href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
              {/* Decorativo: repete a âncora e a posição; o link já tem nome acessível */}
              <span className={styles.callout} aria-hidden="true">
                #{item.id} · {pad(index + 1)}/{pad(content.nav.length)}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.resumeWrap}>
        {/* download: baixa o arquivo em vez de abrir; só funciona na mesma origem (é o caso) */}
        <a className={styles.resume} href={content.resume.href} download>
          <DownloadIcon />
          {content.resume.label}
          {/* Só para leitor de tela: avisa que o link baixa um PDF */}
          <span className="visually-hidden">{content.resume.srHint}</span>
        </a>
        {/* Decorativo: nome do arquivo derivado do href, então nunca diverge do arquivo real */}
        <span className={styles.callout} aria-hidden="true">
          {content.resume.href.split("/").pop()} ↓
        </span>
      </div>
    </header>
  );
}
