"use client";

import { useState } from "react";
import TodoForm from "../form";
import { Description, DialogTitle } from "@radix-ui/react-dialog";
import { Todo } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/lib/supabase";

type UpdateTodoProps = {
  defaultValues: Tables<"todo">;
};

export default function UpdateTodo({ defaultValues }: UpdateTodoProps) {
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
        title="Update Todo"
        className="sm:max-w-[425px bg-white"
      >
        <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Update Todo
        </DialogTitle>
        <Description className="sr-only">Update todo.</Description>
        <DialogHeader></DialogHeader>
        <TodoForm onSubmit={handleOnSubmit} todo={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
