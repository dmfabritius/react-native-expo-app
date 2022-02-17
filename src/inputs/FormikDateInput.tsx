import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { FormikProps, getIn } from 'formik';
import moment from 'moment';

interface InputProps<T> extends Partial<TextInputProps> {
  formik: FormikProps<T>;
  field: Extract<keyof T, string>;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function FormikDateInput<Fields>({
  formik,
  field,
  label,
  style,
  ...props
}: InputProps<Fields>): JSX.Element {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const value = getIn(formik.values, field);
  const error = getIn(formik.errors, field);
  const errorMessage = getIn(formik.touched, field) ? error : '';

  const handleChange = ({ date }: any) => {
    setVisible(false);
    formik.setFieldValue(field, moment(date).format('YYYY-MM-DD'));
  };

  return (
    <View style={style}>
      <TextInput
        disabled={formik.status?.disabled}
        label={label}
        right={
          <TextInput.Icon
            style={styles.icon}
            color={formik.status?.disabled ? colors.disabled : colors.primary}
            name="calendar"
            onPress={() => setVisible(!formik.status?.disabled)}
          />
        }
        onChangeText={(text) => formik.setFieldValue(field, text)}
        onBlur={() => formik.setFieldTouched(field)}
        value={value ? value + '' : ''} // convert value to string; if undefined/null, use empty string
        error={!!error}
        style={[{ backgroundColor: colors.surface }, styles.input]}
        theme={{
          colors: {
            primary: colors.subtitle,
            text: colors.primary,
          },
        }}
        {...props}
      />
      <Text style={{ color: colors.error }}>{errorMessage}</Text>
      <DatePickerModal
        locale={'en'} // optional, default is english
        mode="single"
        visible={visible}
        // startDate={dateRange.startDate}
        onChange={handleChange}
        onConfirm={handleChange}
        onDismiss={() => setVisible(false)}
        label={label}
        saveLabel="Accept"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 5, // increase the size of the touchable area
  },
  input: {
    paddingHorizontal: 0,
  },
});
