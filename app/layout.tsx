import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React
import { ThemeProvider } from "@/components/theme-provider"

// Use Outfit as our primary font - modern, clean and highly readable
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "ΞDΛ°-Tomola Oke - Software Engineer",
  description: "ΞDΛ°-Tomola Oke, a software engineer, Backend focused. I build things for the web and beyond..",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-outfit">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
