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

    return { success: true, data };
  } catch (error: any) {
    console.error("Server error:", error);
    return { error: "Failed to create property" };
  }
}
