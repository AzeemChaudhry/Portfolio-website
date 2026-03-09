import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  title: "Muhammad Azeem - AI Engineer Portfolio",
  description:
    "AI Engineer specializing in machine learning, federated learning, NLP, and MLOps. Explore my projects built with Python, TensorFlow, and PyTorch.",
  keywords: [
    "Muhammad Azeem",
    "AI Engineer",
    "Machine Learning",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Federated Learning",
    "NLP",
    "MLOps",
    "Data Science",
    "Deep Learning",
    "Artificial Intelligence",
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
    siteName: "Muhammad Azeem - AI Engineer",
    title: "Muhammad Azeem - AI Engineer Portfolio",
    description:
      "AI Engineer specializing in machine learning, federated learning, NLP, and MLOps. Explore my projects built with Python, TensorFlow, and PyTorch.",
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
    title: "Muhammad Azeem - AI Engineer",
    description: "AI Engineer specializing in machine learning, federated learning, and MLOps",
    creator: "@AzeemChaudhry",
  },
  alternates: {
    canonical: "https://muhammadazeem.com",
  },
  generator: "v0.app",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preload" href="/images/portfolioimage.png" as="image" type="image/png" />
        <link rel="preload" href="/images/profile.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/background.jpg" as="image" type="image/jpeg" />
        <link rel="dns-prefetch" href="https://medium.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
              description: "AI Engineer specializing in machine learning, federated learning, NLP, and MLOps",
              url: "https://muhammadazeem.com",
              image: "https://muhammadazeem.com/images/profile.jpg",
              sameAs: [
                "https://github.com/AzeemChaudhry",
                "https://www.linkedin.com/in/chaudhryazeem/",
              ],
              knowsAbout: [
                "Machine Learning",
                "Python",
                "TensorFlow",
                "PyTorch",
                "Federated Learning",
                "NLP",
                "MLOps",
                "Deep Learning",
                "Data Science",
              ],
            }),
          }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
