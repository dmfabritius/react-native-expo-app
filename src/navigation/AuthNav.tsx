import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavParams } from './types';
import { Login, Register } from '../screens';
import AuthHeader from '../components/AuthHeader';

const Stack = createStackNavigator<AuthNavParams>();

export default function AuthNav(): JSX.Element {
  return (
    <View style={styles.container}>
      <AuthHeader style={styles.header} />
      <View style={styles.body}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 75,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 25,
  },
});
