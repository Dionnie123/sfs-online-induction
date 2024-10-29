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
  updateProfileAction,
} from "@/app/dashboard/profile/action";
import { TextInput } from "@/lib/form-helpers";
import { ProfileSchema } from "../../profile/schema";
import { AvatarInput } from "./avatar-input";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { cache } from "swr/_internal";

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
          fullname: profile?.fullname,
          username: profile?.username,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormSchema) => {
    try {
      let newProfile;
      if (profile === undefined) {
        newProfile = await createProfileAction(values);
      } else {
        if (values.avatarFile !== undefined) {
          const supabase = createClient();
          const file = values.avatarFile;
          const fileExt = file?.name.split(".").pop();
          const filePath = `${profile.id}-${Math.random()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

          if (uploadError) {
            setGlobalError(`${uploadError}`);
          }
          values.avatarUrl = filePath;
        }

        newProfile = await updateProfileAction(profile.id, {
          ...values,
          avatarFile: undefined,
        });
      }
      //   cache.delete("/api/profile");
      mutate("/api/profile", newProfile, false);
      form.reset(newProfile);

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setGlobalError(`${error}`);
    }
  };

  const fallBackImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
          <AvatarInput
            onError={() => fallBackImage}
            label="Profile image"
            control={form.control}
            name="avatarFile"
            url={profile?.avatarUrl}
          />
          <FormItem>
            <FormLabel className="space-y-1 leading-none">Email</FormLabel>
            <Input readOnly disabled value={profile?.email} />
          </FormItem>

          <TextInput
            label="Full name"
            key={profile?.fullname}
            control={form.control}
            name="fullname"
          />
          <TextInput control={form.control} name="username" />
          <LoadingButton pending={form.formState.isSubmitting}>
            {profile ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
