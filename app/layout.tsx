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
  title: "Feed the Hungry - Join the Cause",
  description:
    "Support our mission to feed the hungry. Contact us, follow us on social media, or donate through our banking partners.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/icon-dark-32x32.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.svg",
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
