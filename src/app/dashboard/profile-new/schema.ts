import { boolean, object, string, z } from "zod";

const Role = z.enum(["user", "admin"]);

export const ProfileSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  role: Role.optional().default("user"),
  email: z.string().email("Invalid email format"),
  username: z.string().optional().nullable(),
  fullname: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});
