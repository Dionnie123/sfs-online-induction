import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase-helpers/supabase";
import IBaseRepository from "@/repositories/base.repository.supabase.interface";

export class ProfileRepository extends IBaseRepository<
  Tables<"profile">,
  TablesInsert<"profile">,
  TablesUpdate<"profile">
> {
  constructor() {
    super("profile");
  }
}
