// Ícone decorativo: aria-hidden porque o texto do link já diz "Currículo (PDF)"
export function DownloadIcon() {
  return (
    <svg
      width="1.125em" // 18px com fonte de 16px; acompanha o tamanho do texto
      height="1.125em"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor" // herda a cor do texto do botão
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25M12.75 7.5L9 11.25L5.25 7.5M9 11.25V2.25" />
    </svg>
  );
}

