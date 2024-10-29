"use server";

import prisma from "@/lib/db";
import ProfileRepository from "@/app/dashboard/profile/repository";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@prisma/client";
import { z } from "zod";
import { ProfileSchema } from "./schema";

const profileRepository = new ProfileRepository();

export async function getAllProfilesAction(): Promise<Profile[]> {
  try {
    let profiles: Profile[] = [];
    profiles = await profileRepository.getAll();

    return profiles;
  } catch (error) {
    throw error;
  }
}

export async function getProfileAction(): Promise<Profile | undefined> {
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

export async function createProfileAction(
  value: z.infer<typeof ProfileSchema>
) {
  try {
    const profile = await profileRepository.create({
      ...value,
    });
    return profile;
  } catch (error) {
    throw error;
  }
}

export async function updateProfileAction(
  id: string,
  value: z.infer<typeof ProfileSchema>
) {
  try {
    const profile = await profileRepository.update(id, Object.assign(value));
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
