"use client";

import useSWR from "swr";

import { Profile } from "@prisma/client";
import { getProfileAction } from "./action";
import Loading from "@/components/loading";
import ProfileForm from "./_components/form";

export default function ProfilePage() {
  const { data: profile, isLoading } = useSWR<Profile | undefined>(
    "/api/profile",
    getProfileAction
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
          <ProfileForm key={"" + profile} profile={profile} />
        </>
      )}
    </>
  );
}
