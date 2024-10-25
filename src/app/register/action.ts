"use server";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "./register.schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSignUp(value: any) {
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

    return {
      success: true,
      message: "Account created successfully." + JSON.stringify(data),
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
