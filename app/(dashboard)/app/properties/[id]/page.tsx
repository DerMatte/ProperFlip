import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Property } from "@/types/property";
import Image from "next/image";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PropertyImageUpload } from "@/components/dashboard/property-image-upload";
import { PropertyStatusSelector } from "../PropertyStatusSelector";
import { updatePropertyStatus } from "../page";

export default async function PropertyDetailPage({
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

  const { data: imageData } = await supabase.storage
    .from("property-images")
    .createSignedUrl(`${id}/0.jpg`, 60 * 60 * 24 * 30);

  // console.log(imageData?.signedUrl);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/app/properties">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">
              {property.title}
            </h2>
            <PropertyStatusSelector
              property={property}
              handleStatusChange={updatePropertyStatus}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/app/properties/${property.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-lg overflow-hidden">
            <CardContent className="p-0 w-full relative min-h-full">
              <Image
                src={imageData?.signedUrl || "/placeholder.svg?w=300&h=500"}
                alt={property.title}
                className="object-cover object-center"
                fill
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold">{property.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="text-lg font-semibold">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="text-lg font-semibold">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Square Feet</p>
                  <p className="text-lg font-semibold">
                    {property.sqft.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Price per Sq Ft
                  </p>
                  <p className="text-lg font-semibold">
                    $
                    {Math.round(
                      property.price / property.sqft
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-lg">{property.address}</p>
              </div>

              {property.description && (
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-lg whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="p-4 md:p-8">
        <h3 className="text-xl font-semibold mb-4">Update Property Image</h3>
        <PropertyImageUpload propertyId={property.id} />
      </div>
    </>
  );
}
