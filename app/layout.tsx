import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ECCP - Algérie Poste",
  description: "Connectez-vous à votre compte ECCP",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <style>{`
          @font-face {
            font-family: 'Eurostile';
            src: url('https://fonts.googleapis.com/css2?family=Eurostile:wght@400;700&display=swap');
          }
        `}</style>
      </head>
      <body style={{ fontFamily: "Eurostile, Arial, sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
