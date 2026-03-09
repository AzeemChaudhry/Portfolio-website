import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Project Inquiries",
  description: "Manage incoming AI project proposals"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
