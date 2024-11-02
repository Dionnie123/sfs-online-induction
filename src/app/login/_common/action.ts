"use server";

import { createClient } from "@/lib/supabase-helpers/server";
import { LoginSchema } from "./login.schema";

export async function handleLogin(value: any) {
  try {
    const parsedCredentials = LoginSchema.safeParse(value);
    if (!parsedCredentials.success) {
      return { success: false, message: "Invalid data." };
    }
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(
      parsedCredentials.data
    );

    if (error) {
      return { success: false, message: "" + error };
    }

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
