import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme, Snackbar, Text } from 'react-native-paper';
import { AuthNavProps } from '../../navigation/types';
import LoginForm from './LoginForm';
import Card from '../../components/Card';

export default function Login({ navigation }: AuthNavProps<'Login'>): JSX.Element {
  const { colors } = useTheme();
  const [userNotFound, setUserNotFound] = React.useState(false);

  return (
    <View style={styles.container}>
      <Snackbar
        style={[{ backgroundColor: colors.error }, styles.userNotFound]}
        visible={userNotFound}
        duration={2000}
        onDismiss={() => setUserNotFound(false)}
      >
        User not found
      </Snackbar>
      <View style={[{ backgroundColor: colors.accent }, styles.body]}>
        <Card style={styles.card}>
          <Text style={[{ color: colors.primary }, styles.title]}>WELCOME</Text>
          <LoginForm setUserNotFound={setUserNotFound} />
        </Card>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 15,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  register: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    padding: 10, // increases the size of the touchable area
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
  },
  userNotFound: {
    alignSelf: 'center',
    width: '40%',
  },
});
