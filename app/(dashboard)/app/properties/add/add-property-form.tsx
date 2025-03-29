"use client"

import React, { useOptimistic, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { createPropertyAction } from "@/app/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"

type PropertyFormState = {
  pending: boolean;
  error: string | null;
  data: any | null;
}

export function AddPropertyForm() {
  const router = useRouter()
  const [status, setStatus] = useState("Acquisition")
  const [formState, setFormState] = useState<PropertyFormState>({
    pending: false,
    error: null,
    data: null,
  })

  // Optimistic state update
  const [optimisticState, addOptimisticProperty] = useOptimistic(
    formState,
    (state, newState: Partial<PropertyFormState>) => ({ ...state, ...newState })
  )

  async function handleCreateProperty(formData: FormData) {
    // Optimistically update UI
    addOptimisticProperty({ pending: true, error: null })
    
    try {
      // Add status from state since it's managed by the Select component
      formData.set("status", status)
      
      // Call server action
      const result = await createPropertyAction(formData)
      
      if (result.error) {
        setFormState({ pending: false, error: result.error, data: null })
        
        // Special handling for team-related errors
        if (result.error.includes("team")) {
          toast({
            title: "Team Required",
            description: result.error,
            variant: "destructive",
          })
          // Redirect to teams page if no team
          router.push("/app/teams")
          return
        }
        
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }
      
      // Success
      setFormState({ pending: false, error: null, data: result.data })
      toast({
        title: "Property added",
        description: "Your property has been added successfully.",
      })
      
      // Navigate back to properties page
      router.push("/app/properties")
      router.refresh()
    } catch (error: any) {
      setFormState({ 
        pending: false, 
        error: error.message || "Failed to add property", 
        data: null 
      })
      toast({
        title: "Error",
        description: error.message || "Failed to add property. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form action={handleCreateProperty}>
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {optimisticState.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {optimisticState.error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                Property Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Modern Apartment in Downtown"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                defaultValue="Acquisition" 
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Acquisition">Acquisition</SelectItem>
                  <SelectItem value="Preparation">Preparation</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
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
              placeholder="e.g. 123 Main St, New York, NY 10001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
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
              placeholder="e.g. https://example.com/image.jpg"
              defaultValue="/placeholder.svg?height=400&width=600"
            />
            <p className="text-sm text-muted-foreground">
              Enter a URL for the property image. Leave blank to use a placeholder.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" asChild>
            <Link href="/app/properties">Cancel</Link>
          </Button>
          <Button type="submit" disabled={optimisticState.pending}>
            {optimisticState.pending ? (
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
  )
} 