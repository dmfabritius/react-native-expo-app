import React, { ReactNode } from 'react';
import AppLoading from 'expo-app-loading';
import { configureFonts, DefaultTheme, Provider } from 'react-native-paper';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

// extend the Paper theme interface with custom properties for TypeScript support
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface Theme {
      customProperty: string; // just an example
    }
    interface ThemeColors {
      active: string;
      disabled: string;
      inactive: string;
      light: string;
      secondary: string;
      subtitle: string;
    }
  }
}

interface Props {
  children: ReactNode;
}

export default function PaperProvider({ children }: Props): JSX.Element {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) return <AppLoading />;

  const fontConfig = {
    default: {
      light: {
        fontFamily: 'Roboto_300Light',
        fontWeight: '300' as const,
      },
      medium: {
        fontFamily: 'Roboto_500Medium',
        fontWeight: '500' as const,
      },
      regular: {
        fontFamily: 'Roboto_400Regular',
        fontWeight: '400' as const,
      },
      thin: {
        fontFamily: 'Roboto_100Thin',
        fontWeight: '100' as const,
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      accent: '#EDFAFF',
      active: '#457b9d',
      disabled: '#BDBDBD',
      inactive: '#757575',
      light: '#f4f4f4',
      primary: '#17314B',
      secondary: '#26BAF9',
      subtitle: '#007bb0',
      surface: '#ffffff',
    },
    customProperty: 'custom property example',
    fonts: configureFonts(fontConfig),
  };

  return <Provider theme={theme}>{children}</Provider>;
}
