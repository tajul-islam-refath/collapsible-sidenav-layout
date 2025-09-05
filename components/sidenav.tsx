"use client"

import { useState, useEffect } from "react"

interface SubMenuItem {
  label: string
  href?: string
  isActive?: boolean
}

interface NavItemProps {
  icon: string
  label: string
  isCollapsed: boolean
  isHovered: boolean
  isActive?: boolean
  subItems?: SubMenuItem[]
}

function NavItem({ icon, label, isCollapsed, isHovered, isActive = false, subItems }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSubItems = subItems && subItems.length > 0

  return (
    <div className="w-full">
      <button
        onClick={() => hasSubItems && setIsExpanded(!isExpanded)}
        className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        } ${isCollapsed && !isHovered ? "justify-center" : "justify-between"}`}
      >
        <div className={`flex items-center ${isCollapsed && !isHovered ? "justify-center" : "space-x-3"}`}>
          <span className={`text-lg flex-shrink-0 ${isCollapsed && !isHovered ? "text-xl" : ""}`}>{icon}</span>
          {(!isCollapsed || isHovered) && (
            <span
              className={`font-medium text-sm transition-opacity duration-300 ${
                isCollapsed && isHovered ? "opacity-100" : isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              {label}
            </span>
          )}
        </div>
        {hasSubItems && (!isCollapsed || isHovered) && (
          <svg
            className={`w-4 h-4 text-sidebar-foreground transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            } ${isCollapsed && isHovered ? "opacity-100" : isCollapsed ? "opacity-0" : "opacity-100"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {hasSubItems && (!isCollapsed || isHovered) && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative ml-6 mt-1 space-y-1">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-500"></div>

            {subItems.map((subItem, index) => (
              <div key={index} className="relative">
                <button
                  className={`w-full flex items-center p-2 pl-6 rounded-lg transition-all duration-300 ${
                    subItem.isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <span className="font-medium text-sm">{subItem.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Sidenav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Load collapsed state from cookie on mount
  useEffect(() => {
    const savedState = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidenavCollapsed="))
      ?.split("=")[1]

    if (savedState) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to cookie
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    document.cookie = `sidenavCollapsed=${newState}; path=/; max-age=31536000` // 1 year
  }

  const sidenavWidth = isCollapsed ? (isHovered ? "w-64" : "w-16") : "w-64"

  return (
    <div
      className={`${sidenavWidth} bg-sidebar border-r border-sidebar-border transition-all duration-500 ease-in-out relative flex flex-col`}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
    >
      {/* Sidenav Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div
          className={`flex items-center transition-all duration-300 ${isCollapsed && !isHovered ? "justify-center space-x-0" : "space-x-3"}`}
        >
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-sm">D</span>
          </div>
          {(!isCollapsed || isHovered) && (
            <h1
              className={`text-sidebar-foreground font-semibold text-lg transition-opacity duration-300 ${
                isCollapsed && isHovered ? "opacity-100" : isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Dashboard
            </h1>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon="🏠" label="Home" isCollapsed={isCollapsed} isHovered={isHovered} isActive={true} />
        <NavItem
          icon="📊"
          label="Analytics"
          isCollapsed={isCollapsed}
          isHovered={isHovered}
          subItems={[
            { label: "Overview", isActive: false },
            { label: "Reports", isActive: true },
            { label: "Insights", isActive: false },
          ]}
        />
        <NavItem
          icon="👥"
          label="Users"
          isCollapsed={isCollapsed}
          isHovered={isHovered}
          subItems={[
            { label: "All Users", isActive: false },
            { label: "Active Users", isActive: false },
            { label: "User Roles", isActive: false },
          ]}
        />
        <NavItem
          icon="⚙️"
          label="Settings"
          isCollapsed={isCollapsed}
          isHovered={isHovered}
          subItems={[
            { label: "General", isActive: false },
            { label: "Security", isActive: false },
            { label: "Notifications", isActive: false },
            { label: "Integrations", isActive: false },
          ]}
        />
        <NavItem icon="📝" label="Reports" isCollapsed={isCollapsed} isHovered={isHovered} />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div
          className={`flex items-center transition-all duration-300 ${isCollapsed && !isHovered ? "justify-center space-x-0" : "space-x-3"}`}
        >
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sidebar-accent-foreground text-sm">JD</span>
          </div>
          {(!isCollapsed || isHovered) && (
            <div
              className={`flex-1 min-w-0 transition-opacity duration-300 ${
                isCollapsed && isHovered ? "opacity-100" : isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="text-sidebar-foreground font-medium text-sm truncate">John Doe</p>
              <p className="text-sidebar-foreground/60 text-xs truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button - positioned on right border */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-3 top-6 w-6 h-6 bg-sidebar border border-sidebar-border rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors duration-300 z-10"
      >
        <svg
          className={`w-3 h-3 text-sidebar-foreground transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  )
}
