// count the number of lines of source code in all the components
// find . -wholename './src/*.ts*' | xargs wc -l > line_count.txt

// https://github.com/expo/expo/issues/6536
// Need to manually add Intl polyfill for react-native app
// $ expo install intl expo-localization
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Platform } from 'react-native';
if (Platform.OS === 'android') {
  try {
    (Intl as any).__disableRegExpRestore();
  } catch {}
}

import React from 'react';
import StoreProvider from './src/components/StoreProvider';
import PaperProvider from './src/components/PaperProvider';
import Root from './src/components/Root';

export default function App(): JSX.Element {
  return (
    <StoreProvider>
      <PaperProvider>
        <Root />
      </PaperProvider>
    </StoreProvider>
  );
}
