"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { toast } from "@/hooks/use-toast"

export default function AddPropertyForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    status: "Active",
    image_url: "/placeholder.svg?height=400&width=600",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      if (
        !formData.title ||
        !formData.address ||
        !formData.price ||
        !formData.bedrooms ||
        !formData.bathrooms ||
        !formData.sqft
      ) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Convert string values to numbers
      const propertyData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        bedrooms: Number.parseInt(formData.bedrooms),
        bathrooms: Number.parseInt(formData.bathrooms),
        sqft: Number.parseInt(formData.sqft),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) {
        throw new Error("Failed to add property")
      }

      toast({
        title: "Property added",
        description: "Your property has been added successfully.",
      })

      // Redirect to the properties list
      router.push("/app/properties")
      router.refresh()
    } catch (error) {
      console.error("Error adding property:", error)
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/app/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Property Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Apartment in Downtown"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 123 Main St, New York, NY 10001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property..."
                className="min-h-[150px]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 250000"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">
                  Bedrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">
                  Bathrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="0"
                  step="0.5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">
                  Square Feet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sqft"
                  name="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="e.g. https://example.com/image.jpg"
              />
              <p className="text-sm text-muted-foreground">
                Enter a URL for the property image. Leave blank to use a placeholder.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/app/properties">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

