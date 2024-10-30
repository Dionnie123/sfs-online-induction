"use client";

import React from "react";
import useSWR from "swr";
import { Todo } from "@prisma/client";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { getAllTodosAction } from "@/app/dashboard/todos/action";

export default function TodoList() {
  const { data: todos } = useSWR<Todo[]>("/api/todos", getAllTodosAction);

  const todoList = todos || [];

  return <DataTable columns={columns} data={todoList} />;
}
