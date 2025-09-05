"use client"

import DashboardLayout from "@/app/dashboard-layout"

// Dashboard Card Component
function DashboardCard({
  title,
  value,
  change,
  isNegative = false,
}: {
  title: string
  value: string
  change: string
  isNegative?: boolean
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-muted-foreground text-sm font-medium mb-2">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-card-foreground text-2xl font-bold">{value}</span>
        <span className={`text-sm font-medium ${isNegative ? "text-destructive" : "text-green-600"}`}>{change}</span>
      </div>
    </div>
  )
}

// Activity Item Component
function ActivityItem({
  user,
  action,
  time,
}: {
  user: string
  action: string
  time: string
}) {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-accent rounded-lg transition-colors">
      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
        <span className="text-muted-foreground text-xs font-medium">{user[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-card-foreground text-sm">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-muted-foreground text-xs">{time}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Users" value="12,345" change="+12%" />
          <DashboardCard title="Revenue" value="$45,678" change="+8%" />
          <DashboardCard title="Orders" value="1,234" change="+15%" />
          <DashboardCard title="Conversion" value="3.2%" change="-2%" isNegative />
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-card-foreground font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <ActivityItem user="Alice Johnson" action="created a new project" time="2 hours ago" />
              <ActivityItem user="Bob Smith" action="updated user settings" time="4 hours ago" />
              <ActivityItem user="Carol Davis" action="completed task #123" time="6 hours ago" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-card-foreground font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Add User
              </button>
              <button className="p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                Generate Report
              </button>
              <button className="p-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors">
                View Analytics
              </button>
              <button className="p-4 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
