import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { FormikProps } from 'formik';
import FormikTextInput from './FormikTextInput';

interface InputProps<T> extends Partial<TextInputProps> {
  formik: FormikProps<T>;
  field: Extract<keyof T, string>;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function FormikSecureInput<Fields>({
  formik,
  field,
  label,
  style,
  ...props
}: InputProps<Fields>): JSX.Element {
  const [hidePassword, setHidePassword] = React.useState(true);

  return (
    <View>
      <FormikTextInput
        formik={formik}
        field={field}
        label={label}
        style={style}
        secureTextEntry={hidePassword}
        {...props}
      />
      <IconButton
        testID="Toggle.Secure"
        style={styles.eyeIcon}
        icon={hidePassword ? 'eye-off' : 'eye'}
        animated={true}
        onPress={() => setHidePassword((hide) => !hide)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eyeIcon: {
    bottom: '25%',
    left: '85%',
    position: 'absolute',
  },
});
