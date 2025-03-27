"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "./dashboard-layout"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Property } from "@/types/property"
import Link from "next/link"

export default function PropertiesView() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true)
      setError(null)

      try {
        const supabase = getSupabaseClient()
        let query = supabase.from("properties").select("*")

        if (statusFilter !== "all") {
          query = query.eq("status", statusFilter)
        }

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching properties:", error)
          setError("Failed to load properties. Please try again later.")
          setProperties([])
        } else {
          setProperties(data || [])
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err)
        setError("An unexpected error occurred. Please try again later.")
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [statusFilter, searchQuery])

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
          <Button asChild>
            <Link href="/dashboard/properties/add">
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search properties..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading properties...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64 text-red-500">
                <p>{error}</p>
              </div>
            ) : properties.length === 0 ? (
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
                            <Link href={`/dashboard/properties/${property.id}`} className="font-medium hover:underline">
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
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            property.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : property.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {property.status}
                        </div>
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
                              <Link href={`/dashboard/properties/${property.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit
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
    </DashboardLayout>
  )
}

