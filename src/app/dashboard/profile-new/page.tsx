"use client";

import useSWR from "swr";
import CreateProfile from "./_components/action-buttons/create";
import ProfileForm from "./_components/form";
import { Profile } from "@prisma/client";
import { getProfileAction } from "./action";

export default function ProfilePage() {
  const {
    data: profile,
    error,
    isLoading,
    isValidating,
  } = useSWR<Profile | undefined>("/api/profile", getProfileAction, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      <div className="flex flex-row justify-start align-middle  space-x-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Create Profile
        </h3>

        <CreateProfile />
      </div>
      <ProfileForm key={"" + profile} profile={profile} />
    </>
  );
}
