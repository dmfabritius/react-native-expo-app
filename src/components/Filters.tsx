import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DateRangeInput, SearchInput } from '../inputs';
import { DateRange } from '../models';

interface Props {
  style?: StyleProp<ViewStyle>;
  searchText: string;
  setSearchText: (text: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export default function Filters({ style, searchText, setSearchText, dateRange, setDateRange }: Props): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.surface }, styles.filters, style]}>
      <SearchInput style={styles.searchInput} searchText={searchText} setSearchText={setSearchText} />
      <DateRangeInput
        style={styles.dateRangeInput}
        label={'Date Range'}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateRangeInput: {
    width: '62%',
  },
  filters: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchInput: {
    width: '38%',
  },
});
