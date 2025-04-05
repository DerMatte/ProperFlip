import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarClient } from "@/components/dashboard/calendar-client"

export default async function CalendarPage() {
  const supabase = await createClient()

  // Fetch events data
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    // You might want to handle this error differently
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-5">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarClient initialEvents={events || []} />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!events || events.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex items-center gap-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.start_time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 