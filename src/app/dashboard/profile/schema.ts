import { z } from "zod";
import { ImageSchema } from "./image.schema";

const Role = z.enum(["user", "admin"]);

export const ProfileSchema = z.object({
  fullname: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  avatarFile: ImageSchema,
});
