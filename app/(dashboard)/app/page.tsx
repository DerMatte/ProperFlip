import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Home, MessageSquare, Users } from "lucide-react"
import { RecentInquiries } from "@/components/dashboard/recent-inquiries"
import { PropertyListingChart } from "@/components/dashboard/property-listing-chart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import type { Property } from "@/types/property"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch recent properties
  const { data: recentProperties, error: propertiesError } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch property count
  const { count: totalProperties, error: countError } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })

  if (propertiesError || countError) {
    console.error("Error fetching data:", { propertiesError, countError })
    // You might want to handle this error differently
  }

  // Hardcoded stats for now - in a real app, these would come from the database
  const stats = {
    totalProperties: totalProperties || 0,
    activeInquiries: 12,
    potentialClients: 36,
    revenueForecast: 24500,
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeInquiries}</div>
              <p className="text-xs text-muted-foreground">+4 since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.potentialClients}</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenueForecast.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Recent Properties</h3>
          <Button variant="link" size="sm" asChild>
            <Link href="/app/properties">View All Properties</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {!recentProperties || recentProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            recentProperties.map((property: Property) => (
              <Card key={property.id}>
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    <img
                      src={property.image_url || "/placeholder.svg?height=200&width=400"}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${
                        property.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : property.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {property.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.address}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-lg">${property.price.toLocaleString()}</span>
                      <div className="text-sm text-muted-foreground">
                        {property.bedrooms} bd | {property.bathrooms} ba | {property.sqft.toLocaleString()} sqft
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/app/properties/${property.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>View trends and performance metrics for your listings</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <PropertyListingChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest inquiries from potential clients</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentInquiries />
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

