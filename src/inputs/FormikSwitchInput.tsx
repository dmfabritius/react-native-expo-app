import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, Text, Switch } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { FormikProps, getIn } from 'formik';

interface InputProps<T> extends Partial<TextInputProps> {
  testID?: string;
  formik: FormikProps<T>;
  field: Extract<keyof T, string>;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function FormikSwitchInput<Fields>({
  testID,
  formik,
  field,
  label,
  style,
}: InputProps<Fields>): JSX.Element {
  const { colors } = useTheme();

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
      <Switch
        testID={testID}
        disabled={formik.status?.disabled}
        value={getIn(formik.values, field)}
        onValueChange={(item) => formik.setFieldValue(field, item)}
        color={colors.primary}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
  },
  switch: {
    width: '20%',
  },
});
