import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentInquiries } from "@/components/dashboard/recent-inquiries"
import { PropertyListingChart } from "@/components/dashboard/property-listing-chart"
import { PropertyTypeDistribution } from "@/components/dashboard/property-type-distribution"
import { LeadConversionChart } from "@/components/dashboard/lead-conversion-chart"
import { InquirySourceChart } from "@/components/dashboard/inquiry-source-chart"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch analytics data
  const { data: stats, error: statsError } = await supabase
    .from("analytics_stats")
    .select("*")
    .single()

  if (statsError) {
    console.error("Error fetching stats:", statsError)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_properties || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.new_properties_mtd || 0} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_inquiries || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.new_inquiries_mtd || 0} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.conversion_rate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              {stats?.conversion_rate_change || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.avg_response_time || 0} hours</div>
            <p className="text-xs text-muted-foreground">
              {stats?.response_time_change || 0}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Monthly listing views and inquiries</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PropertyListingChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Conversion</CardTitle>
            <CardDescription>Inquiry to viewing conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadConversionChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Property Type Distribution</CardTitle>
            <CardDescription>Distribution of property types in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyTypeDistribution />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Inquiry Sources</CardTitle>
            <CardDescription>Where your inquiries are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <InquirySourceChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 