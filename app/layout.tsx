import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Donna Glamour | Moda Feminina em Olinda, Recife e Região",
  description:
    "Catálogo da Donna Glamour com moda feminina, peças em destaque e atendimento rápido via WhatsApp em Olinda, Recife e região.",
  keywords: [
    "Donna Glamour",
    "moda feminina em Olinda",
    "catálogo feminino Recife",
    "loja feminina Olinda",
    "combos moda feminina",
  ],
  openGraph: {
    title: "Donna Glamour | Moda Feminina em Olinda, Recife e Região",
    description:
      "Looks modernos e atendimento rápido direto da loja para você.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
