"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "@/components/error-message";
import { updateProfileAction } from "@/app/dashboard/profile/action";
import { ProfileSchema } from "../../profile/schema";
import { AvatarInput } from "../../../../lib/react-hook-form-helpers/avatar-input";
import { createClient } from "@/utils/supabase/client";
import { supabaseUpdateFile } from "@/lib/supabase-file-updater";
import { Tables } from "@/lib/supabase";
import { TextInput } from "@/lib/react-hook-form-helpers/text-input";

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
          email: profile?.email,
          fullname: profile?.fullname,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormSchema) => {
    try {
      const supabase = createClient();
      let newProfile;
      if (profile === null) {
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
          <AvatarInput
            label="Profile image"
            control={form.control}
            name="avatarFile"
            url={profile?.avatarUrl}
          />
          <TextInput readOnly disabled control={form.control} name="email" />

          <TextInput label="Full name" control={form.control} name="fullname" />

          <LoadingButton pending={form.formState.isSubmitting}>
            {profile ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
