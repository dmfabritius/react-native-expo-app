export interface Branch {
  createdTimestampUtc: string;
  id: string;
  libraryId: string;

  // Basic Info
  name: string;
  notes: string;
  isDraft: boolean;
  isEnabled: boolean;
  supervisor: string;
  installDate: string;
  status: string;
  connection: string;

  // Location
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  timezoneId: number;
  latitude: number;
  longitude: number;

  // Attributes
  materialId: number;
  shapeId: number;
  amperage: number;
  resistance: number;
  voltage: number;
  isProtected: boolean;
}
