/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
import { render, waitFor } from '@testing-library/react-native';
import { LibrarySummary } from '../screens';
import StoreProvider from './StoreProvider';
import { firebaseApp } from '../../firebase.config';
jest.unmock('./StoreProvider');

describe('Component <StoreProvider />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders store', async () => {
    jest.spyOn(auth, 'initializeAuth').mockImplementation(jest.fn());
    const update = jest.fn();
    const doc = jest.fn(() => ({ update }));
    jest.spyOn(firestore, 'collection').mockReturnValue({ doc } as any);
    const props: any = {};
    const screen = render(
      <StoreProvider>
        <LibrarySummary {...props} />
      </StoreProvider>,
    );
    const missing = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
    expect(missing.length).toBe(0);
  });
  // it('renders store2', async () => {
  //   const props: any = {};
  //   const screen = render(
  //     <StoreProvider>
  //       <LibrarySummary {...props} />
  //     </StoreProvider>,
  //   );
  //   const missing = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
  //   expect(missing.length).toBe(0);
  // });
});
