"use server";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "./register.schema";

export async function handleRegister(value: any) {
  try {
    const parsedCredentials = RegisterSchema.safeParse(value);
    if (!parsedCredentials.success) {
      return { success: false, message: "Invalid data." };
    }
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signUp(parsedCredentials.data);

    if (error) {
      return { success: false, message: "" + error };
    }

    if (data.user?.confirmed_at !== undefined) {
      return {
        success: true,
        message: "Account created successfully but needs verification.",
      };
    }

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
