import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Image } from 'react-native';
import { useTheme, Button, Menu } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { StoreContext } from './StoreProvider';
import { MainNavParams } from '../navigation/types';
import { images } from '../assets';

interface Props {
  navigation: StackNavigationProp<ParamListBase, string>;
  style?: StyleProp<ViewStyle>;
}

export default function MainHeader({ navigation, style }: Props): JSX.Element {
  const { colors } = useTheme();
  const { auth, updateStore } = React.useContext(StoreContext);
  const [visible, setVisible] = React.useState(false);

  const goto = (target: keyof MainNavParams) => {
    setVisible(false);
    navigation.navigate(target);
  };

  return (
    <View style={[{ backgroundColor: colors.primary }, styles.container, style]}>
      <Image style={styles.image} source={images.logo_horz} />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button testID="Show.MenuBar" onPress={() => setVisible(true)}>
            <Entypo name="menu" size={24} color={colors.accent} />
          </Button>
        }
      >
        {/* <Menu.Item
          testID="MenuItem.Config"
          title="CONFIGURATION"
          icon="cog"
          onPress={() => goto('Configuration')}
        /> */}
        {/* <Menu.Item
          testID="MenuItem.Setup"
          title="SETUP"
          icon="router-wireless"
          onPress={() => goto('Setup')}
        /> */}
        <Menu.Item
          testID="MenuItem.Logout"
          title="LOG OUT"
          icon="login"
          onPress={() => {
            // onAuthStateChanged() in StoreProvider will update userInfo
            signOut(auth);
          }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  image: {
    height: '100%',
    left: -20,
    resizeMode: 'contain',
  },
});
