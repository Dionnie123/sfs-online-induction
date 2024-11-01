"use client";

import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "@/components/error-message";
import { updateProfileAction } from "@/app/dashboard/profile/action";
import { TextInput } from "@/lib/form-helpers";
import { ProfileSchema } from "../../profile/schema";
import { AvatarInput } from "./avatar-input";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { supabaseUpdateFile } from "@/lib/supabase-file-updater";
import { Tables } from "@/lib/supabase";

type ProfileFormProps = {
  profile: Tables<"profile"> | null;
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
        }
      : undefined,
  });

  const _onSubmit = async (values: FormSchema) => {
    try {
      const supabase = createClient();
      let newProfile;
      if (profile === null) {
        //newProfile = await createProfileAction(values );
      } else {
        const { fileUrl } = await supabaseUpdateFile({
          supabase: supabase,
          bucket: "avatars",
          recordId: profile.id,
          newFile: values.avatarFile ?? null,
          oldFileNameOnly: profile.avatarUrl,
        });
        values.avatarUrl = fileUrl;
        values.avatarFile = null;
        delete values.avatarFile;

        console.log(values);
        newProfile = await updateProfileAction(profile.id, values);
      }

      mutate("/api/profile", [newProfile], false);

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
          <hr />

          <AvatarInput
            label="Profile image"
            control={form.control}
            name="avatarFile"
            url={profile?.avatarUrl}
          />
          <FormItem>
            <FormLabel className="space-y-1 leading-none">Email</FormLabel>
            <Input readOnly disabled value={profile?.email} />
          </FormItem>

          <TextInput label="Full name" control={form.control} name="fullname" />

          <LoadingButton pending={form.formState.isSubmitting}>
            {profile ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
