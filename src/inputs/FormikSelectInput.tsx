import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { FormikProps, getIn } from 'formik';
import { Picker } from '@react-native-picker/picker';

interface InputProps<T> extends Partial<TextInputProps> {
  testID?: string;
  formik: FormikProps<T>;
  field: Extract<keyof T, string>;
  label: string;
  items: Record<string, string>;
  style?: StyleProp<ViewStyle>;
}

export default function FormikSelectInput<Fields>({
  testID,
  formik,
  field,
  label,
  items,
  style,
}: InputProps<Fields>): JSX.Element {
  const { colors } = useTheme();
  const value = getIn(formik.values, field);

  return (
    <View style={[styles.input, style]}>
      <Text
        style={
          formik.status?.disabled
            ? [{ color: colors.disabled }, styles.label]
            : [{ color: colors.inactive }, styles.label]
        }
      >
        {label}
      </Text>
      <Picker
        testID={testID}
        enabled={!formik.status?.disabled}
        selectedValue={value ? value : items[0]}
        onValueChange={(item) => formik.setFieldValue(field, item)}
        style={
          formik.status?.disabled
            ? [{ color: colors.disabled }, styles.picker]
            : [{ color: colors.primary }, styles.picker]
        }
      >
        {Object.keys(items).map((item, index) => (
          <Picker.Item key={index} label={items[item]} value={item} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  picker: {
    width: '70%',
  },
});
