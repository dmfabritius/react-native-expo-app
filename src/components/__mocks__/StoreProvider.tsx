/*
    Mock version for testing.

    Testing Context with React Native Testing Library
    https://www.youtube.com/watch?v=BPAG3V5D-EY
*/
import React, { createContext, ReactNode } from 'react';
import axios from 'axios';
import PaperProvider from '../PaperProvider';

interface Props {
  children: ReactNode;
}

export const StoreContext = createContext({});
export default function StoreProvider({ children }: Props): JSX.Element {
  return (
    <StoreContext.Provider
      value={{
        axiosAtmos: axios.create({ timeout: 100 }),
        axiosNonAuth: axios.create({ timeout: 100 }),
        axiosThorDev: axios.create({ timeout: 100 }),
        updateStore: () => jest.fn(),
        userInfo: {
          customerId: '1',
          roleId: '99',
          userId: '186',
        },
      }}
    >
      <PaperProvider>{children}</PaperProvider>
    </StoreContext.Provider>
  );
}
