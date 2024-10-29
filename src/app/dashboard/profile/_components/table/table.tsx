"use client";

import React from "react";
import useSWR from "swr";
import { Profile } from "@prisma/client";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { getAllProfilesAction } from "@/app/dashboard/profile/action";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfileList() {
  const {
    data: profiles,
    error,
    isLoading,
    isValidating,
  } = useSWR<Profile[]>("/api/profiles", getAllProfilesAction);

  const profileList = profiles || [];

  return <DataTable key="/api/profiles" columns={columns} data={profileList} />;
}
