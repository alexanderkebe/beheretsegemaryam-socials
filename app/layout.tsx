import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _montserrat = Montserrat({ subsets: ["latin"] })

// Custom Amharic font (applied to amharic text via [lang="am"] in globals.css)
const benaiah = localFont({
  src: "./fonts/Benaiah.ttf",
  variable: "--font-benaiah",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mekane Selam Behere Tsege St. Mary's Official Media",
  description:
    "Official media of Mekane Selam Behere Tsege St. Mary's Church. Connect with us on Telegram, TikTok, Instagram, YouTube, Facebook, and LinkedIn.",
  generator: "v0.app",
  icons: {
    icon: "/images/profile-picture.png",
    shortcut: "/images/profile-picture.png",
    apple: "/images/profile-picture.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="am" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedDark = localStorage.getItem('isDark');
                  // Apply dark mode if saved preference exists
                  if (savedDark === 'true') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${benaiah.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
