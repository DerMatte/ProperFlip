import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import PropertyDetailView from "@/components/dashboard/property-detail-view";

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
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

  return <PropertyDetailView property={property} />;
}
