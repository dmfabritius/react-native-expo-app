import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { images } from '../assets';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function AuthHeader({ style }: Props): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={[{ backgroundColor: colors.primary }, styles.container, style]}>
      <Image style={styles.image} source={images.logo_vert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: '65%',
    marginTop: '5%',
    resizeMode: 'contain',
  },
});
