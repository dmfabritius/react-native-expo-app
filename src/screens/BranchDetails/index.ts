import { FormikProps } from 'formik';
import { Branch, DateRange } from '../../models';
import BranchOverview from './BranchOverview';
import BranchMenuBar from './BranchMenuBar';
import BasicInfo from './BasicInfo';
import ChartsAndWeather from './ChartsAndWeather/ChartsAndWeather';
import Location from './Location';
import Attributes from './Attributes';
import { branchValidationSchema } from './branchValidation';

export { BranchOverview, BranchMenuBar, ChartsAndWeather, BasicInfo, Location, Attributes, branchValidationSchema };

export interface BranchDetailsProps {
  formik: FormikProps<Branch>;
  libraryId: string;
  dateRange: DateRange;
}
