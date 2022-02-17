import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme, Text, FAB } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import moment from 'moment';
import { DateRange } from '../models';

interface Props {
  style?: StyleProp<ViewStyle>;
  label: string;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export default function DateRangeInput({ style, label, dateRange, setDateRange }: Props): JSX.Element {
  const { colors } = useTheme();
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    endDate: new Date(dateRange.to),
    startDate: new Date(dateRange.from),
  });
  const [visible, setVisible] = useState(false);

  const onChange = React.useCallback(
    ({ endDate, startDate }) => {
      if (!startDate || !endDate) return; // wait until complete range is selected
      setVisible(false);
      setRange({ endDate, startDate });
      setDateRange({ from: startDate.toISOString(), to: endDate.toISOString() }); // send updated range to parent component
    },
    [setVisible, setRange, setDateRange],
  );

  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={[{ color: colors.primary }, styles.label]}>{label}</Text>
        <Text>
          {moment(dateRange.from).format('MM/DD/YYYY')} - {moment(dateRange.to).format('MM/DD/YYYY')}
        </Text>
      </View>
      <FAB
        style={{ backgroundColor: colors.surface }}
        small
        color={colors.primary}
        icon="calendar-range"
        onPress={() => setVisible(true)}
      />
      <DatePickerModal
        locale={'en'} // optional, default is english
        visible={visible}
        label="Date range for metrics"
        saveLabel="Accept"
        endDate={range.endDate}
        startDate={range.startDate}
        // validRange={{ // optional
        //   endDate: new Date(2099, 12, 31),
        //   startDate: new Date(1900, 1, 1),
        // }}
        mode="range"
        onChange={onChange} // optional; fires automatically when date range changes
        onConfirm={() => null} // required; user needs to click save button for this to fire
        onDismiss={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
