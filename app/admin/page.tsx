'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card } from '@/components/ui/card'
import { BarChart3, Mail, AlertCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface InquirySummary {
  total: number
  new: number
  interested: number
  completed: number
  avgComplexity: number
  recentCount: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<InquirySummary>({
    total: 0,
    new: 0,
    interested: 0,
    completed: 0,
    avgComplexity: 0,
    recentCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('project_inquiries')
        .select('status, complexity_score, created_at')

      if (fetchError) throw fetchError

      if (data) {
        const now = new Date()
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        
        const summary = {
          total: data.length,
          new: data.filter((i: any) => i.status === 'new').length,
          interested: data.filter((i: any) => i.status === 'interested').length,
          completed: data.filter((i: any) => i.status === 'completed').length,
          avgComplexity: Math.round(
            data.reduce((sum: number, i: any) => sum + (i.complexity_score || 0), 0) / 
            (data.length || 1)
          ),
          recentCount: data.filter((i: any) => 
            new Date(i.created_at) > sevenDaysAgo
          ).length,
        }
        
        setStats(summary)
      }
    } catch (err) {
      console.error('[v0] Error fetching stats:', err)
      setError('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your project overview.</p>
        </div>

        {/* Error message if any */}
        {error && (
          <Card className="p-4 mb-8 bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Inquiries */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="text-primary" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">All project inquiries received</p>
          </Card>

          {/* New Inquiries */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">New Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{stats.new}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <AlertCircle className="text-blue-500" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </Card>

          {/* Interested Inquiries */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interested Projects</p>
                <p className="text-3xl font-bold text-foreground">{stats.interested}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Ready for negotiation</p>
          </Card>

          {/* Recent Inquiries (7 days) */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recent (7 days)</p>
                <p className="text-3xl font-bold text-foreground">{stats.recentCount}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Calendar className="text-purple-500" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">New in the last week</p>
          </Card>

          {/* Completed Projects */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <DollarSign className="text-emerald-500" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </Card>

          {/* Average Complexity */}
          <Card className="p-6 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Complexity</p>
                <p className="text-3xl font-bold text-foreground">{stats.avgComplexity}/10</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <BarChart3 className="text-orange-500" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Project complexity rating</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/admin/inquiries"
                className="block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-center"
              >
                View All Inquiries
              </Link>
              <Link
                href="/admin/inquiries?filter=new"
                className="block px-4 py-2 rounded-lg bg-secondary/50 text-foreground font-medium border border-border/30 hover:border-border/50 transition-colors text-center"
              >
                Review New Inquiries
              </Link>
              <Link
                href="/admin/settings"
                className="block px-4 py-2 rounded-lg bg-secondary/50 text-foreground font-medium border border-border/30 hover:border-border/50 transition-colors text-center"
              >
                Admin Settings
              </Link>
            </div>
          </Card>

          <Card className="p-6 border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Status Overview</p>
                <p className="text-foreground">
                  {stats.new} new inquiries out of {stats.total} total. {stats.interested} projects are interested in moving forward.
                </p>
              </div>
              <div className="pt-3 border-t border-border/30">
                <p className="text-muted-foreground mb-1">Next Steps</p>
                <p className="text-foreground">
                  Review pending inquiries and update their status as you progress through the pipeline.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
