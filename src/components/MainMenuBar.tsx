import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme, Button, Menu, Text } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { MainNavParams } from '../navigation/types';

interface Props {
  navigation: StackNavigationProp<ParamListBase, string>;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export default function MainMenuBar({ navigation, title, style }: Props): JSX.Element {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const goto = (target: keyof MainNavParams) => {
    setVisible(false);
    navigation.navigate(target);
  };

  return (
    <View style={[{ backgroundColor: colors.accent }, styles.container, style]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            testID="Show.MenuBar"
            onPress={() => setVisible(true)}
            icon={() => <Entypo name="menu" size={24} color={colors.primary} />}
          >
            {''}
          </Button>
        }
      >
        <Menu.Item
          testID="MenuItem.ProjSummary"
          title="LIBRARIES"
          icon="clipboard-text-outline"
          onPress={() => goto('LibrarySummary')}
        />
        <Menu.Item
          testID="MenuItem.BranchSummary"
          title="BRANCHES"
          icon="gauge-low"
          onPress={() => goto('BranchSummary')}
        />
      </Menu>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    elevation: 12,
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.95,
    shadowRadius: 5,
  },
  text: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
