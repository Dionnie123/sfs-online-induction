import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  /* const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const notes = await prisma.note.findMany({
    where: { userId: data.user.id },
  }); */
  return (
    <main>
      <h1 className="text-2xl text-center mb-8">Protected page</h1>
    </main>
  );
}
