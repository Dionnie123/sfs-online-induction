import { z } from "zod";

import IBaseRepository from "../../../repositories/base.repository.interface";
import { Todo } from "@prisma/client";
import { TodoSchema } from "@/app/dashboard/todos/schema";
import prisma from "@/lib/db";

export default class TodoRepository extends IBaseRepository<
  Todo,
  z.infer<typeof TodoSchema>
> {
  constructor() {
    super(prisma.todo);
  }
}
