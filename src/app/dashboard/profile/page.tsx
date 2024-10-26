import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <main>
      <h1 className="text-2xl text-center mb-8">Admin page</h1>
      <pre>{JSON.stringify({ profile }, null, 4)}</pre>
    </main>
  );
}
