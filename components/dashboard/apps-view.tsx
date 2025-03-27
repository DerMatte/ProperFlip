"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "./dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Home,
  LineChart,
  Mail,
  MessageSquare,
  PieChart,
  Search,
  Share2,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

// Define app types
type App = {
  id: string
  title: string
  description: string
  category: "marketing" | "productivity" | "analytics" | "crm" | "utilities"
  icon: React.ReactNode
  preview: string
  pricing: "free" | "premium" | "enterprise"
  isNew?: boolean
  isPopular?: boolean
  publisher?: string
}

export default function AppsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [installedApps, setInstalledApps] = useState<string[]>([])

  // App data
  const apps: App[] = [
    // Marketing apps
    {
      id: "social-media-manager",
      title: "Social Media Manager",
      description: "Schedule and manage posts across all your social media channels.",
      category: "marketing",
      icon: <Share2 className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "MarketingPro",
      isPopular: true,
    },
    {
      id: "email-campaigns",
      title: "Email Campaigns",
      description: "Create, send, and track email marketing campaigns to your clients.",
      category: "marketing",
      icon: <Mail className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "MailMaster",
    },
    {
      id: "listing-syndication",
      title: "Listing Syndication",
      description: "Automatically publish your listings to multiple real estate portals.",
      category: "marketing",
      icon: <Globe className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "enterprise",
      publisher: "SyndicateNow",
    },
    {
      id: "virtual-staging",
      title: "Virtual Staging",
      description: "Transform empty rooms with virtual furniture and decor.",
      category: "marketing",
      icon: <Home className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "StageVirtual",
      isNew: true,
    },

    // Productivity apps
    {
      id: "document-manager",
      title: "Document Manager",
      description: "Organize, store, and e-sign all your real estate documents.",
      category: "productivity",
      icon: <FileText className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "free",
      publisher: "DocuSign",
      isPopular: true,
    },
    {
      id: "appointment-scheduler",
      title: "Appointment Scheduler",
      description: "Allow clients to book viewings and meetings directly from your calendar.",
      category: "productivity",
      icon: <Calendar className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "free",
      publisher: "CalendarPro",
    },
    {
      id: "task-manager",
      title: "Task Manager",
      description: "Track and manage all your real estate tasks and deadlines.",
      category: "productivity",
      icon: <CheckCircle className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "free",
      publisher: "TaskMaster",
    },
    {
      id: "time-tracker",
      title: "Time Tracker",
      description: "Track time spent on different clients and properties.",
      category: "productivity",
      icon: <Clock className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "TimeWise",
      isNew: true,
    },

    // Analytics apps
    {
      id: "market-insights",
      title: "Market Insights",
      description: "Get real-time data and analytics on your local real estate market.",
      category: "analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "DataMetrics",
      isPopular: true,
    },
    {
      id: "performance-tracker",
      title: "Performance Tracker",
      description: "Track your sales performance and identify growth opportunities.",
      category: "analytics",
      icon: <LineChart className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "PerformancePro",
    },
    {
      id: "client-analytics",
      title: "Client Analytics",
      description: "Analyze client behavior and preferences to improve your service.",
      category: "analytics",
      icon: <PieChart className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "enterprise",
      publisher: "ClientInsight",
    },
    {
      id: "revenue-forecaster",
      title: "Revenue Forecaster",
      description: "Predict future revenue based on your pipeline and market trends.",
      category: "analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "enterprise",
      publisher: "ForecastPro",
      isNew: true,
    },

    // CRM apps
    {
      id: "lead-manager",
      title: "Lead Manager",
      description: "Capture, nurture, and convert leads into clients.",
      category: "crm",
      icon: <Users className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "LeadPro",
      isPopular: true,
    },
    {
      id: "client-portal",
      title: "Client Portal",
      description: "Give clients a dedicated portal to track their property journey.",
      category: "crm",
      icon: <Building2 className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "PortalPlus",
    },
    {
      id: "feedback-collector",
      title: "Feedback Collector",
      description: "Automatically collect and analyze client feedback after viewings.",
      category: "crm",
      icon: <MessageSquare className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "free",
      publisher: "FeedbackLoop",
    },
    {
      id: "referral-tracker",
      title: "Referral Tracker",
      description: "Track and manage your referral network and commissions.",
      category: "crm",
      icon: <ShoppingCart className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "ReferralPro",
      isNew: true,
    },

    // Utilities
    {
      id: "property-valuation",
      title: "Property Valuation",
      description: "Get accurate property valuations based on market data.",
      category: "utilities",
      icon: <Home className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "ValuePro",
      isPopular: true,
    },
    {
      id: "mortgage-calculator",
      title: "Mortgage Calculator",
      description: "Help clients calculate mortgage payments and affordability.",
      category: "utilities",
      icon: <Calculator className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "free",
      publisher: "MortgageMath",
    },
    {
      id: "neighborhood-data",
      title: "Neighborhood Data",
      description: "Provide detailed information about neighborhoods and schools.",
      category: "utilities",
      icon: <Search className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "NeighborhoodPro",
    },
    {
      id: "property-inspector",
      title: "Property Inspector",
      description: "Digital checklist and reporting tool for property inspections.",
      category: "utilities",
      icon: <CheckCircle className="h-5 w-5" />,
      preview: "/placeholder.svg?height=120&width=240",
      pricing: "premium",
      publisher: "InspectPro",
      isNew: true,
    },
  ]

  // Filter apps based on search query
  const filteredApps = apps.filter(
    (app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.publisher?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group apps by category
  const marketingApps = filteredApps.filter((app) => app.category === "marketing")
  const productivityApps = filteredApps.filter((app) => app.category === "productivity")
  const analyticsApps = filteredApps.filter((app) => app.category === "analytics")
  const crmApps = filteredApps.filter((app) => app.category === "crm")
  const utilityApps = filteredApps.filter((app) => app.category === "utilities")

  const handleInstallApp = (appId: string) => {
    if (installedApps.includes(appId)) {
      toast({
        title: "App already installed",
        description: "This app is already installed on your dashboard.",
      })
      return
    }

    setInstalledApps((prev) => [...prev, appId])
    toast({
      title: "App installed",
      description: "The app has been successfully installed and added to your dashboard.",
    })
  }

  const handleUninstallApp = (appId: string) => {
    setInstalledApps((prev) => prev.filter((id) => id !== appId))
    toast({
      title: "App uninstalled",
      description: "The app has been successfully uninstalled from your dashboard.",
    })
  }

  // Render an app card
  const renderAppCard = (app: App) => (
    <Card key={app.id} className="overflow-hidden">
      <div className="relative">
        <Image
          src={app.preview || "/placeholder.svg"}
          alt={app.title}
          width={240}
          height={120}
          className="w-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {app.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
          {app.isPopular && <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>}
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1">{app.icon}</div>
          <div>
            <CardTitle className="text-lg">{app.title}</CardTitle>
            {app.publisher && <p className="text-xs text-muted-foreground">By {app.publisher}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">{app.description}</CardDescription>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`
            ${
              app.pricing === "free"
                ? "border-green-500 text-green-500"
                : app.pricing === "premium"
                  ? "border-blue-500 text-blue-500"
                  : "border-purple-500 text-purple-500"
            }
          `}
          >
            {app.pricing === "free" ? "Free" : app.pricing === "premium" ? "Premium" : "Enterprise"}
          </Badge>
          {app.category === "marketing" && <Badge variant="secondary">Marketing</Badge>}
          {app.category === "productivity" && <Badge variant="secondary">Productivity</Badge>}
          {app.category === "analytics" && <Badge variant="secondary">Analytics</Badge>}
          {app.category === "crm" && <Badge variant="secondary">CRM</Badge>}
          {app.category === "utilities" && <Badge variant="secondary">Utility</Badge>}
        </div>
      </CardContent>
      <CardFooter>
        {installedApps.includes(app.id) ? (
          <Button className="w-full" variant="outline" onClick={() => handleUninstallApp(app.id)}>
            Uninstall
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleInstallApp(app.id)}
            disabled={app.pricing === "enterprise" && !installedApps.includes(app.id)}
          >
            {app.pricing === "enterprise" && !installedApps.includes(app.id) ? "Contact Sales" : "Install App"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  // Render a section of apps
  const renderAppSection = (title: string, apps: App[]) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      {apps.length === 0 ? (
        <p className="text-muted-foreground">No apps found in this category.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{apps.map(renderAppCard)}</div>
      )}
    </div>
  )

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">App Marketplace</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search apps by name, description, or publisher..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Apps</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {renderAppSection("Marketing Apps", marketingApps)}
            {renderAppSection("Productivity Apps", productivityApps)}
            {renderAppSection("Analytics Apps", analyticsApps)}
            {renderAppSection("CRM Apps", crmApps)}
            {renderAppSection("Utility Apps", utilityApps)}
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            {renderAppSection("Marketing Apps", marketingApps)}
          </TabsContent>

          <TabsContent value="productivity" className="space-y-4">
            {renderAppSection("Productivity Apps", productivityApps)}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {renderAppSection("Analytics Apps", analyticsApps)}
          </TabsContent>

          <TabsContent value="crm" className="space-y-4">
            {renderAppSection("CRM Apps", crmApps)}
          </TabsContent>

          <TabsContent value="utilities" className="space-y-4">
            {renderAppSection("Utility Apps", utilityApps)}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function Calculator(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

