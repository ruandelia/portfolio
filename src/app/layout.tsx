import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { site } from "@/content/pt/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ruan D'elia · Cloud · Dados · IA",
  description:
    "Estagiário em Cloud Services na QI Network, parceira do Google Cloud. Explorando Google Cloud, dados e IA na prática, com base em desenvolvimento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
    <body>
        {/* Primeiro elemento focável da página: pula a navegação (WCAG 2.4.1) */}
        <a href="#conteudo" className="visually-hidden-focusable">
          {site.skipLink}
        </a>
        <Header content={site.header} />
        {/* children = o conteúdo da rota atual (o page.tsx) */}
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
