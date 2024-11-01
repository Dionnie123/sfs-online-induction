"use client";

import React from "react";
import useSWR from "swr";
import { Todo } from "@prisma/client";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { getAllTodosAction } from "@/app/dashboard/todos/_common/action";
import { Tables } from "@/lib/supabase-helpers/supabase";

export default function TodoList() {
  const { data: todos } = useSWR<Tables<"todo">[]>(
    "/api/todos",
    getAllTodosAction
  );

  const todoList = todos || [];

  return <DataTable columns={columns} data={todoList} />;
}
