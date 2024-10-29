import { boolean, object, string, z } from "zod";
import { imageSchema } from "./image.schema";

const Role = z.enum(["user", "admin"]);

export const ProfileSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  role: Role.optional().default("user"),
  email: z.string().email("Invalid email format"),
  username: z.string().optional().nullable(),
  fullname: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  avatarFile: imageSchema,
  website: z.string().optional().nullable(),
});
