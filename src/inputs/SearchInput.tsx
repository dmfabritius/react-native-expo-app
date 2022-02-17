import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function SearchInput({ style, searchText, setSearchText }: Props): JSX.Element {
  const { colors } = useTheme();
  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        theme={{
          colors: {
            primary: colors.subtitle,
            text: colors.primary,
          },
        }}
        right={<TextInput.Icon color={colors.primary} name="magnify" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    height: 40,
    width: '100%',
  },
});
