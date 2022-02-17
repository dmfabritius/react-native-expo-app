import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Credentials } from '../../models';
import { StoreContext } from '../../components/StoreProvider';
import { AuthNavProps } from '../../navigation/types';
import { FormikTextInput, FormikSecureInput } from '../../inputs';

const registerValidationSchema = yup.object().shape({
  confirm: yup.string().oneOf([yup.ref('password')], 'Confirmation password must match'),
  password: yup.string().label('Password').required('Password must be at least 8 characters').min(8),
  email: yup.string().label('Email').required('Email is required').min(6).max(128).email('Email must be valid'),
});

interface Props extends AuthNavProps<'Register'> {
  setFailure: (value: boolean) => void;
}

export default function RegisterForm({ setFailure, navigation }: Props): JSX.Element {
  const { colors } = useTheme();
  const { auth } = React.useContext(StoreContext);

  return (
    <Formik<Credentials>
      initialValues={{
        email: '',
        password: '',
        confirm: '',
      }}
      onSubmit={async ({ email, password }) => {
        Keyboard.dismiss();
        try {
          // on success, onAuthStateChanged() in StoreProvider will update userInfo
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          if (!user) setFailure(true);
        } catch (error: any) {
          console.error('Error signing in: ', error.message);
          setFailure(true);
        }
      }}
      validationSchema={registerValidationSchema}
    >
      {(formik) => {
        // disable the submit button until the form has been filled in and is valid
        const disabled = !formik.dirty || !formik.isValid;
        const style = disabled ? styles.fab : [{ backgroundColor: colors.primary }, styles.fab];
        const color = disabled ? undefined : colors.accent;

        return (
          <View style={styles.container}>
            <FormikTextInput
              testID="Email.Input"
              formik={formik}
              field="email"
              label="Email address"
              style={styles.input}
            />
            <FormikSecureInput
              testID="Password.Input"
              formik={formik}
              field="password"
              label="Password"
              style={styles.input}
            />
            <FormikSecureInput
              testID="Confirm.Input"
              formik={formik}
              field="confirm"
              label="Confirm password"
              style={styles.input}
            />
            <View style={styles.buttons}>
              <FAB
                testID="Go.Back"
                style={[{ backgroundColor: colors.primary }, styles.fab]}
                color={colors.accent}
                icon="" // required property
                label="BACK"
                onPress={() => navigation.navigate('Login')}
              />
              {formik.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <FAB
                  testID="Register.User"
                  disabled={disabled}
                  style={style}
                  color={color}
                  icon="" // required property
                  label="REGISTER"
                  onPress={formik.handleSubmit}
                />
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    paddingBottom: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  fab: {
    borderRadius: 12,
    marginTop: 20,
  },
  input: {
    marginBottom: 4,
  },
});
