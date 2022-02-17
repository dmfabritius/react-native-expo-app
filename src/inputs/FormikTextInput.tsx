import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { FormikProps, getIn } from 'formik';

interface InputProps<T> extends Partial<TextInputProps> {
  formik: FormikProps<T>;
  field: Extract<keyof T, string>;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function FormikTextInput<Fields>({
  formik,
  field,
  label,
  style,
  ...props
}: InputProps<Fields>): JSX.Element {
  const { colors } = useTheme();
  const value = getIn(formik.values, field);
  const error = getIn(formik.errors, field);
  const errorMessage = getIn(formik.touched, field) ? error : '';

  return (
    <View style={style}>
      <TextInput
        disabled={formik.status?.disabled}
        label={label}
        onChangeText={(text) => formik.setFieldValue(field, text)}
        onBlur={() => formik.setFieldTouched(field)}
        value={value ? value + '' : ''} // convert value to string; if undefined/null, use empty string
        error={!!error}
        style={[{ backgroundColor: colors.surface }, styles.input]}
        {...props}
      />
      <Text style={{ color: colors.error }}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 0,
  },
});
