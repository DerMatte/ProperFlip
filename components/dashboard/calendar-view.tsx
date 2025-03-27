"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "./dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addHours,
} from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types for calendar events
type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  location?: string
  description?: string
  source: "google" | "microsoft" | "local"
  color?: string
}

// Types for calendar sources
type CalendarSource = {
  id: string
  name: string
  type: "google" | "microsoft" | "local"
  connected: boolean
  color: string
  selected: boolean
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [calendarSources, setCalendarSources] = useState<CalendarSource[]>([
    { id: "local", name: "My Calendar", type: "local", connected: true, color: "#4f46e5", selected: true },
    { id: "google", name: "Google Calendar", type: "google", connected: false, color: "#ea4335", selected: false },
    {
      id: "microsoft",
      name: "Microsoft Exchange",
      type: "microsoft",
      connected: false,
      color: "#0078d4",
      selected: false,
    },
  ])
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    start: new Date(),
    end: addHours(new Date(), 1),
    allDay: false,
    source: "local",
  })
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isViewingEvent, setIsViewingEvent] = useState(false)
  const [isConnectingAccount, setIsConnectingAccount] = useState(false)
  const [connectingService, setConnectingService] = useState<"google" | "microsoft" | null>(null)

  // Mock data for calendar events
  const mockEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Property Viewing - 123 Main St",
      start: addHours(new Date(), 2),
      end: addHours(new Date(), 3),
      location: "123 Main St, New York, NY",
      description: "Showing the apartment to the Johnson family",
      source: "local",
      color: "#4f46e5",
    },
    {
      id: "2",
      title: "Client Meeting - Sarah Williams",
      start: addHours(new Date(), 5),
      end: addHours(new Date(), 6),
      location: "Office",
      description: "Discussing financing options for the new property",
      source: "local",
      color: "#4f46e5",
    },
    {
      id: "3",
      title: "Property Photoshoot",
      start: addHours(new Date(new Date().setDate(new Date().getDate() + 1)), 10),
      end: addHours(new Date(new Date().setDate(new Date().getDate() + 1)), 12),
      location: "456 Park Ave, New York, NY",
      description: "Professional photographer coming to take pictures of the listing",
      source: "local",
      color: "#4f46e5",
    },
    {
      id: "4",
      title: "Team Meeting",
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      allDay: true,
      location: "Office",
      description: "Monthly team meeting to discuss goals and performance",
      source: "local",
      color: "#4f46e5",
    },
  ]

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch events from your API or directly from Google/Microsoft
        // For now, we'll use mock data
        setTimeout(() => {
          setEvents(mockEvents)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error loading events:", error)
        toast({
          title: "Error loading events",
          description: "Failed to load calendar events. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  // Handle navigation between months
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Handle adding a new event
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the event.",
        variant: "destructive",
      })
      return
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title || "Untitled Event",
      start: newEvent.start || new Date(),
      end: newEvent.end || addHours(new Date(), 1),
      allDay: newEvent.allDay || false,
      location: newEvent.location,
      description: newEvent.description,
      source: "local",
      color: "#4f46e5",
    }

    setEvents([...events, event])
    setIsAddingEvent(false)
    setNewEvent({
      title: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      allDay: false,
      source: "local",
    })

    toast({
      title: "Event added",
      description: "Your event has been added to the calendar.",
    })
  }

  // Handle deleting an event
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsViewingEvent(false)
    setSelectedEvent(null)

    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar.",
    })
  }

  // Handle connecting to external calendar
  const handleConnectCalendar = (type: "google" | "microsoft") => {
    // In a real app, you would initiate OAuth flow here
    setIsLoading(true)

    setTimeout(() => {
      setCalendarSources((sources) =>
        sources.map((source) => (source.type === type ? { ...source, connected: true, selected: true } : source)),
      )

      // Add some mock events from the connected source
      const newEvents: CalendarEvent[] =
        type === "google"
          ? [
              {
                id: "g1",
                title: "Marketing Team Call",
                start: addHours(new Date(new Date().setDate(new Date().getDate() + 1)), 14),
                end: addHours(new Date(new Date().setDate(new Date().getDate() + 1)), 15),
                location: "Google Meet",
                description: "Weekly marketing team sync",
                source: "google",
                color: "#ea4335",
              },
              {
                id: "g2",
                title: "Dentist Appointment",
                start: addHours(new Date(new Date().setDate(new Date().getDate() + 3)), 9),
                end: addHours(new Date(new Date().setDate(new Date().getDate() + 3)), 10),
                location: "Dental Office",
                description: "Regular checkup",
                source: "google",
                color: "#ea4335",
              },
            ]
          : [
              {
                id: "m1",
                title: "Budget Review",
                start: addHours(new Date(new Date().setDate(new Date().getDate() + 2)), 11),
                end: addHours(new Date(new Date().setDate(new Date().getDate() + 2)), 12),
                location: "Microsoft Teams",
                description: "Quarterly budget review with finance team",
                source: "microsoft",
                color: "#0078d4",
              },
              {
                id: "m2",
                title: "Client Presentation",
                start: addHours(new Date(new Date().setDate(new Date().getDate() + 4)), 15),
                end: addHours(new Date(new Date().setDate(new Date().getDate() + 4)), 16),
                location: "Conference Room",
                description: "Presenting new property listings to VIP client",
                source: "microsoft",
                color: "#0078d4",
              },
            ]

      setEvents([...events, ...newEvents])
      setIsLoading(false)
      setIsConnectingAccount(false)

      toast({
        title: `${type === "google" ? "Google Calendar" : "Microsoft Exchange"} connected`,
        description: "Your calendar has been connected successfully.",
      })
    }, 2000)
  }

  // Handle toggling calendar source visibility
  const handleToggleCalendarSource = (sourceId: string) => {
    setCalendarSources((sources) =>
      sources.map((source) => (source.id === sourceId ? { ...source, selected: !source.selected } : source)),
    )
  }

  // Filter events based on selected calendar sources and current view
  const filteredEvents = events.filter((event) => {
    const source = calendarSources.find((s) => s.type === event.source)
    return source?.selected
  })

  // Generate days for the month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  // Group events by day for the month view
  const eventsByDay = daysInMonth.map((day) => {
    return {
      date: day,
      events: filteredEvents.filter(
        (event) =>
          isSameDay(parseISO(event.start.toISOString()), day) ||
          (event.allDay && isSameDay(parseISO(event.end.toISOString()), day)),
      ),
    }
  })

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsAddingEvent(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
            <Select value={view} onValueChange={(value: "month" | "week" | "day") => setView(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => setIsConnectingAccount(true)}
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              Connect Calendar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Calendar Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calendarSources.map((source) => (
                  <div key={source.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`calendar-${source.id}`}
                      checked={source.selected}
                      disabled={!source.connected}
                      onCheckedChange={() => handleToggleCalendarSource(source.id)}
                      className="rounded-full"
                      style={{ backgroundColor: source.selected ? source.color : undefined }}
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <Label
                        htmlFor={`calendar-${source.id}`}
                        className={!source.connected ? "text-muted-foreground" : ""}
                      >
                        {source.name}
                      </Label>
                      {!source.connected && source.id !== "local" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setConnectingService(source.type)
                            setIsConnectingAccount(true)
                          }}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Upcoming Events</h4>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                ) : (
                  <div className="space-y-2">
                    {filteredEvents
                      .filter((event) => event.start >= new Date())
                      .sort((a, b) => a.start.getTime() - b.start.getTime())
                      .slice(0, 5)
                      .map((event) => (
                        <div
                          key={event.id}
                          className="rounded-md border p-2 cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSelectedEvent(event)
                            setIsViewingEvent(true)
                          }}
                        >
                          <div className="flex items-start">
                            <div
                              className="mt-0.5 h-3 w-3 rounded-full mr-2 flex-shrink-0"
                              style={{ backgroundColor: event.color }}
                            />
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{event.title}</p>
                              <p className="text-xs text-muted-foreground">{format(event.start, "MMM d, h:mm a")}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Main View */}
          <Card className="md:col-span-3">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-[600px]">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : view === "month" ? (
                <div className="grid grid-cols-7 border-b">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  {eventsByDay.map(({ date, events }) => (
                    <div
                      key={date.toISOString()}
                      className={`min-h-[100px] border-t border-r p-1 ${
                        isSameMonth(date, currentDate) ? "" : "bg-muted/20"
                      } ${isSameDay(date, new Date()) ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex justify-between">
                        <span className={`text-sm font-medium ${isSameDay(date, new Date()) ? "text-primary" : ""}`}>
                          {format(date, "d")}
                        </span>
                        {events.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {events.length}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                        {events.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs rounded px-1 py-0.5 truncate cursor-pointer"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                            onClick={() => {
                              setSelectedEvent(event)
                              setIsViewingEvent(true)
                            }}
                          >
                            {event.allDay ? "All day: " : ""}
                            {event.title}
                          </div>
                        ))}
                        {events.length > 3 && (
                          <div className="text-xs text-muted-foreground px-1">+{events.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 flex justify-center items-center h-[600px] text-muted-foreground">
                  {view === "week" ? "Week view" : "Day view"} is not implemented in this demo.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>Create a new event on your calendar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="datetime-local"
                  value={newEvent.start ? format(newEvent.start, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      start: e.target.value ? new Date(e.target.value) : new Date(),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={newEvent.end ? format(newEvent.end, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      end: e.target.value ? new Date(e.target.value) : addHours(new Date(), 1),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all-day"
                checked={newEvent.allDay || false}
                onCheckedChange={(checked) => setNewEvent({ ...newEvent, allDay: checked as boolean })}
              />
              <Label htmlFor="all-day">All day event</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location || ""}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Event location (optional)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewingEvent} onOpenChange={setIsViewingEvent}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Event</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="mr-2"
                    style={{
                      borderColor: selectedEvent.color,
                      color: selectedEvent.color,
                    }}
                  >
                    {selectedEvent.source === "google"
                      ? "Google Calendar"
                      : selectedEvent.source === "microsoft"
                        ? "Microsoft Exchange"
                        : "My Calendar"}
                  </Badge>
                  {selectedEvent.allDay && <Badge variant="secondary">All Day</Badge>}
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-start">
                  <Clock className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">
                      {selectedEvent.allDay
                        ? format(selectedEvent.start, "EEEE, MMMM d, yyyy")
                        : `${format(selectedEvent.start, "EEEE, MMMM d, yyyy h:mm a")} - ${format(selectedEvent.end, "h:mm a")}`}
                    </p>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                    <p className="text-sm">{selectedEvent.location}</p>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewingEvent(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Connect Calendar Dialog */}
      <Dialog open={isConnectingAccount} onOpenChange={setIsConnectingAccount}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Calendar</DialogTitle>
            <DialogDescription>Connect your external calendar to sync events.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!connectingService ? (
              <>
                <Button
                  variant="outline"
                  className="flex items-center justify-start h-12"
                  onClick={() => setConnectingService("google")}
                >
                  <div className="h-6 w-6 mr-2 rounded-full" style={{ backgroundColor: "#ea4335" }} />
                  <span>Connect Google Calendar</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-start h-12"
                  onClick={() => setConnectingService("microsoft")}
                >
                  <div className="h-6 w-6 mr-2 rounded-full" style={{ backgroundColor: "#0078d4" }} />
                  <span>Connect Microsoft Exchange</span>
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: connectingService === "google" ? "#ea4335" : "#0078d4",
                    }}
                  >
                    <CalendarDays className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-center text-lg font-medium">
                  Connect to {connectingService === "google" ? "Google Calendar" : "Microsoft Exchange"}
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  You'll be redirected to {connectingService === "google" ? "Google" : "Microsoft"} to authorize access
                  to your calendar.
                </p>
                <div className="flex justify-center pt-2">
                  <Button
                    onClick={() => handleConnectCalendar(connectingService)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsConnectingAccount(false)
                setConnectingService(null)
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

