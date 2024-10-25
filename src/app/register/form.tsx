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
import { RegisterSchema } from "./register.schema";
import ErrorMessage from "@/components/error-message";
import { handleSignUp } from "./action";
import { redirect, useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const result: ServerActionResponse = await handleSignUp(values);
      if (result.success) {
        //setGlobalError(result.message);
        router.push("/auth/verify-request");
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
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <FormField
              control={form.control}
              key={field}
              name={field as keyof z.infer<typeof RegisterSchema>}
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
            Sign up
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
