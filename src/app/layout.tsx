import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edgar Flores - Software Engineer",
  description: "Portfolio of Edgar Flores, Software Engineer and Digital Craftsman",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-gradient-to-br from-slate-900 via-blue-900 to-amber-900">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { 
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #92400e 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
            }
            html {
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #92400e 100%);
              min-height: 100vh;
            }
          `,
          }}
        />
      </head>
<body className="bg-gradient-to-br from-slate-900 via-blue-900 to-amber-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
