"use server";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileAction = async (): Promise<Profile | null> => {
  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    const user = userData?.user;

    if (user?.id) {
      const profile = await prisma.profile.findUnique({
        where: { id: user.id },
      });

      return profile;
    }

    return null;
  } catch (error) {
    return null;
  }
};
