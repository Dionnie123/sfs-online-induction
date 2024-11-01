"use client";

import useSWR from "swr";

import { getAllProfilesAction } from "./action";
import Loading from "@/components/loading";
import ProfileForm from "./_components/form";
import { Tables } from "@/lib/supabase-helpers/supabase";

export default function ProfilePage() {
  const { data: profile, isLoading } = useSWR<Tables<"profile">[] | null>(
    "/api/profile",
    getAllProfilesAction
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row justify-start align-middle  space-x-4">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Profile
            </h1>
          </div>

          <ProfileForm profile={profile != null ? profile[0] : null} />
        </>
      )}
    </>
  );
}
