import { execute } from "../services/mysql.connector";
import { resourceQueries } from "./resources.queries";
import { Resource } from "./resources.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ResourceDAO {
  static async findAll(): Promise<Resource[]> {
    return (await execute<RowDataPacket[]>(
      resourceQueries.readResources,
    )) as Resource[];
  }

  static async findById(id: number): Promise<Resource | null> {
    const rows = (await execute<RowDataPacket[]>(
      resourceQueries.readResourceById,
      [id],
    )) as Resource[];

    return rows.length ? rows[0] : null;
  }

  static async searchByName(name: string): Promise<Resource[]> {
    return (await execute<RowDataPacket[]>(
      resourceQueries.readResourcesByNameSearch,
      [name],
    )) as Resource[];
  }

  static async filterByCategory(category: string): Promise<Resource[]> {
    return (await execute<RowDataPacket[]>(
      resourceQueries.readResourcesByCategory,
      [category],
    )) as Resource[];
  }

  static async filterByAvailability(status: number): Promise<Resource[]> {
    return (await execute<RowDataPacket[]>(
      resourceQueries.readResourcesByAvailability,
      [status],
    )) as Resource[];
  }

  static async create(resource: Resource): Promise<number> {
    const result = await execute<ResultSetHeader>(
      resourceQueries.createResource,
      [
        resource.name,
        resource.category,
        resource.location ?? null,
        resource.availability_status,
        resource.image_url ?? null,
      ],
    );

    return result.insertId;
  }

  static async update(resource: Resource): Promise<void> {
    await execute<ResultSetHeader>(resourceQueries.updateResource, [
      resource.name,
      resource.category,
      resource.location ?? null,
      resource.availability_status,
       resource.image_url ?? null,
      resource.resource_id,
    ]);
  }

  static async delete(id: number): Promise<void> {
    await execute<ResultSetHeader>(resourceQueries.deleteResource, [id]);
  }
}
