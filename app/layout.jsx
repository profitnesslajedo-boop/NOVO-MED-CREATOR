export const metadata = {
  metadataBase: new URL("https://creatorpro-seven.vercel.app"),
  title: "MedCreator Pro",
  description: "Plataforma de conteúdo digital médico",
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg"
  },
  openGraph: {
    title: "MedCreator Pro",
    description: "Plataforma de conteúdo digital médico para médicos criadores.",
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
