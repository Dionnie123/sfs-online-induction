import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { Avatar } from "@files-ui/react";
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

export function FileInputV2<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ url, label, name, control, rules, ...rest }: FileInputProps<T, U>) {
  const supabase = createClient();
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null); // State to hold the file object

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
        setFileUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1)
              : name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>

          <FormControl>
            <Avatar
              changeLabel={"Upload Avatar"}
              onChange={(uploadedFile) => {
                setFile(uploadedFile); // Set the file object
                field.onChange(uploadedFile); // Pass the file to React Hook Form
                setFileUrl(URL.createObjectURL(uploadedFile)); // Update preview
                field.onBlur();
              }}
              src={fileUrl}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
