// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StoreProvider from '../components/StoreProvider';
import MainMenuBar from './MainMenuBar';

describe('Component <MainMenuBar />', () => {
  it('renders main header and navigates to network, support, settings, and logout', async () => {
    const props: any = { navigation: { navigate: jest.fn() } };
    const screen = render(<MainMenuBar {...props} />, { wrapper: StoreProvider });

    const showMenu = await screen.findByTestId('Show.MenuBar');
    fireEvent.press(showMenu);
    const branch = await screen.findByTestId('MenuItem.ProjSummary');
    fireEvent.press(branch);

    fireEvent.press(showMenu);
    const pipe = await screen.findByTestId('MenuItem.BranchSummary');
    fireEvent.press(pipe);

    fireEvent.press(showMenu);
    const install = await screen.findByTestId('MenuItem.Inactive');
    fireEvent.press(install);

    fireEvent.press(showMenu);
    const note = await screen.findByTestId('MenuItem.Gateways');
    fireEvent.press(note);
  });
});
