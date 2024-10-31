import { SupabaseClient } from "@supabase/supabase-js";

interface FileUpdateParams {
  supabase: SupabaseClient;
  bucket: string;
  recordId: string;
  newFile: File | null;
  oldFileNameOnly: string | null;
}

interface FileUpdateResult {
  success?: boolean;
  error?: Error;
  fileUrl?: string | null;
}

// Refactored function using the parameter type
export async function supabaseUpdateFile({
  supabase,
  bucket,
  recordId,
  newFile,
  oldFileNameOnly,
}: FileUpdateParams): Promise<FileUpdateResult> {
  // If no new file is provided, return the existing file URL
  if (!newFile) return { success: true, fileUrl: oldFileNameOnly };

  try {
    // Delete existing file if it exists

    if (oldFileNameOnly) {
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([oldFileNameOnly]);

      if (deleteError) {
        return { success: false, error: deleteError };
      }
    }

    // Prepare file for upload
    const fileExt = newFile.name.split(".").pop();
    const newFileName = `${recordId}.${Date.now()}.${fileExt}`;

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(newFileName, newFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return { success: false, error: uploadError };
    }

    // Return success with new file URL
    return { success: true, fileUrl: newFileName };
  } catch (error) {
    console.log("IMAGE UPLOAD ERROR" + error);
    return { success: false, error: error as Error };
  }
}
