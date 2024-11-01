"use server";

import { ProfileRepository } from "./repository";
import { Tables, TablesUpdate } from "@/lib/supabase-helpers/supabase";

const profileRepository = new ProfileRepository();

export async function getAllProfilesAction(): Promise<Tables<"profile">[]> {
  try {
    const profiles = await profileRepository.getAll();
    return profiles;
  } catch (error) {
    throw error;
  }
}

export async function updateProfileAction(
  id: string,
  value: TablesUpdate<"profile">
) {
  try {
    const profile = await profileRepository.update(id, value);
    return profile;
  } catch (error) {
    throw error;
  }
}
