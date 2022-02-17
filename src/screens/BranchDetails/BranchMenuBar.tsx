import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme, Button, Menu, Text } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
const tabs = {
  BasicInfo: 'BASIC INFO',
  Location: 'LOCATION',
  Attributes: 'ATTRIBUTES',
  ChartsAndWeather: 'CHARTS AND WEATHER',
};

interface Props {
  tabIndex: keyof typeof tabs;
  style?: StyleProp<ViewStyle>;
  setTabIndex: Dispatch<SetStateAction<keyof typeof tabs>>;
}

export default function BranchMenuBar({ tabIndex, style, setTabIndex }: Props): JSX.Element {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const goto = (tab: keyof typeof tabs) => {
    setVisible(false);
    setTabIndex(tab);
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
        {Object.keys(tabs).map((tab, index) => (
          <Menu.Item
            testID={`MenuItem.${tab}`}
            key={index}
            title={tabs[tab as keyof typeof tabs]}
            onPress={() => goto(tab as keyof typeof tabs)}
          />
        ))}
      </Menu>
      <Text style={styles.text}>{tabs[tabIndex]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    elevation: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.95,
    shadowRadius: 5,
  },
  text: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
