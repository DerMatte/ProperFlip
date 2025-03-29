import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <HeaderAuth />
      <Link href="/app" className="py-16">
        <Button>
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Button>
      </Link>
      {children}
    </div>
  );
}
