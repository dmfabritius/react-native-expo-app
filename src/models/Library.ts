export interface Library {
  createdTimestampUtc: string;
  id: string;
  name: string;
  notes: string;
  
  isDraft: boolean;
  isEnabled: boolean;
  status: string;
  connection: string;
  
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  timezoneId: number;
  latitude: number;
  longitude: number;

  capacity: number;
  branchesCount: number;
}
