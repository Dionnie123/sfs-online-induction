import { z } from "zod";
import { ImageSchema } from "./image.schema";

export const ProfileSchema = z.object({
  email: z.string().email().optional(),
  fullname: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  avatarFile: ImageSchema,
});
