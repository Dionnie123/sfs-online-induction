import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-helpers/server";

export default async function Navbar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-slate-100">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!data.user && (
        <div className="flex gap-2 justify-center">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="default">Register</Button>
          </Link>
        </div>
      )}
      {data.user && (
        <div className="flex gap-2 justify-end">
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
