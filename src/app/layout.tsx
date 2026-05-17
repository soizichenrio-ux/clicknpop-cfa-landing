import type { Metadata } from "next";
import { fraunces, ibmPlexSans, ibmPlexMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Click'n Pop pour CFA et OF — Le recrutement qui fait pop",
  description:
    "Pour les CFA et OF qui veulent placer leurs apprenti·es durablement. Tuteur-Screener, Pilotage temps réel, conventions tripartites pré-remplies. App CFA fin mai 2026.",
  metadataBase: new URL("https://cfa.clicknpop.fr"),
  openGraph: {
    title: "Click'n Pop pour CFA et OF",
    description: "Le recrutement qui fait pop.",
    url: "https://cfa.clicknpop.fr",
    siteName: "Click'n Pop",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
