"use client";

import { useEffect, useState, type ReactNode } from "react";

const THRESHOLD = 80; // px rolados até o header deixar de ser "do topo"

interface HeaderShellProps {
  className: string;
  children: ReactNode; // logo, nav e Currículo, renderizados no servidor
}

// Client island: só a <header> vira cliente; o conteúdo continua estático
export function HeaderShell({ className, children }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false); // saiu do topo?
  const [hidden, setHidden] = useState(false); // rolando para baixo?

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false; // já tem uma atualização agendada?
    let frame = 0; // id do quadro agendado, para cancelar na limpeza

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > THRESHOLD);
      setHidden(y > lastY && y > THRESHOLD); // descendo e longe do topo
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update); // no máximo 1 atualização por quadro
    };

    update(); // estado certo se a página abrir já rolada
    window.addEventListener("scroll", onScroll, { passive: true });

    // Limpeza: desfaz tudo o que o efeito começou
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={className} data-scrolled={scrolled} data-hidden={hidden}>
      {children}
    </header>
  );
}