import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, Eye, MoreHorizontal, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_title: string;
  created_at: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Closed' | 'Lost';
  message: string;
}

export default async function InquiriesPage() {
  const supabase = await createClient();

  // Fetch inquiries data
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    // You might want to handle this error differently
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inquiries</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Property</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!inquiries || inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {inquiry.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{inquiry.property_title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          inquiry.status === "New"
                            ? "border-blue-500 text-blue-500"
                            : inquiry.status === "Contacted"
                              ? "border-yellow-500 text-yellow-500"
                              : inquiry.status === "Scheduled"
                                ? "border-purple-500 text-purple-500"
                                : "border-green-500 text-green-500"
                        }`}
                      >
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/app/inquiries/${inquiry.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Clock className="h-4 w-4" />
                          <span className="sr-only">Mark as Contacted</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Mark as Scheduled</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close Inquiry</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
