import React, { ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default function Card({ style, children }: Props): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={[{ backgroundColor: colors.surface, shadowColor: colors.primary }, styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 12,
    shadowOffset: { height: 3, width: 2 },
    shadowOpacity: 0.95,
    shadowRadius: 8,
  },
});
