import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Loading(): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
