export interface Resource {
  resource_id?: number;
  name: string;
  category: string;
  location?: string;
  availability_status: number;
  image_url?: string; // Added
  last_updated?: Date;
}
