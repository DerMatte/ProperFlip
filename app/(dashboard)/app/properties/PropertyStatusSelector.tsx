"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";
import { useOptimistic, startTransition } from "react";

// Define the status type to match what's in Property interface
type PropertyStatus = 'Acquisition' | 'Preparation' | 'Marketing' | 'Sold' | 'Lost';

const PropertyStatusOptions = [
  { value: "Acquisition", label: "Acquisition", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  { value: "Preparation", label: "Preparation", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  { value: "Marketing", label: "Marketing", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
  { value: "Sold", label: "Sold", color: "bg-green-100 text-green-800 hover:bg-green-200" },
  { value: "Lost", label: "Lost", color: "bg-red-100 text-red-800 hover:bg-red-200" },
];

export function PropertyStatusSelector({
  property,
  handleStatusChange,
}: {
  property: Property;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [optimisticProperty, updateOptimisticProperty] = useOptimistic(
    property,
    (state, newStatus: PropertyStatus) => ({
      ...state,
      status: newStatus,
    })
  );

  const onStatusChange = async (value: PropertyStatus) => {
    // Wrap in startTransition to fix the error
    startTransition(() => {
      // Optimistically update the UI
      updateOptimisticProperty(value);
    });
    
    try {
      // Then perform the actual server update
      await handleStatusChange(property.id, value);
    } catch (error) {
      console.error("Failed to update property status:", error);
      // You could add a toast notification here
      
      // If there's an error, you might want to revert to the original status
      // This isn't strictly necessary as the page will likely revalidate with the correct status
    }
  };

  const statusOption = PropertyStatusOptions.find((option) => option.value === optimisticProperty.status);
  
  return (
    <Select value={optimisticProperty.status} onValueChange={onStatusChange}>
      <SelectTrigger className="p-0 h-auto border-0 bg-transparent w-auto focus:ring-0 focus:ring-offset-0">
        <Badge 
          variant="outline" 
          className={cn(
            "cursor-pointer transition-colors",
            statusOption?.color
          )}
        >
          {optimisticProperty.status}
        </Badge>
      </SelectTrigger>
      <SelectContent align="start">
        {PropertyStatusOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value as PropertyStatus}
            className="cursor-pointer"
          >
            <Badge variant="outline" className={cn("cursor-pointer", option.color)}>
              {option.label}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}