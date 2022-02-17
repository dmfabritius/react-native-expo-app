import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DateRange } from '../models';

export type AuthNavParams = {
  Login: undefined; // the login page does not take any parameters (hence undefined)
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthNavParams> = {
  navigation: StackNavigationProp<AuthNavParams, T>;
  route: RouteProp<AuthNavParams, T>;
};

export type MainNavParams = {
  LibrarySummary: undefined;
  LibraryDetails: { id: string; dateRange: DateRange };
  BranchSummary: undefined;
  BranchDetails: { id: string; dateRange: DateRange };
};

export type MainNavProps<T extends keyof MainNavParams> = {
  navigation: StackNavigationProp<MainNavParams, T>;
  route: RouteProp<MainNavParams, T>;
};
