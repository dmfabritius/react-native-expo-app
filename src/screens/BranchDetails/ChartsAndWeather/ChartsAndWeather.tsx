import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DateRange } from '../../../models';
import { DateRangeInput } from '../../../inputs';
import { BranchDetailsProps } from '..';
import { Daily, Historical } from '.';

export default function ChartsAndWeather({ libraryId, dateRange }: BranchDetailsProps): JSX.Element {
  const { colors } = useTheme();
  const [chartDateRange, setChartDateRange] = useState<DateRange>(dateRange);

  return (
    <>
      <Daily libraryId={libraryId} />
      <View style={[{ backgroundColor: colors.surface }, styles.filters]}>
        <DateRangeInput
          style={styles.dateRangeInput}
          label={'Date Range'}
          dateRange={chartDateRange}
          setDateRange={setChartDateRange}
        />
      </View>
      <Historical libraryId={libraryId} dateRange={chartDateRange} />
    </>
  );
}

const styles = StyleSheet.create({
  dateRangeInput: {
    width: '65%',
  },
  filters: {
    alignItems: 'center',
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
});
