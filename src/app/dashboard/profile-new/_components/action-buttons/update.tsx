"use client";

import { useState } from "react";
import ProfileForm from "../form";
import { Description, DialogTitle } from "@radix-ui/react-dialog";
import { Profile } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

type UpdateProfileProps = {
  defaultValues: Profile;
};

export default function UpdateProfile({ defaultValues }: UpdateProfileProps) {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  function handleOnSubmit() {
    setisDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} modal={true} onOpenChange={setisDialogOpen}>
      <DialogTrigger asChild>
        <p className="w-full p-2 py-1">Update</p>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        title="Update Profile"
        className="sm:max-w-[425px bg-white"
      >
        <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Update Profile
        </DialogTitle>
        <Description className="sr-only">Update profile.</Description>
        <DialogHeader></DialogHeader>
        <ProfileForm onSubmit={handleOnSubmit} profile={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
