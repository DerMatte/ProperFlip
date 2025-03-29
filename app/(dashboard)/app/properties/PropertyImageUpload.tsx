"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function uploadPropertyImage(formData: FormData) {
  const supabase = await createClient()
  
  // Get the file from the form data
  const imageFile = formData.get("image") as File
  const propertyId = formData.get("propertyId") as string
  
  if (!imageFile || imageFile.size === 0) {
    return { error: "No image provided" }
  }
  
  // Validate the authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Unauthorized" }
  }
  
  // Get user's team
  const { data: teamMember } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .single()
  
  if (!teamMember) {
    return { error: "Team not found" }
  }

  // Use consistent file path: {id}/0.jpg
  const filePath = `${propertyId}/0.jpg`
  
  // Upload the file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('property-images')
    .upload(filePath, imageFile, { 
      upsert: true, // Override if the file already exists
      contentType: 'image/jpeg' 
    })
    
  if (uploadError) {
    return { error: uploadError.message }
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(filePath)
  
  // Update the property with the new image URL
  const { error: updateError } = await supabase
    .from('properties')
    .update({ image_url: publicUrl })
    .eq('id', propertyId)
    .eq('team_id', teamMember.team_id)
  
  if (updateError) {
    return { error: updateError.message }
  }
  
  revalidatePath(`/app/properties/${propertyId}`)
  redirect(`/app/properties/${propertyId}`)
}
