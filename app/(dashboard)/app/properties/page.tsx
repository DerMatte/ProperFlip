import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import type { Property } from "@/types/property"
import { PropertyStatusSelector } from "./PropertyStatusSelector"
import { revalidatePath } from "next/cache"

async function updatePropertyStatus(id: string, status: string): Promise<void> {
  "use server"
  
  const supabase = await createClient()
  
  // First get the user's team
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.error("No authenticated user found")
    throw new Error("Unauthorized")
  }

  // Get the user's team
  const { data: teamMember, error: teamError } = await supabase
    .from('team_members')
    .select('team_id, role')
    .eq('user_id', user.id)
    .single()

  if (teamError) {
    console.error("Error fetching team:", teamError)
    throw new Error("Failed to verify team membership")
  }

  // Get the property's current data
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .select("team_id")
    .eq("id", id)
    .single()

  if (propertyError) {
    console.error("Error fetching property:", propertyError)
    throw new Error("Failed to fetch property")
  }

  // Verify team membership
  if (property.team_id !== teamMember.team_id) {
    console.error("User's team does not match property's team")
    throw new Error("Unauthorized: Property belongs to a different team")
  }
  
  const { error } = await supabase
    .from("properties")
    .update({ status })
    .eq("id", id)
  
  if (error) {
    console.error("Error updating property status:", error)
    throw new Error(error.message)
  }
  
  revalidatePath("/app/properties")
}

export default async function PropertiesPage() {
  const supabase = await createClient()
  
  // Fetch properties
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
    // You might want to throw an error here or handle it differently
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
        <Button asChild>
          <Link href="/app/properties/add">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {!properties || properties.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No properties found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-24 overflow-hidden rounded-md">
                          <Image
                            src={property.image_url || "/placeholder.svg"}
                            alt={property.title}
                            width={150}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/app/properties/${property.id}`} className="font-medium hover:underline">
                            {property.title}
                          </Link>
                          <div className="text-sm text-muted-foreground">{property.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${property.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        {property.bedrooms} bd | {property.bathrooms} ba | {property.sqft.toLocaleString()} sqft
                      </div>
                    </TableCell>
                    <TableCell>
                      <PropertyStatusSelector
                        property={property}
                        handleStatusChange={updatePropertyStatus}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/app/properties/${property.id}`}>
                              <Edit className="mr-2 h-4 w-4" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/app/properties/${property.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
