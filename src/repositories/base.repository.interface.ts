import { PrismaClient } from "@prisma/client/extension";

const DEFAULT_ORDER_BY = {
  createdAt: "desc",
};
const MAX_RECORDS_LIMIT = 100;

export default abstract class IBaseRepository<T, Z> {
  constructor(protected modelClient: PrismaClient) {}

  getAll(options: Record<string, any> = {}): Promise<T[]> {
    if (!options.orderBy) {
      options.orderBy = DEFAULT_ORDER_BY;
    }
    if (!options.take || options.take > MAX_RECORDS_LIMIT) {
      options.take = MAX_RECORDS_LIMIT;
    }

    return this.modelClient.findMany(options);
  }

  getOne(id: string): Promise<T | null> {
    return this.modelClient.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: Z): Promise<T> {
    return this.modelClient.create({
      data: data,
    });
  }

  update(id: string, data: Z): Promise<T> {
    return this.modelClient.update({
      where: { id },
      data: data,
    });
  }

  delete(id: string): Promise<T> {
    return this.modelClient.delete({
      where: { id },
    });
  }
}
