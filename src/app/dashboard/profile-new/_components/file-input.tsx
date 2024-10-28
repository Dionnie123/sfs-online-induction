import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";

import { useState } from "react";

type AvatarProps = {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
};

export function FileInput({ uid, url, onUpload }: AvatarProps) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = event.target.files;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      name="avatar"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>Picture</FormLabel>
          <Card className="px-4 py-2 rounded-md shadow-none text-sm">
            <p>{url}</p>
          </Card>
          <FormControl>
            <Input
              {...fieldProps}
              placeholder="Picture"
              type="file"
              accept="image/*, application/pdf"
              onChange={uploadAvatar}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
