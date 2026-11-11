import Image from "next/image";
import type { HeaderContent } from "@/content/types";
import styles from "./Header.module.css";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { HeaderShell } from "./HeaderShell";
import { MenuPopover } from "./MenuPopover";
import { NavLinks } from "./NavLinks";

// Liga os botões Abrir/Fechar ao painel (popoverTarget). Mesmo id do Figma.
const MENU_ID = "menu-mobile";

interface HeaderProps {
  content: HeaderContent; // por props: a v1.1 passa o conteúdo EN sem mudar o componente
}

// Sem "use client": é um Server Component e vira HTML estático no build
export function Header({ content }: HeaderProps) {
  return (
    <HeaderShell className={styles.header}>
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

      {/* Só mobile. A Popover API liga o botão ao painel sem JS e expõe
          aria-expanded sozinha, então o estado nunca fica desatualizado */}
      <button
        type="button"
        className={styles.menuButton}
        popoverTarget={MENU_ID}
        aria-label={content.menu.openLabel}
      >
        <MenuIcon />
      </button>

      {/* Uma lista só: no mobile é o painel; no desktop o contêiner some
          (display: contents) e a nav e o Currículo ficam direto na barra */}
      <MenuPopover id={MENU_ID} className={styles.menu}>
        <div className={styles.menuTop}>
          <button
            type="button"
            className={styles.menuButton}
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            aria-label={content.menu.closeLabel}
          >
            <CloseIcon />
          </button>
        </div>

        {/* aria-label: dá nome ao <nav>, porque o rodapé pode ter outro no futuro */}
        <nav className={styles.nav} aria-label={content.navLabel}>
          <NavLinks items={content.nav} />
        </nav>

        <div className={styles.resumeWrap}>
          {/* download: baixa o arquivo em vez de abrir; só funciona na mesma origem (é o caso) */}
          <a className={styles.resume} href={content.resume.href} download>
            <DownloadIcon />
            {/* Um span só: mantém o espaço antes de "(PDF)", que o flex descartaria */}
            <span>
              {content.resume.label}
              {/* Visível no painel (como no Figma); no desktop, só para leitor de tela */}
              <span className={styles.resumeHint}>{content.resume.srHint}</span>
            </span>
          </a>
          {/* Decorativo: nome do arquivo derivado do href, então nunca diverge do arquivo real */}
          <span className={styles.callout} aria-hidden="true">
            {content.resume.href.split("/").pop()} ↓
          </span>
        </div>
      </MenuPopover>
    </HeaderShell>
  );
}
