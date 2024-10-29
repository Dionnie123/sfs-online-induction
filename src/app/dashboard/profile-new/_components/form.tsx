"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Profile } from "@prisma/client";
import ErrorMessage from "@/components/error-message";

import {
  createProfileAction,
  getProfileAction,
  updateProfileAction,
} from "@/app/dashboard/profile-new/action";
import { CheckboxInput, TextAreaInput, TextInput } from "@/lib/form-helpers";
import { ProfileSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileInput } from "./file-input";
import { FileInputV2 } from "./file-input-v2";

type ProfileFormProps = {
  profile?: Profile;
  onSubmit?: () => void;
};

type FormSchema = z.infer<typeof ProfileSchema>;

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<FormSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profile
      ? {
          id: profile?.id,
          email: profile?.email,
          fullname: profile?.fullname,
          role: profile?.role,
          username: profile?.username,
          avatarUrl: profile?.avatarUrl,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormSchema) => {
    console.log(values.avatarFile);
    try {
      let newProfile;
      if (profile === undefined) {
        newProfile = await createProfileAction(values);
      } else {
        newProfile = await updateProfileAction(profile.id, {
          ...values,
          avatarFile: undefined,
        });
      }

      mutate(newProfile, false);
      form.reset(newProfile);

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setGlobalError(`${error}`);
    }
  };

  const _onUpload = async (url: string) => {
    try {
      let newProfile;
      if (profile === undefined) {
        //  newProfile = await createProfileAction({ , avatarUrl: url});
      } else {
        newProfile = await updateProfileAction(profile.id, {
          ...profile,
          avatarUrl: url,
        });
      }

      mutate(newProfile, false);
      form.reset(newProfile);
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setGlobalError(`${error}`);
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
          <FileInputV2
            control={form.control}
            name="avatarFile"
            url={form.getValues("avatarUrl")}
          />
          <TextInput control={form.control} name="id" />
          <TextInput control={form.control} name="email" />

          <TextInput control={form.control} name="avatarUrl" />
          <TextInput
            key={profile?.fullname}
            control={form.control}
            name="fullname"
          />
          <TextInput control={form.control} name="username" />
          <FileInput
            uid={profile?.id}
            onUpload={(s) => _onUpload(s)}
            size={144}
            url={form.getValues("avatarUrl")}
          />
          <LoadingButton pending={form.formState.isSubmitting}>
            {profile ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
