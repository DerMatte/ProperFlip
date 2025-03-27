"use client"

import { useState } from "react"
import { DashboardLayout } from "./dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2, RefreshCw, Settings, XCircle } from "lucide-react"
import Image from "next/image"

// Sample data for connected portals
const connectedPortals = [
  {
    id: "immoscout24",
    name: "ImmobilienScout24",
    logo: "/placeholder.svg?height=40&width=120",
    status: "connected",
    lastSync: "2023-03-15T14:30:00",
    properties: 18,
    errors: 2,
  },
  {
    id: "immonet",
    name: "Immonet",
    logo: "/placeholder.svg?height=40&width=120",
    status: "connected",
    lastSync: "2023-03-14T10:15:00",
    properties: 15,
    errors: 0,
  },
  {
    id: "immowelt",
    name: "Immowelt",
    logo: "/placeholder.svg?height=40&width=120",
    status: "disconnected",
    lastSync: null,
    properties: 0,
    errors: 0,
  },
]

// Sample data for available portals
const availablePortals = [
  {
    id: "immoscout24",
    name: "ImmobilienScout24",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Germany's leading real estate marketplace",
    connected: true,
  },
  {
    id: "immonet",
    name: "Immonet",
    logo: "/placeholder.svg?height=40&width=120",
    description: "One of Germany's largest real estate portals",
    connected: true,
  },
  {
    id: "immowelt",
    name: "Immowelt",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Popular German real estate platform",
    connected: false,
  },
  {
    id: "ebay-kleinanzeigen",
    name: "eBay Kleinanzeigen",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Germany's popular classified ads platform",
    connected: false,
  },
  {
    id: "nestoria",
    name: "Nestoria",
    logo: "/placeholder.svg?height=40&width=120",
    description: "International property search engine",
    connected: false,
  },
  {
    id: "idealista",
    name: "Idealista",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Leading real estate portal in Southern Europe",
    connected: false,
  },
]

// Sample data for sync history
const syncHistory = [
  {
    id: "1",
    date: "2023-03-15T14:30:00",
    portal: "ImmobilienScout24",
    status: "completed",
    properties: 18,
    errors: 2,
  },
  {
    id: "2",
    date: "2023-03-14T10:15:00",
    portal: "Immonet",
    status: "completed",
    properties: 15,
    errors: 0,
  },
  {
    id: "3",
    date: "2023-03-13T09:45:00",
    portal: "ImmobilienScout24",
    status: "failed",
    properties: 0,
    errors: 1,
  },
  {
    id: "4",
    date: "2023-03-12T16:20:00",
    portal: "Immonet",
    status: "completed",
    properties: 15,
    errors: 0,
  },
  {
    id: "5",
    date: "2023-03-11T11:30:00",
    portal: "ImmobilienScout24",
    status: "completed",
    properties: 16,
    errors: 0,
  },
]

// Sample data for property sync status
const propertySyncStatus = [
  {
    id: "1",
    title: "Modern Apartment",
    address: "123 Main St, New York, NY",
    immoscout24: "synced",
    immonet: "synced",
    immowelt: "not-synced",
  },
  {
    id: "2",
    title: "Luxury Villa",
    address: "456 Ocean Ave, Miami, FL",
    immoscout24: "synced",
    immonet: "synced",
    immowelt: "not-synced",
  },
  {
    id: "3",
    title: "Cozy Townhouse",
    address: "789 Park Ln, Boston, MA",
    immoscout24: "error",
    immonet: "synced",
    immowelt: "not-synced",
  },
  {
    id: "4",
    title: "Waterfront Condo",
    address: "101 Lake Dr, Chicago, IL",
    immoscout24: "synced",
    immonet: "error",
    immowelt: "not-synced",
  },
  {
    id: "5",
    title: "Mountain Retreat",
    address: "222 Pine Rd, Denver, CO",
    immoscout24: "synced",
    immonet: "synced",
    immowelt: "not-synced",
  },
]

