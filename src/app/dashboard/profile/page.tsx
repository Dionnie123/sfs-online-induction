import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import AccountForm from "./account-form";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { id: data.user.id },
  });

  if (profile?.role !== "user") {
    redirect("/");
  }

  return <AccountForm user={data.user} />;
}
