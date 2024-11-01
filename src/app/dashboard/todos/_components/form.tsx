"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { mutate } from "swr";

import ErrorMessage from "@/components/error-message";

import { updateTodoAction } from "@/app/dashboard/todos/action";

import { TodoSchema } from "../schema";
import { Tables } from "@/lib/supabase-helpers/supabase";
import { CheckboxInput } from "@/lib/react-hook-form-helpers/checkbox-input";
import { TextAreaInput } from "@/lib/react-hook-form-helpers/text-area-input";
import { TextInput } from "@/lib/react-hook-form-helpers/text-input";

type TodoFormProps = {
  todo?: Tables<"todo">;
  onSubmit: () => void;
};

type FormSchema = z.infer<typeof TodoSchema>;

export default function TodoForm({ todo, onSubmit }: TodoFormProps) {
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<FormSchema>({
    resolver: zodResolver(TodoSchema),
    defaultValues: todo
      ? {
          title: todo.title,
          description: todo.description,
          isCompleted: todo.isCompleted,
          userId: todo.userId,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormSchema) => {
    try {
      if (todo === undefined) {
        // await createTodoAction(values);
      } else {
        await updateTodoAction(todo.id, values);
      }
      mutate("/api/todos");
      form.reset();
      onSubmit();
    } catch (error) {
      setGlobalError(`${error}`);
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
          <TextInput control={form.control} name="title" />
          <TextAreaInput control={form.control} name="description" />
          <CheckboxInput
            label="Have you completed this Task?"
            control={form.control}
            name="isCompleted"
          />
          <LoadingButton pending={form.formState.isSubmitting}>
            {todo ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
