import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarProps } from "@files-ui/react";
import React from "react";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import useSWR from "swr";
import { cache, mutate } from "swr/_internal";

type FileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    url?: string | null;
  };

export async function fetchImage(path: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("avatars").download(path);
  if (error) throw error;
  console.log(URL.createObjectURL(data));
  return URL.createObjectURL(data);
}

export function AvatarInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ url, label, name, control, rules, ...rest }: FileInputProps<T, U>) {
  const {
    data: initialFileUrl,
    isLoading,
    error,
  } = useSWR(url ? url : null, url ? () => fetchImage(url!) : null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(initialFileUrl);
  const fallBackImage = "/avatar.jpg";
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1)
              : name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>

          <FormControl>
            <Avatar
              onError={() => fallBackImage}
              key={fileUrl}
              emptyLabel=""
              loadingLabel="Loading Image..."
              changeLabel="Upload Image"
              onChange={(uploadedFile) => {
                const newImageURL = URL.createObjectURL(uploadedFile);
                setFileUrl(newImageURL); // Update the local state with the new image URL
                mutate(newImageURL);
                field.onChange(uploadedFile);
                field.onBlur();
              }}
              src={
                isLoading && !fileUrl
                  ? fallBackImage
                  : fileUrl ?? initialFileUrl ?? fallBackImage
              }
              style={{ width: "200px", height: "200px", background: "grey" }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
