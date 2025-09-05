"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Loading Dashboard...</h1>
        <p className="text-muted-foreground">Redirecting you to the dashboard</p>
      </div>
    </div>
  )
}
