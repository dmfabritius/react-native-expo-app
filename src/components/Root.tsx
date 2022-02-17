import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { StoreContext } from './StoreProvider';
import { AuthNav, MainNav } from '../navigation';
import Footer from './Footer';

export default function Root(): JSX.Element {
  const { colors } = useTheme();
  const { userInfo } = React.useContext(StoreContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.body}>{userInfo ? <MainNav /> : <AuthNav />}</View>
        <Footer style={styles.footer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 96,
  },
  container: {
    flex: 1,
  },
  footer: {
    flex: 4,
  },
});
