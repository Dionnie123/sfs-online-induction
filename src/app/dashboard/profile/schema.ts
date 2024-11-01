import { z } from "zod";
import { ImageSchema } from "./image.schema";

export const ProfileSchema = z.object({
  fullname: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  avatarFile: ImageSchema,
});
