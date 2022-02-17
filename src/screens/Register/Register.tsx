import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Snackbar, Text } from 'react-native-paper';
import { AuthNavProps } from '../../navigation/types';
import RegisterForm from './RegisterForm';
import Card from '../../components/Card';

export default function Register(props: AuthNavProps<'Register'>): JSX.Element {
  const { colors } = useTheme();
  const [failure, setFailure] = React.useState(false);

  return (
    <View style={styles.container}>
      <Snackbar
        style={[{ backgroundColor: colors.error }, styles.failure]}
        visible={failure}
        duration={2000}
        onDismiss={() => setFailure(false)}
      >
        Register user failed
      </Snackbar>
      <View style={[{ backgroundColor: colors.accent }, styles.body]}>
        <Card style={styles.card}>
          <Text style={[{ color: colors.primary }, styles.title]}>WELCOME</Text>
          <RegisterForm setFailure={setFailure} {...props} />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 15,
  },
  card: {
    borderRadius: 15,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  subtitle: {
    marginTop: 20,
    textAlign: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
  },
  failure: {
    alignSelf: 'center',
    width: '40%',
  },
});
