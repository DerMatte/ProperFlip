import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { EditPropertyForm } from "./edit-property-form";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  // Fetch property data
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    console.error("Error fetching property:", error);
    notFound();
  }

  // Attempt to get the property image from storage
  const { data: imageData } = await supabase.storage
    .from("property-images")
    .createSignedUrl(`${id}/0.jpg`, 60 * 60 * 24 * 30);

  // Add the image URL to property if available
  if (imageData?.signedUrl) {
    property.image_url = imageData.signedUrl;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <EditPropertyForm property={property} />
    </div>
  );
}
