"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/types/property"
import Image from "next/image"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface PropertyDetailViewProps {
  property: Property
}

export default function PropertyDetailView({ property }: PropertyDetailViewProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/app/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{property.title}</h2>
          <Badge
            className={`ml-2 ${
              property.status === "Acquisition"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : property.status === "Preparation"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
            }`}
          >
            {property.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/app/properties/${property.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <div className="relative h-[300px] w-full">
              <Image
                src={property.image_url || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-semibold">${property.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold">{property.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="text-lg font-semibold">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
                <p className="text-lg font-semibold">{property.bathrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Square Feet</p>
                <p className="text-lg font-semibold">{property.sqft.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price per Sq Ft</p>
                <p className="text-lg font-semibold">
                  ${Math.round(property.price / property.sqft).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-lg">{property.address}</p>
            </div>

            {property.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-lg whitespace-pre-line">{property.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

