// Ícone decorativo: aria-hidden porque o botão já tem nome acessível ("Fechar menu")
export function CloseIcon() {
  return (
    <svg
      width="1.25rem" // 20px, como no Figma
      height="1.25rem"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5L10 10M10 10L15 15M10 10L15 5M10 10L5 15" />
    </svg>
  );
}
