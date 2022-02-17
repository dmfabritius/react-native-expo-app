import { DateRange } from '../../../models';
import Daily from './Daily';
import Historical from './Historical';

export { Daily, Historical };

export interface WeatherProps {
  libraryId: string;
  dateRange?: DateRange;
}
