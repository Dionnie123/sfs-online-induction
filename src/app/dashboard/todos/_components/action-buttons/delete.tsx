"use client";

import { deleteTodoAction } from "@/actions/todo";
import React from "react";
import { mutate } from "swr";

export default function DeleteTodo({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      /* await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      }); */
      await deleteTodoAction(id);
      mutate("/api/todos");
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
