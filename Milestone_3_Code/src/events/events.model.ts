export interface Event {
  event_id?: number;
  title: string;
  description?: string;
  event_date: Date;
  resource_id?: number;
  image_url?: string; // Added
}
