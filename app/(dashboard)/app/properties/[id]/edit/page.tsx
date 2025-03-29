import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { EditPropertyForm } from "./edit-property-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/app/properties/${property.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Property</h2>
        </div>
      </div>
      <EditPropertyForm property={property} />
    </div>
  );
}
