"use server";

import { createClient } from "@/utils/supabase/server";
import { TodoRepository } from "./repository";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase";

const todoRepository = new TodoRepository();

export async function getAllTodosAction(): Promise<Tables<"todo">[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    let todos: Tables<"todo">[] = [];
    todos = await todoRepository.getAll();

    return todos;
  } catch (error) {
    throw error;
  }
}

export async function createTodoAction(value: TablesInsert<"todo">) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.create(value);
    return todo;
  } catch (error) {
    throw error;
  }
}

export async function updateTodoAction(
  id: string,
  value: TablesUpdate<"todo">
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
