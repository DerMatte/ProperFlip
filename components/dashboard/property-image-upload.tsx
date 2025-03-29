"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { uploadPropertyImage } from "@/app/(dashboard)/app/properties/PropertyImageUpload"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PropertyImageUploadProps {
  propertyId: string
}

export function PropertyImageUpload({ propertyId }: PropertyImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    try {
      const result = await uploadPropertyImage(formData)
      
      if (result?.error) {
        toast({
          title: "Upload failed",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the image.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="propertyId" value={propertyId} />
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="image" className="text-sm font-medium">
          Property Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
      </div>
      <Button type="submit" disabled={isUploading || !selectedFile}>
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
    </form>
  )
} 