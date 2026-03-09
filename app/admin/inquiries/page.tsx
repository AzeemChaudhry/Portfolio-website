"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/hooks/useAdmin"
import { Card } from "@/components/ui/card"
import { Search, Filter, Eye, Trash2, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface ProjectInquiry {
  id: string
  client_name: string
  client_email: string
  client_company: string | null
  project_title: string
  project_description: string
  timeline_months: number | null
  budget_range: string | null
  project_type: string | null
  complexity_score: number
  ai_fit_score: number | null
  status: "new" | "viewed" | "interested" | "negotiating" | "completed" | "rejected"
  created_at: string
  admin_notes: string | null
  priority: "low" | "medium" | "high" | "critical"
}

export default function AdminInquiriesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAdmin()
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "new" | "viewed" | "interested">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null)
  const [adminNote, setAdminNote] = useState("")

  // Auth check - if not authenticated, the layout will redirect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      return // Layout will handle redirect
    }
  }, [isAuthenticated, authLoading])

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      
      const res = await fetch("/api/admin/inquiries", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch inquiries")
      }

      const data = await res.json()
      setInquiries(data || [])
    } catch (error) {
      console.error("[v0] Error fetching inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: ProjectInquiry["status"]) => {
    try {
      const token = localStorage.getItem("adminToken")
      
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error("Failed to update status")
      }

      setInquiries(prev =>
        prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq))
      )
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus })
      }
    } catch (error) {
      console.error("[v0] Error updating status:", error)
    }
  }

  const addAdminNote = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_notes: adminNote }),
      })

      if (!res.ok) {
        throw new Error("Failed to add note")
      }

      setInquiries(prev =>
        prev.map(inq => (inq.id === id ? { ...inq, admin_notes: adminNote } : inq))
      )
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, admin_notes: adminNote })
      }
      setAdminNote("")
    } catch (error) {
      console.error("[v0] Error adding note:", error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      const token = localStorage.getItem("adminToken")
      
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Failed to delete inquiry")
      }

      setInquiries(prev => prev.filter(inq => inq.id !== id))
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null)
      }
    } catch (error) {
      console.error("[v0] Error deleting inquiry:", error)
    }
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = filter === "all" || inq.status === filter
    const matchesSearch =
      inq.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.client_email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === "new").length,
    interested: inquiries.filter(i => i.status === "interested").length,
    avgComplexity: Math.round(
      inquiries.reduce((sum, i) => sum + i.complexity_score, 0) / inquiries.length || 0
    )
  }

  const getStatusColor = (status: ProjectInquiry["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "viewed":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "interested":
        return "bg-green-100 text-green-800 border-green-300"
      case "negotiating":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return ""
    }
  }

  const getComplexityColor = (score: number) => {
    if (score < 33) return "text-orange-500"
    if (score < 66) return "text-yellow-500"
    return "text-green-500"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading inquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Project Inquiries</h1>
          <p className="text-muted-foreground">Track and manage incoming AI project proposals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-3xl font-bold text-foreground">{stats.new}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interested</p>
                <p className="text-3xl font-bold text-foreground">{stats.interested}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Complexity</p>
                <p className={`text-3xl font-bold ${getComplexityColor(stats.avgComplexity)}`}>
                  {stats.avgComplexity}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, or project..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "new", "viewed", "interested"] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      filter === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-foreground border border-border/30 hover:border-border/50"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries */}
            <div className="space-y-3">
              {filteredInquiries.length === 0 ? (
                <Card className="p-8 text-center border border-border/50">
                  <p className="text-muted-foreground">No inquiries found</p>
                </Card>
              ) : (
                filteredInquiries.map(inquiry => (
                  <Card
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`p-4 border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedInquiry?.id === inquiry.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{inquiry.project_title}</h3>
                        <p className="text-sm text-muted-foreground">{inquiry.client_name}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Complexity:</span>
                        <span className={`font-semibold ${getComplexityColor(inquiry.complexity_score)}`}>
                          {inquiry.complexity_score}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Match:</span>
                        <span className="font-semibold text-primary">{inquiry.match_percentage}%</span>
                      </div>
                      <div className="text-muted-foreground ml-auto">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div>
            {selectedInquiry ? (
              <Card className="border border-border/50 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Details</h2>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Client</p>
                    <p className="text-foreground font-medium">{selectedInquiry.client_name}</p>
                    <p className="text-sm text-muted-foreground">{selectedInquiry.client_email}</p>
                  </div>

                  {selectedInquiry.company_name && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Company</p>
                      <p className="text-foreground">{selectedInquiry.company_name}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Project Description</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{selectedInquiry.project_description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Timeline</p>
                      <p className="text-foreground">{selectedInquiry.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Budget</p>
                      <p className="text-foreground">{selectedInquiry.budget}</p>
                    </div>
                  </div>

                  {selectedInquiry.admin_notes && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Your Notes</p>
                      <p className="text-sm text-foreground">{selectedInquiry.admin_notes}</p>
                    </div>
                  )}
                </div>

                {/* Status Update Buttons */}
                <div className="space-y-2 mb-4 border-t border-border/50 pt-4">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Update Status</p>
                  <div className="space-y-2">
                    {(["viewed", "interested", "negotiating", "rejected", "completed"] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedInquiry.id, status)}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          selectedInquiry.status === status
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-foreground border border-border/30 hover:border-border/50"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="border-t border-border/50 pt-4">
                  <label className="text-xs text-muted-foreground uppercase font-semibold block mb-2">
                    Add Internal Note
                  </label>
                  <textarea
                    value={adminNote}
                    onChange={e => setAdminNote(e.target.value)}
                    placeholder="Your internal notes..."
                    className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 text-sm resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => addAdminNote(selectedInquiry.id)}
                    className="w-full mt-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </Card>
            ) : (
              <Card className="border border-border/50 p-6 sticky top-24">
                <p className="text-center text-muted-foreground">Select an inquiry to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
