import { z } from "zod";

import IBaseRepository from "../../../repositories/base.repository.interface";
import { Profile } from "@prisma/client";
import { ProfileSchema } from "@/app/dashboard/profile-new/schema";
import prisma from "@/lib/db";

export default class TodoRepository extends IBaseRepository<
  Profile,
  z.infer<typeof ProfileSchema>
> {
  constructor() {
    super(prisma.profile);
  }
}
