'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import { LayoutDashboard, Mail, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/inquiries',
      label: 'Inquiries',
      icon: Mail,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-secondary/50 border border-border/30 hover:border-border/50 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-secondary/30 border-r border-border/30 transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8 pt-12 lg:pt-0">
            <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">Management Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'text-foreground hover:bg-secondary/50 border border-transparent'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar spacer for desktop */}
      <div className="hidden lg:block w-64" />
    </>
  )
}
