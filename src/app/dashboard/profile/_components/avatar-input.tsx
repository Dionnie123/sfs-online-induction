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

type FileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    url?: string | null;
  };

const fallBackImage = "/avatar.jpg";

export function AvatarInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ url, label, name, control, rules, ...rest }: FileInputProps<T, U>) {
  const supabase = createClient();
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function downloadImage(path: string) {
      setLoading(true);

      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setFileUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }

      setLoading(false);
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

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
            {!loading ? (
              <Avatar
                emptyLabel=""
                loadingLabel={"Loading Image..."}
                changeLabel={"Upload Image"}
                onChange={(uploadedFile) => {
                  setFileUrl(URL.createObjectURL(uploadedFile));
                  field.onChange(uploadedFile);
                  field.onBlur();
                }}
                src={fileUrl}
              />
            ) : (
              <div style={{ width: 200, height: 200 }}></div>
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
