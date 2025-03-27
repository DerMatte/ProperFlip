"use client"

import { DashboardLayout } from "./dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyPerformanceChart } from "./property-performance-chart"
import { InquirySourceChart } from "./inquiry-source-chart"
import { PropertyTypeDistribution } from "./property-type-distribution"
import { LeadConversionChart } from "./lead-conversion-chart"

export default function AnalyticsView() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,324</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+22% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.2%</div>
                  <p className="text-xs text-muted-foreground">+3.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2h</div>
                  <p className="text-xs text-muted-foreground">-15% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Property Performance</CardTitle>
                  <CardDescription>View trends and performance metrics for your listings</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PropertyPerformanceChart />
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
          </TabsContent>
          <TabsContent value="properties" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Property Views Over Time</CardTitle>
                  <CardDescription>Number of views for each property over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PropertyPerformanceChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Property Type Distribution</CardTitle>
                  <CardDescription>Breakdown of your property portfolio by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyTypeDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="inquiries" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Inquiry Trends</CardTitle>
                  <CardDescription>Number of inquiries received over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PropertyPerformanceChart />
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
          </TabsContent>
          <TabsContent value="conversions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Lead Conversion Rate</CardTitle>
                  <CardDescription>Percentage of inquiries that convert to viewings and sales</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LeadConversionChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Time to Conversion</CardTitle>
                  <CardDescription>Average days from inquiry to sale by property type</CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyTypeDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

