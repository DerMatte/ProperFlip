"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

const recentInquiries = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    property: "Modern Apartment",
    date: "2023-03-15",
    message: "I'm interested in scheduling a viewing this weekend. Is Saturday morning available?",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "mchen@example.com",
    property: "Luxury Villa",
    date: "2023-03-14",
    message: "Looking for more information about the financing options available for this property.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    property: "Cozy Townhouse",
    date: "2023-03-12",
    message: "I've seen similar properties in the area. Is there room for negotiation on the asking price?",
  },
]

export function RecentInquiries() {
  return (
    <div className="space-y-4">
      {recentInquiries.map((inquiry) => (
        <Card key={inquiry.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {inquiry.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{inquiry.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(inquiry.date).toLocaleDateString()}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Regarding: <span className="font-medium">{inquiry.property}</span>
                </p>
                <p className="text-sm line-clamp-2">{inquiry.message}</p>
                <div className="flex justify-end pt-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <MessageSquare className="mr-2 h-3.5 w-3.5" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="text-center">
        <Button variant="link" size="sm">
          View All Inquiries
        </Button>
      </div>
    </div>
  )
}

