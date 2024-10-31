import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase";
import IBaseRepository from "@/repositories/base.repository.supabase.interface";

export class TodoRepository extends IBaseRepository<
  Tables<"todo">,
  TablesInsert<"todo">,
  TablesUpdate<"todo">
> {
  constructor() {
    super("todo");
  }
}
