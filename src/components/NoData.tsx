import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default function NoData(): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NO DATA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
