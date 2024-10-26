"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import LoadingButton from "@/components/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { LoginSchema } from "./login.schema";
import ErrorMessage from "@/components/error-message";

import { redirect, useRouter } from "next/navigation";
import { handleLogin } from "./action";

export default function RegisterForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const result: ServerActionResponse = await handleLogin(values);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setGlobalError(result.message);
      }
    } catch (error) {
      setGlobalError("" + error);
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {["email", "password"].map((field) => (
            <FormField
              control={form.control}
              key={field}
              name={field as keyof z.infer<typeof LoginSchema>}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        field.includes("password")
                          ? "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      placeholder={`Enter your ${field}`}
                      {...fieldProps}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <LoadingButton pending={form.formState.isSubmitting}>
            Login
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
