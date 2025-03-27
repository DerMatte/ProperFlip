"use client";

import type React from "react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  Globe,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { AIAssistantButton } from "./ai-assistant";

interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: SupabaseUser & { profile?: UserProfile };
  signOutAction: () => Promise<void>;
}

export function DashboardLayout({
  children,
  user,
  signOutAction,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const supabase = createClient();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <Link href="/app" className="flex items-center gap-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">RealtyPro</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app"}
                  className="px-6"
                >
                  <Link href="/app">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === "/app/properties" ||
                    pathname.startsWith("/app/properties/")
                  }
                  className="px-6"
                >
                  <Link href="/app/properties">
                    <Home className="h-5 w-5" />
                    <span>Properties</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/inquiries"}
                  className="px-6"
                >
                  <Link href="/app/inquiries">
                    <MessageSquare className="h-5 w-5" />
                    <span>Inquiries</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/calendar"}
                  className="px-6"
                >
                  <Link href="/app/calendar">
                    <Calendar className="h-5 w-5" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/analytics"}
                  className="px-6"
                >
                  <Link href="/app/analytics">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/syndication"}
                  className="px-6"
                >
                  <Link href="/app/syndication">
                    <Globe className="h-5 w-5" />
                    <span>Syndication</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/apps"}
                  className="px-6"
                >
                  <Link href="/app/apps">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Apps</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app/settings"}
                  className="px-6"
                >
                  <Link href="/app/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={user.profile?.avatar_url || "/placeholder-user.jpg"}
                />
                <AvatarFallback>
                  {user.profile?.full_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "JD"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user.profile?.full_name || user.email || "John Doe"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.profile?.role === "admin"
                    ? "Administrator"
                    : "Premium Agent"}
                </span>
              </div>

              <form action={signOutAction}>
                <Button variant="ghost" size="icon" className="ml-auto" type="submit">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </SidebarFooter>
        </Sidebar>
        {/* Top Bar for Dashboard */}
        <div className="flex-1 w-full">
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger />
            <div className="w-full flex-1">
              <div className="w-full flex-1 flex justify-end">
                <Button
                  variant="outline"
                  className="flex items-center mr-2"
                  asChild
                >
                  <Link href="/app/properties/add">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Property
                  </Link>
                </Button>
              </div>
            </div>
            <AIAssistantButton />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/app/settings">
                <User className="h-4 w-4" />
                <span className="sr-only">User Settings</span>
              </Link>
            </Button>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
