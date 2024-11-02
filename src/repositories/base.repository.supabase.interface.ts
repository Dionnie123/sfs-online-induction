import {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase-helpers/supabase";

import { createClient } from "@/lib/supabase-helpers/server";

const supabase = await createClient();
export default abstract class IBaseRepository<RowType, InsertType, UpdateType> {
  constructor(protected tableName: keyof Database["public"]["Tables"]) {}

  async getAll(): Promise<RowType[]> {
    const { data } = await supabase
      .from(this.tableName)
      .select("*")
      .returns<RowType[]>();

    return data ?? [];
  }

  async getOne(id: string): Promise<RowType | null> {
    const { data } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .maybeSingle<RowType | null>();

    return data;
  }

  async create(data: InsertType): Promise<RowType | null> {
    const { data: createdData } = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single<RowType | null>();

    return createdData;
  }

  async update(id: string, data: UpdateType): Promise<RowType | null> {
    const { data: updatedData, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single<RowType | null>();

    return updatedData;
  }

  async delete(id: string): Promise<RowType | null> {
    const { data: deletedData } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id)
      .select()
      .single<RowType | null>();
    return deletedData;
  }
}
