"use client";

import { useState } from "react";
import ProfileForm from "../form";

import { Description, DialogTitle } from "@radix-ui/react-dialog";
import { mutate } from "swr";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateProfile() {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  function handleOnSubmit() {
    setisDialogOpen(false);
    mutate("api/profiles");
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent
          title="Create Profile"
          className="sm:max-w-[425px bg-white"
        >
          <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Create Profile
          </DialogTitle>
          <Description className="sr-only">Create profile.</Description>
          <ProfileForm onSubmit={handleOnSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
