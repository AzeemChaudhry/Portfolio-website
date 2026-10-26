import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pf-sans",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pf-mono",
  weight: ["400", "500"],
})

const description =
  "AI engineer building production RAG, LangGraph multi-agent systems and the guardrails around them. GovXprt, SGVI MediPlan, GharDekho and more."

export const metadata: Metadata = {
  title: "Muhammad Azeem Chaudhry, AI Engineer",
  description,
  keywords: [
    "Muhammad Azeem",
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "LangGraph",
    "Multi-Agent Systems",
    "LLM Evaluation",
    "Google Cloud Vertex AI",
    "FastAPI",
    "Python",
    "PyTorch",
    "Federated Learning",
    "NLP",
    "MLOps",
  ],
  authors: [{ name: "Muhammad Azeem Chaudhry" }],
  creator: "Muhammad Azeem Chaudhry",
  publisher: "Muhammad Azeem Chaudhry",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadazeem.com",
    siteName: "Muhammad Azeem Chaudhry",
    title: "Muhammad Azeem Chaudhry, AI Engineer",
    description,
    images: [
      {
        url: "/images/profile.jpg",
        width: 400,
        height: 400,
        alt: "Muhammad Azeem - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Muhammad Azeem Chaudhry, AI Engineer",
    description,
    creator: "@AzeemChaudhry",
  },
  alternates: {
    canonical: "https://muhammadazeem.com",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Azeem Chaudhry",
              jobTitle: "AI Engineer",
              description,
              url: "https://muhammadazeem.com",
              image: "https://muhammadazeem.com/images/profile.jpg",
              sameAs: [
                "https://github.com/AzeemChaudhry",
                "https://www.linkedin.com/in/chaudhryazeem/",
              ],
              email: "mailto:chaudhry.azeem0308@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
              knowsAbout: [
                "Retrieval-Augmented Generation",
                "Multi-Agent Systems",
                "LangGraph",
                "LLM Evaluation",
                "Google Cloud Vertex AI",
                "FastAPI",
                "Python",
                "PyTorch",
                "Federated Learning",
                "NLP",
                "MLOps",
              ],
            }),
          }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </head>
      <body className={sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
