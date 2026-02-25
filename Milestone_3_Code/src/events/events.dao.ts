import { execute } from "../services/mysql.connector";
import { eventQueries } from "./events.queries";
import { Event } from "./events.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class EventDAO {
  static async findAll(): Promise<Event[]> {
    return (await execute<RowDataPacket[]>(eventQueries.readEvents)) as Event[];
  }

  static async findById(id: number): Promise<Event | null> {
    const rows = (await execute<RowDataPacket[]>(eventQueries.readEventById, [
      id,
    ])) as Event[];

    return rows.length ? rows[0] : null;
  }

  static async searchByTitle(title: string): Promise<Event[]> {
    return (await execute<RowDataPacket[]>(
      eventQueries.readEventsByTitleSearch,
      [title],
    )) as Event[];
  }

  static async filterByDate(date: string): Promise<Event[]> {
    return (await execute<RowDataPacket[]>(eventQueries.readEventsByDate, [
      date,
    ])) as Event[];
  }

  static async filterByResource(resourceId: number): Promise<Event[]> {
    return (await execute<RowDataPacket[]>(eventQueries.readEventsByResource, [
      resourceId,
    ])) as Event[];
  }

  static async create(event: Event): Promise<number> {
    const result = await execute<ResultSetHeader>(eventQueries.createEvent, [
      event.title,
      event.description ?? null,
      event.event_date,
      event.resource_id ?? null,
      event.image_url ?? null,
    ]);

    return result.insertId;
  }

  static async update(event: Event): Promise<void> {
    await execute<ResultSetHeader>(eventQueries.updateEvent, [
      event.title,
      event.description ?? null,
      event.event_date,
      event.resource_id ?? null,
      event.image_url ?? null,
      event.event_id,
    ]);
  }

  static async delete(id: number): Promise<void> {
    await execute<ResultSetHeader>(eventQueries.deleteEvent, [id]);
  }
}
