import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Credentials, UserInfo } from '../../models';
import { StoreContext } from '../../components/StoreProvider';
import { FormikTextInput, FormikSecureInput } from '../../inputs';

const loginValidationSchema = yup.object().shape({
  email: yup.string().label('Email').required('Email is required').min(6).max(128).email('Email must be valid'),
  password: yup.string().label('Password').required('Password must be at least 8 characters').min(8),
});

interface Props {
  setUserNotFound: (value: boolean) => void;
}

export default function LoginForm({ setUserNotFound }: Props): JSX.Element {
  const { colors } = useTheme();
  const { auth } = React.useContext(StoreContext);

  return (
    <Formik<Credentials>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ email, password }) => {
        Keyboard.dismiss();
        try {
          // on success, onAuthStateChanged() in StoreProvider will update userInfo
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          if (!user) setUserNotFound(true);
        } catch (error: any) {
          console.error('Error signing in: ', error.message);
          setUserNotFound(true);
        }
      }}
      validationSchema={loginValidationSchema}
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
            {formik.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <FAB
                testID="Sign.In"
                disabled={disabled}
                style={style}
                color={color}
                icon="" // required property
                label="SIGN IN"
                onPress={formik.handleSubmit}
              />
            )}
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  fab: {
    alignSelf: 'center',
    bottom: 5,
    width: '60%',
  },
  input: {
    marginBottom: 4,
  },
});
