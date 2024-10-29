import { z } from "zod";
import { Profile } from "@prisma/client";
import { ProfileSchema } from "@/app/dashboard/profile/schema";
import prisma from "@/lib/db";
import IBaseRepository from "@/repositories/base.repository.interface";

export default class TodoRepository extends IBaseRepository<
  Profile,
  z.infer<typeof ProfileSchema>
> {
  constructor() {
    super(prisma.profile);
  }
}
