import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Linking } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function Footer({ style }: Props): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.primary }, styles.container, style]}>
      <Text
        testID="Privacy.Link"
        style={[{ color: colors.surface }]}
        onPress={() => {
          Linking.openURL('https://policies.google.com/privacy');
        }}
      >
        Privacy Statement
      </Text>
      <Text style={[{ color: colors.surface }]}>LogoIpsum 2022 v0.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
