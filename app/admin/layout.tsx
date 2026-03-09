import type { Metadata } from "next"
import { ProtectedAdminLayout } from "@/components/admin-layout"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage incoming AI project proposals and inquiries"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedAdminLayout>
      {children}
    </ProtectedAdminLayout>
  )
}
