"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MenuPopoverProps {
  id: string; // alvo do popoverTarget dos botões Abrir e Fechar
  className: string;
  children: ReactNode; // nav e Currículo, renderizados no servidor
}

// Client island: a Popover API já abre, fecha (Esc, toque fora) e expõe o estado
// expandido no botão. O JS só cobre o que ela não faz sozinha. Sem JS (ex.: CSP
// bloqueando a hidratação), o menu continua abrindo e fechando.
export function MenuPopover({ id, className, children }: MenuPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = ref.current;
    // Navegador sem Popover API: :popover-open lançaria erro, então não liga nada
    if (!menu || !("showPopover" in menu)) return;

    const close = () => {
      if (menu.matches(":popover-open")) menu.hidePopover();
    };

    // Ao abrir, o foco vai para o Fechar (o primeiro botão do painel): o botão que
    // abriu fica coberto pelo painel, e foco escondido falha o WCAG 2.4.11
    const onToggle = () => {
      if (menu.matches(":popover-open")) menu.querySelector("button")?.focus();
    };

    // Link clicado: a âncora rola a página, então o painel sai da frente
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) close();
    };

    // Tab depois do último item leva o foco para a página, atrás do painel: fecha.
    // focusin (e não focusout) porque aí o foco já saiu e o navegador não o devolve ao botão.
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) close();
    };

    // Virou desktop com o menu aberto: lá a nav fica na barra, não no painel
    const desktop = window.matchMedia("(min-width: 64rem)");

    menu.addEventListener("toggle", onToggle);
    menu.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    desktop.addEventListener("change", close);

    return () => {
      menu.removeEventListener("toggle", onToggle);
      menu.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      desktop.removeEventListener("change", close);
    };
  }, []);

  return (
    <div ref={ref} id={id} className={className} popover="auto">
      {children}
    </div>
  );
}
