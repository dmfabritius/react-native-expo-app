import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavParams } from './types';
import { LibrarySummary, LibraryDetails, BranchSummary, BranchDetails } from '../screens';
import MainHeader from '../components/MainHeader';

const Stack = createStackNavigator<MainNavParams>();

export default function MainNav(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'LibrarySummary'}
            screenOptions={{
              header: function main_header({ navigation }) {
                return <MainHeader navigation={navigation} style={styles.header} />;
              },
            }}
          >
            <Stack.Screen name="LibrarySummary" component={LibrarySummary} />
            <Stack.Screen name="LibraryDetails" component={LibraryDetails} />
            <Stack.Screen name="BranchSummary" component={BranchSummary} />
            <Stack.Screen name="BranchDetails" component={BranchDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 45,
  },
});
