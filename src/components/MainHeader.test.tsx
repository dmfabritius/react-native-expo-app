// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StoreProvider from '../components/StoreProvider';
import MainHeader from './MainHeader';

describe('Component <MainHeader />', () => {
  it('renders main header and navigates to network, support, settings, and logout', async () => {
    const props: any = { navigation: { navigate: jest.fn() } };
    const screen = render(<MainHeader {...props} />, { wrapper: StoreProvider });

    const showMenu = await screen.findByTestId('Show.MenuBar');
    fireEvent.press(showMenu);
    const branch = await screen.findByTestId('MenuItem.BranchSummary');
    fireEvent.press(branch);

    fireEvent.press(showMenu);
    const pipe = await screen.findByTestId('MenuItem.Support');
    fireEvent.press(pipe);

    fireEvent.press(showMenu);
    const install = await screen.findByTestId('MenuItem.Settings');
    fireEvent.press(install);

    fireEvent.press(showMenu);
    const note = await screen.findByTestId('MenuItem.Logout');
    fireEvent.press(note);
  });
});
