
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import HomeLanding from "@/app/ui/HomeLanding";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role;

  if (role === "teacher") redirect("/teacher");
  if (role === "student") redirect("/student");

  return <HomeLanding />;
}
