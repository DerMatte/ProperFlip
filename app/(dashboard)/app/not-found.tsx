import Link from "next/link";
import { CircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";

export default async function NotFound() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DashboardLayout user={user} signOutAction={signOutAction}>
      <div className="flex items-center justify-center">
        <div className="max-w-md space-y-8 p-4 text-center">
          <div className="flex justify-center">
            <CircleIcon className="size-12 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base text-gray-500">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button asChild>
            <Link href="/app">Back to Home</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
