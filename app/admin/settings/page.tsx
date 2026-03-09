'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Key, Shield } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your admin account and security settings</p>
        </div>

        {/* Security Section */}
        <Card className="p-8 border border-border/50 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Security</h2>
              <p className="text-sm text-muted-foreground">Manage your account security and access</p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-border/30">
            {/* Password Change */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Change Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Update your admin password regularly to maintain security
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Change Password
              </button>
            </div>

            {/* Session Info */}
            <div className="pt-6 border-t border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-2">Active Sessions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your current session is active. Sessions expire after 7 days of inactivity.
              </p>
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-600">Session Active</span>
              </div>
            </div>
          </div>
        </Card>

        {/* System Info */}
        <Card className="p-8 border border-border/50">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Key className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">System Information</h2>
              <p className="text-sm text-muted-foreground">Application details and status</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border/30">
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="text-foreground font-medium">Application</span>
              <span className="text-muted-foreground">Admin Dashboard v1.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="text-foreground font-medium">Status</span>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <span className="text-foreground font-medium">Last Updated</span>
              <span className="text-muted-foreground">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </Card>

        {/* Coming Soon Notice */}
        <div className="mt-8 flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-blue-600 mb-1">More Settings Coming Soon</h3>
            <p className="text-sm text-blue-600/80">
              Additional settings for API keys, notifications, and team management will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
