"use server";

import { createClient } from "@/utils/supabase/server";

import { z } from "zod";
import { ProfileSchema } from "./schema";
import { ProfileRepository } from "./repository";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase";

const profileRepository = new ProfileRepository();

export async function getAllProfilesAction(): Promise<Tables<"profile">[]> {
  try {
    let profiles: Tables<"profile">[] = [];
    profiles = await profileRepository.getAll();

    return profiles;
  } catch (error) {
    throw error;
  }
}

export async function getProfileAction(): Promise<Tables<"profile"> | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    const profile = await profileRepository.getOne(user!.id);
    return profile;
  } catch (error) {
    throw error;
  }
}

export async function createProfileAction(value: TablesInsert<"profile">) {
  try {
    const profile = await profileRepository.create(value);
    return profile;
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
    console.log("SERVER ACTION UIPDATE");
    return profile;
  } catch (error) {
    throw error;
  }
}

export async function deleteProfileAction(id: string) {
  try {
    const profile = await profileRepository.delete(id);
    return profile;
  } catch (error) {
    throw error;
  }
}
