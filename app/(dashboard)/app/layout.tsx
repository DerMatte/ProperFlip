import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
      <DashboardLayout user={user}>
        {children}
      </DashboardLayout>
  );
}




