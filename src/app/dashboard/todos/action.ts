"use server";

import { TodoSchema } from "@/app/dashboard/todos/schema";
import prisma from "@/lib/db";
import TodoRepository from "@/app/dashboard/todos/repository";
import { createClient } from "@/utils/supabase/server";
import { Todo } from "@prisma/client";
import { z } from "zod";

const todoRepository = new TodoRepository();

export async function getAllTodosAction(): Promise<Todo[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    const profile = await prisma.profile.findUnique({
      where: { id: user?.id },
    });

    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    let todos: Todo[] = [];
    if (profile?.role == "admin") {
      todos = await todoRepository.getAll();
    } else if (profile?.role == "user") {
      todos = await todoRepository.getAll({
        where: {
          userId: user.id!,
        },
      });
    }

    return todos;
  } catch (error) {
    throw error;
  }
}

export async function createTodoAction(value: z.infer<typeof TodoSchema>) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.create({
      ...value,
      userId: user.id,
    });
    return todo;
  } catch (error) {
    throw error;
  }
}

export async function updateTodoAction(
  id: string,
  value: z.infer<typeof TodoSchema>
) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.update(id, Object.assign(value));
    return todo;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.delete(id);
    return todo;
  } catch (error) {
    throw error;
  }
}
