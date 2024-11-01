"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { handleLogout } from "../_common/action";
import { redirect } from "next/navigation";
import { useSWRConfig } from "swr";

export default function LogoutButton() {
  const { mutate } = useSWRConfig();
  async function logout() {
    const result: ServerActionResponse = await handleLogout();
    if (result.success) {
      await mutate((key) => true, undefined, { revalidate: false });
      redirect("/login");
    } else {
      console.log(result.message);
    }
  }

  return (
    <Button onClick={logout} className="w-full" variant="default" type="submit">
      Sign Out
    </Button>
  );
}
