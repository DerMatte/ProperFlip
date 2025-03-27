"use client"

import { DashboardLayout } from "./dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Property } from "@/types/property"
import Image from "next/image"
import { ArrowLeft, Calendar, Edit, Globe, Home, MapPin, Share2, Trash } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PropertyDetailViewProps {
  property: Property
}

export default function PropertyDetailView({ property }: PropertyDetailViewProps) {
  if (!property) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex justify-center items-center h-64">
            <p>Property not found.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (e) {
      console.error("Error formatting date:", e)
      return "Invalid date"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/properties">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{property.title}</h2>
            <Badge
              className={`ml-2 ${
                property.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : property.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
              }`}
            >
              {property.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[400px] w-full">
                  <Image
                    src={property.image_url || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="space-y-4">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-medium">{property.bedrooms}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-medium">{property.bathrooms}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Square Feet</p>
                        <p className="font-medium">{property.sqft.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Price per Sq Ft</p>
                        <p className="font-medium">${Math.round(property.price / property.sqft).toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p>{property.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <p>Single Family Home</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p>Listed on {formatDate(property.created_at)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">
                      {property.description || "No description available for this property."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Property Listed</p>
                          <p className="text-sm text-muted-foreground">{formatDate(property.created_at)}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Edit className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Last Updated</p>
                          <p className="text-sm text-muted-foreground">{formatDate(property.updated_at)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${property.price.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  ${Math.round(property.price / property.sqft).toLocaleString()} per square foot
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Schedule Viewing</Button>
                <Button variant="outline" className="w-full">
                  Contact Agent
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing</CardTitle>
                <CardDescription>Syndication status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p>ImmobilienScout24</p>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Synced
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p>Immonet</p>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Synced
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p>Immowelt</p>
                  </div>
                  <Badge variant="outline" className="border-muted text-muted-foreground">
                    Not Synced
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Syndication
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

