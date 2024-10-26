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

import { redirect, useRouter } from "next/navigation";
import { handleRegister } from "./action";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const result: ServerActionResponse = await handleRegister(values);
      if (result.success) {
        if (result.message.includes("verification")) {
          router.push("/auth/verify-request");
        } else {
          router.push("/dashboard");
        }
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
          {["email", "password", "confirmPassword"].map((field) => (
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
          <Link href="/login">Login</Link>
        </form>
      </Form>
    </>
  );
}
