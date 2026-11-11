"use client";

import { useEffect, useState } from "react";
import type { NavItem, SectionId } from "@/content/types";
import styles from "./Header.module.css";

// "2" → "02": formato do callout (#experiencia · 02/05)
const pad = (n: number) => String(n).padStart(2, "0");

interface NavLinksProps {
  // Vem do servidor por props: só dados simples (texto), que o React consegue serializar
  items: readonly NavItem[];
}

// Client island: só a lista precisa de JS, para saber qual seção está na tela
export function NavLinks({ items }: NavLinksProps) {
  // null = nenhuma seção na faixa (ex.: no hero). É também o estado do HTML
  // gerado no build, então a hidratação bate com o que o servidor mandou.
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    // Liga cada <section> ao seu id: o callback recupera o id sem "as SectionId"
    const sections = new Map<Element, SectionId>();
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) sections.set(el, item.id); // seção ainda inexistente: só não é observada
    }

    // O callback só recebe as seções que mudaram; o Set lembra quem está na linha agora.
    // Não é estado do React porque não precisa provocar re-render.
    const visible = new Set<SectionId>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = sections.get(entry.target);
          if (!id) continue;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        // Ordem da página (items), não a ordem em que as entries chegaram
        const first = items.find((item) => visible.has(item.id));
        setActiveId(first?.id ?? null);
      },
      // Faixa de 1% da altura, a 30% do topo: abaixo de onde a âncora para nos dois breakpoints
      { rootMargin: "-30% 0px -69% 0px" },
    );

    for (const el of sections.keys()) observer.observe(el);

    // Desfaz o que o efeito começou (troca de items, desmontagem, Strict Mode no dev)
    return () => observer.disconnect();
  }, [items]);

  return (
    <ul className={styles.navList}>
      {items.map((item, index) => (
        <li key={item.id} className={styles.navItem}>
          <a
            href={`#${item.id}`}
            className={styles.navLink}
            // undefined não escreve o atributo; só o link ativo é anunciado como "atual"
            aria-current={item.id === activeId ? "true" : undefined}
          >
            {item.label}
          </a>
          {/* Decorativo: repete a âncora e a posição; o link já tem nome acessível */}
          <span className={styles.callout} aria-hidden="true">
            #{item.id} · {pad(index + 1)}/{pad(items.length)}
          </span>
        </li>
      ))}
    </ul>
  );
}
