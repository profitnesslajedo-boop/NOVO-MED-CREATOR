export const metadata = {
  metadataBase: new URL("https://medcreatorpro.app"),
  title: "MedCreator Pro | Plataforma de conteúdo e autoridade digital para médicos",
  description: "Crie roteiros, stories, calendário editorial e analise seu Instagram com estratégia, ética e autoridade.",
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg"
  },
  openGraph: {
    title: "MedCreator Pro | Plataforma de conteúdo e autoridade digital para médicos",
    description: "Crie roteiros, stories, calendário editorial e analise seu Instagram com estratégia, ética e autoridade.",
    images: ["/brand/medcreatorpro-logo-horizontal-dark.svg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
