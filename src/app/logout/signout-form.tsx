"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { handleLogout } from "./action";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  async function logout() {
    const result: ServerActionResponse = await handleLogout();
    if (result.success) {
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