export default function SyndicationView() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedPortal, setSelectedPortal] = useState(null)

  const handleSync = () => {
    setIsSyncing(true)
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Property Syndication</h2>
          <Button onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync All Properties
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="connected" className="space-y-4">
          <TabsList>
            <TabsTrigger value="connected">Connected Portals</TabsTrigger>
            <TabsTrigger value="available">Available Portals</TabsTrigger>
            <TabsTrigger value="properties">Property Status</TabsTrigger>
            <TabsTrigger value="history">Sync History</TabsTrigger>
          </TabsList>

          {/* Connected Portals Tab */}
          <TabsContent value="connected" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {connectedPortals.map((portal) => (
                <Card key={portal.id} className={portal.status === "disconnected" ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-32 relative">
                        <Image
                          src={portal.logo || "/placeholder.svg"}
                          alt={portal.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge
                        variant={portal.status === "connected" ? "outline" : "secondary"}
                        className={portal.status === "connected" ? "border-green-500 text-green-500" : ""}
                      >
                        {portal.status === "connected" ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {portal.status === "connected" ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span>{portal.lastSync ? new Date(portal.lastSync).toLocaleString() : "Never"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Properties:</span>
                          <span>{portal.properties}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Errors:</span>
                          <span className={portal.errors > 0 ? "text-red-500" : "text-green-500"}>{portal.errors}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        This portal is currently disconnected. Connect to start syncing your properties.
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedPortal(portal)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                    {portal.status === "connected" && (
                      <Button size="sm" className="w-full ml-2" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                        Sync
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Available Portals Tab */}
          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availablePortals.map((portal) => (
                <Card key={portal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-32 relative">
                        <Image
                          src={portal.logo || "/placeholder.svg"}
                          alt={portal.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Switch
                        checked={portal.connected}
                        onCheckedChange={() => {}}
                        aria-label={`${portal.connected ? "Disconnect from" : "Connect to"} ${portal.name}`}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{portal.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant={portal.connected ? "outline" : "default"} size="sm" className="w-full">
                      {portal.connected ? "Configure" : "Connect"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Property Status Tab */}
          <TabsContent value="properties" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Sync Status</CardTitle>
                <CardDescription>View and manage the syndication status of your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>ImmobilienScout24</TableHead>
                      <TableHead>Immonet</TableHead>
                      <TableHead>Immowelt</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propertySyncStatus.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-sm text-muted-foreground">{property.address}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {property.immoscout24 === "synced" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Synced
                            </div>
                          ) : property.immoscout24 === "error" ? (
                            <div className="flex items-center text-red-500">
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Error
                            </div>
                          ) : (
                            <div className="flex items-center text-muted-foreground">
                              <XCircle className="mr-1 h-4 w-4" />
                              Not Synced
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {property.immonet === "synced" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Synced
                            </div>
                          ) : property.immonet === "error" ? (
                            <div className="flex items-center text-red-500">
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Error
                            </div>
                          ) : (
                            <div className="flex items-center text-muted-foreground">
                              <XCircle className="mr-1 h-4 w-4" />
                              Not Synced
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {property.immowelt === "synced" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Synced
                            </div>
                          ) : property.immowelt === "error" ? (
                            <div className="flex items-center text-red-500">
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Error
                            </div>
                          ) : (
                            <div className="flex items-center text-muted-foreground">
                              <XCircle className="mr-1 h-4 w-4" />
                              Not Synced
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
                            <RefreshCw className={`mr-2 h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} />
                            Sync
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sync History</CardTitle>
                <CardDescription>View the history of your property syndication activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Portal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                        <TableCell>{item.portal}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "completed"
                                ? "border-green-500 text-green-500"
                                : "border-red-500 text-red-500"
                            }
                          >
                            {item.status === "completed" ? "Completed" : "Failed"}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.properties}</TableCell>
                        <TableCell className={item.errors > 0 ? "text-red-500" : "text-green-500"}>
                          {item.errors}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Portal Configuration Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <span className="hidden">Configure Portal</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Portal Configuration</DialogTitle>
              <DialogDescription>Configure your connection to ImmobilienScout24</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="api-key" className="text-right">
                  API Key
                </Label>
                <Input id="api-key" defaultValue="••••••••••••••••" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue="your_username" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" defaultValue="password" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Auto-Sync</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch id="auto-sync" defaultChecked />
                  <Label htmlFor="auto-sync">Automatically sync new properties</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

