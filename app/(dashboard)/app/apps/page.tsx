import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Box, Globe, Lock, Settings } from "lucide-react"

interface App {
  id: string
  name: string
  description: string
  status: 'installed' | 'not_installed'
  category: string
  permissions: string[]
  icon?: string
}

export default async function AppsPage() {
  const supabase = await createClient()

  // Fetch apps data
  const { data: apps, error } = await supabase
    .from("apps")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching apps:", error)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Apps</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apps?.map((app: App) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {app.icon ? (
                    <img src={app.icon} alt={app.name} className="h-8 w-8" />
                  ) : (
                    <Box className="h-8 w-8" />
                  )}
                  <div>
                    <CardTitle>{app.name}</CardTitle>
                    <CardDescription>{app.category}</CardDescription>
                  </div>
                </div>
                <Switch
                  id={`${app.id}-status`}
                  defaultChecked={app.status === "installed"}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {app.description}
                </p>
                <div className="space-y-2">
                  <Label>Required Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {app.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        <Lock className="mr-1 h-3 w-3" />
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    {app.status === "installed" ? "Uninstall" : "Install"}
                  </Button>
                  {app.status === "installed" && (
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 