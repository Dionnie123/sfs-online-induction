"use client";

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
import Image from "next/image";
import { useEffect, useState } from "react";

type AvatarProps = {
  uid: string | null | undefined;
  url: string | null | undefined;
  size: number;
  onUpload: (url: string) => void;
};

export function FileInput({ uid, url, size, onUpload }: AvatarProps) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = event.target.files;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = file.name.split(".").slice(0, -1).join(".");
      const filePath = `${fileName}-${uid}-${Math.random()}.${fileExt}`;

      if (avatarUrl != null) {
        if (!confirm("Replace Profile Picture?")) {
          return;
        }
      }

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
    <>
      {avatarUrl ? (
        <Image
          objectFit="cover"
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-md"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <FormField
        name="avatar"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Picture</FormLabel>
            <Card className="px-4 py-2 rounded-md shadow-none text-sm">
              <p>{url ?? avatarUrl}</p>
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
    </>
  );
}
