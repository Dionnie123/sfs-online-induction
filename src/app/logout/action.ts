"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
