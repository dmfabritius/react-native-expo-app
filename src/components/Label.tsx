import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

interface Props {
  title: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function Label({ title, label, style }: Props): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Text style={[{ color: colors.inactive }, styles.title]}>{title}</Text>
      <Text style={[{ color: colors.subtitle }, styles.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  label: {
    fontSize: 12,
  },
  title: {
    fontSize: 10,
  },
});
