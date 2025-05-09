"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export async function createPropertyAction(formData: FormData) {
  "use server";

  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // First get the user's team
    const { data: teamMember, error: teamError } = await supabase
      .from('team_members')
      .select('team_id, role')
      .eq('user_id', user.id)
      .single();

    if (teamError) {
      console.error("Error fetching team:", teamError);
      return { error: "You must be part of a team to create properties" };
    }

    if (!teamMember) {
      return { error: "Please join or create a team before adding properties" };
    }

    // Extract form data
    const title = formData.get("title") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const bedrooms = parseInt(formData.get("bedrooms") as string);
    const bathrooms = parseInt(formData.get("bathrooms") as string);
    const sqft = parseInt(formData.get("sqft") as string);
    const status = formData.get("status") as string;
    const image_url = formData.get("image_url") as string || "/placeholder.svg?height=400&width=600";
    // Get the uploaded image file if any
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !address || !price || !bedrooms || !bathrooms || !sqft) {
      return { error: "Missing required fields" };
    }

    // Create property data
    const property = {
      title,
      address,
      description,
      price,
      bedrooms,
      bathrooms,
      sqft,
      status: status || "Acquisition",
      image_url,
      created_by: user.id,
      team_id: teamMember.team_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert the property into the database
    const { data, error } = await supabase
      .from("properties")
      .insert(property)
      .select()
      .single();

    if (error) {
      console.error("Error creating property:", error);
      
      // Handle specific RLS error
      if (error.message.includes("row-level security")) {
        return { 
          error: "You don't have permission to create properties for this team. Please contact your team administrator." 
        };
      }
      
      return { error: error.message };
    }

    // If there's an image file, upload it
    if (imageFile && data.id) {
      // Use consistent file path: {id}/0.jpg
      const filePath = `${data.id}/0.jpg`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imageFile, { 
          upsert: true, // Override if the file already exists
          contentType: 'image/jpeg' 
        });
        
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        // Continue with property creation even if image upload fails
      } else {
        // Get the signed URL for the uploaded image
        const { data: imageData } = await supabase.storage
          .from("property-images")
          .createSignedUrl(filePath, 60 * 60 * 24 * 30);
        
        if (imageData?.signedUrl) {
          // Update the property with the image URL
          await supabase
            .from("properties")
            .update({ image_url: imageData.signedUrl })
            .eq('id', data.id)
            .eq('team_id', teamMember.team_id);
        }
      }
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Server error:", error);
    return { error: "Failed to create property" };
  }
}

export async function updatePropertyAction(propertyId: string, formData: FormData) {
  "use server";

  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // First get the user's team
    const { data: teamMember, error: teamError } = await supabase
      .from('team_members')
      .select('team_id, role')
      .eq('user_id', user.id)
      .single();

    if (teamError) {
      console.error("Error fetching team:", teamError);
      return { error: "You must be part of a team to update properties" };
    }

    if (!teamMember) {
      return { error: "Please join or create a team before updating properties" };
    }

    // Extract form data
    const title = formData.get("title") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const bedrooms = parseInt(formData.get("bedrooms") as string);
    const bathrooms = parseInt(formData.get("bathrooms") as string);
    const sqft = parseInt(formData.get("sqft") as string);
    const status = formData.get("status") as string;
    const image_url = formData.get("image_url") as string;
    // Get the uploaded image file if any
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !address || !price || !bedrooms || !bathrooms || !sqft) {
      return { error: "Missing required fields" };
    }

    // Get the property's current data to check team membership
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("team_id")
      .eq("id", propertyId)
      .single();

    if (propertyError) {
      console.error("Error fetching property:", propertyError);
      return { error: "Failed to fetch property" };
    }

    // Verify team membership
    if (property.team_id !== teamMember.team_id) {
      return { error: "Unauthorized: Property belongs to a different team" };
    }

    // Update property data
    const propertyUpdate = {
      title,
      address,
      description,
      price,
      bedrooms,
      bathrooms,
      sqft,
      status: status || "Acquisition",
      updated_at: new Date().toISOString(),
    };

    // Update the property in the database
    const { data, error } = await supabase
      .from("properties")
      .update(propertyUpdate)
      .eq('id', propertyId)
      .eq('team_id', teamMember.team_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating property:", error);
      
      // Handle specific RLS error
      if (error.message.includes("row-level security")) {
        return { 
          error: "You don't have permission to update properties for this team. Please contact your team administrator." 
        };
      }
      
      return { error: error.message };
    }

    // If there's an image file, upload it
    if (imageFile && propertyId) {
      // Use consistent file path: {id}/0.jpg
      const filePath = `${propertyId}/0.jpg`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imageFile, { 
          upsert: true, // Override if the file already exists
          contentType: 'image/jpeg' 
        });
        
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        // Continue with property update even if image upload fails
      } else {
        // Get the signed URL for the uploaded image
        const { data: imageData } = await supabase.storage
          .from("property-images")
          .createSignedUrl(filePath, 60 * 60 * 24 * 30);
        
        if (imageData?.signedUrl) {
          // Update the property with the image URL
          await supabase
            .from("properties")
            .update({ image_url: imageData.signedUrl })
            .eq('id', propertyId)
            .eq('team_id', teamMember.team_id);
        }
      }
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Server error:", error);
    return { error: "Failed to update property" };
  }
}
