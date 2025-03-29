"use client"

import { useState } from "react"
import { DashboardLayout } from "./dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BellRing, CreditCard, Globe, Lock, Mail, PenSquare, Shield, User } from "lucide-react"

export default function SettingsView() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal and business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" defaultValue="RealtyPro Agency" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue="RE-12345678" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Experienced real estate agent with over 10 years in the industry, specializing in luxury properties and first-time homebuyers."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" defaultValue="https://realtypro.example.com" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" defaultValue="linkedin.com/in/johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" defaultValue="twitter.com/johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" defaultValue="facebook.com/johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" defaultValue="instagram.com/johndoe" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Account Type</h3>
                        <p className="text-sm text-muted-foreground">Your current subscription plan</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                      <Button variant="link" size="sm">
                        Upgrade
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Lock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Update your password</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div></div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="2fa" />
                        <Label htmlFor="2fa">Enable two-factor authentication</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <CreditCard className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Billing Information</h3>
                        <p className="text-sm text-muted-foreground">Manage your payment methods and billing history</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-12 rounded bg-muted"></div>
                            <div>
                              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/24</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <BellRing className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Configure which emails you want to receive</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-inquiries" className="flex-1">
                            New property inquiries
                          </Label>
                          <Switch id="new-inquiries" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="property-updates" className="flex-1">
                            Property status updates
                          </Label>
                          <Switch id="property-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="scheduled-viewings" className="flex-1">
                            Scheduled viewings
                          </Label>
                          <Switch id="scheduled-viewings" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing-emails" className="flex-1">
                            Marketing and promotional emails
                          </Label>
                          <Switch id="marketing-emails" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newsletter" className="flex-1">
                            Monthly newsletter
                          </Label>
                          <Switch id="newsletter" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Notification Delivery</h3>
                        <p className="text-sm text-muted-foreground">Choose how you want to receive notifications</p>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="notification-email">Email Address</Label>
                            <Input id="notification-email" defaultValue="john.doe@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notification-phone">Phone Number (for SMS)</Label>
                            <Input id="notification-phone" defaultValue="(555) 123-4567" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notification-frequency">Notification Frequency</Label>
                          <Select defaultValue="realtime">
                            <SelectTrigger id="notification-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">Real-time</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="weekly">Weekly Summary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your connected third-party services and APIs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Globe className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">Property Portals</h3>
                        <p className="text-sm text-muted-foreground">Connect to real estate listing portals</p>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-muted"></div>
                              <div>
                                <p className="font-medium">ImmobilienScout24</p>
                                <p className="text-xs text-muted-foreground">Connected on Mar 15, 2023</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-muted"></div>
                              <div>
                                <p className="font-medium">Immonet</p>
                                <p className="text-xs text-muted-foreground">Connected on Mar 14, 2023</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-muted"></div>
                              <div>
                                <p className="font-medium">Immowelt</p>
                                <p className="text-xs text-muted-foreground">Not connected</p>
                              </div>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect More Portals
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <PenSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">CRM Integrations</h3>
                        <p className="text-sm text-muted-foreground">Connect your CRM systems</p>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-muted"></div>
                              <div>
                                <p className="font-medium">Salesforce</p>
                                <p className="text-xs text-muted-foreground">Not connected</p>
                              </div>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-muted"></div>
                              <div>
                                <p className="font-medium">HubSpot</p>
                                <p className="text-xs text-muted-foreground">Connected on Feb 10, 2023</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect More CRMs
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5 h-5 w-5 text-muted-foreground">API</div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-medium">API Access</h3>
                        <p className="text-sm text-muted-foreground">Manage your API keys and access</p>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Primary API Key</p>
                              <p className="font-mono text-xs text-muted-foreground">••••••••••••••••••••••••</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Regenerate
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Webhook URL</p>
                              <p className="font-mono text-xs text-muted-foreground">
                                https://api.realtypro.example.com/webhook
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the dashboard looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="border-2 border-primary rounded-md p-2 cursor-pointer">
                        <div className="h-20 bg-background rounded-md"></div>
                      </div>
                      <p className="text-sm text-center">Light</p>
                    </div>
                    <div className="space-y-2">
                      <div className="border-2 border-muted rounded-md p-2 cursor-pointer">
                        <div className="h-20 bg-zinc-900 rounded-md"></div>
                      </div>
                      <p className="text-sm text-center">Dark</p>
                    </div>
                    <div className="space-y-2">
                      <div className="border-2 border-muted rounded-md p-2 cursor-pointer">
                        <div className="h-20 bg-linear-to-b from-background to-zinc-900 rounded-md"></div>
                      </div>
                      <p className="text-sm text-center">System</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Dashboard Layout</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sidebar-collapsed" className="flex-1">
                        Start with sidebar collapsed
                      </Label>
                      <Switch id="sidebar-collapsed" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compact-view" className="flex-1">
                        Compact view
                      </Label>
                      <Switch id="compact-view" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-page">Default landing page</Label>
                      <Select defaultValue="dashboard">
                        <SelectTrigger id="default-page">
                          <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                          <SelectItem value="properties">Properties</SelectItem>
                          <SelectItem value="inquiries">Inquiries</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Regional Settings</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mm-dd-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Missing Badge component - adding it here
function Badge({ className, children, ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

