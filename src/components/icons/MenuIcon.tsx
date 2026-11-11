// Ícone decorativo: aria-hidden porque o botão já tem nome acessível ("Abrir menu")
export function MenuIcon() {
  return (
    <svg
      width="1.25rem" // 20px, como no Figma
      height="1.25rem"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor" // herda a cor do texto do botão
      strokeWidth={1.66667}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3.33333 5H16.6667M3.33333 10H16.6667M3.33333 15H16.6667" />
    </svg>
  );
}
