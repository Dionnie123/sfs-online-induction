"use client";

import { deleteProfileAction } from "@/app/dashboard/profile-new/action";
import React from "react";
import { mutate } from "swr";

export default function DeleteProfile({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      /* await fetch(`/api/profiles?id=${id}`, {
        method: "DELETE",
      }); */
      await deleteProfileAction(id);
      mutate("/api/profiles");
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <p className="w-full p-2 py-1" onClick={handleDelete}>
        Delete
      </p>
    </>
  );
}
