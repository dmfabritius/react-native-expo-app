/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react-native';
import StoreProvider from '../../components/StoreProvider';
import Login from './Login';
import { act } from 'react-test-renderer';

describe('Component <Login />', () => {
  it('sign in successfully', async () => {
    // jest.spyOn(Auth, 'signIn').mockImplementation(() =>
    //   Promise.resolve({
    //     attributes: {
    //       'custom:roles': '[{"id":230,"customerId":1,"role":"OWNER"}]',
    //       'custom:userId': '186',
    //     },
    //   }),
    // );
    const props: any = { navigation: { navigate: jest.fn() } };
    const screen = render(<Login {...props} />, { wrapper: StoreProvider });
    const forgot = await screen.findByText(/FORGOT/);
    fireEvent.press(forgot);

    const email = screen.getByTestId('Email.Input');
    fireEvent.changeText(email, 'test@testing.com');
    const password = screen.getByTestId('Password.Input');
    fireEvent.changeText(password, 'password');
    const toggle = screen.getByTestId('Toggle.Secure');
    fireEvent.press(toggle);

    const signin = screen.getByTestId('Sign.In');
    await act(async () => fireEvent.press(signin)); // wait for Formik to handle submit
  });
  it('sign in failure', async () => {
    // jest.spyOn(Auth, 'signIn').mockImplementation(() => Promise.reject(new Error('test error')));
    const props: any = { navigation: { navigate: jest.fn() } };
    const screen = render(<Login {...props} />, { wrapper: StoreProvider });
    const forgot = await screen.findByText(/FORGOT/);
    fireEvent.press(forgot);

    const email = screen.getByTestId('Email.Input');
    fireEvent.changeText(email, 'test@testing.com');
    const password = screen.getByTestId('Password.Input');
    fireEvent.changeText(password, 'password');
    const signin = screen.getByTestId('Sign.In');
    fireEvent.press(signin);

    await screen.findByText(/User not found/);
    await waitForElementToBeRemoved(() => screen.queryByText(/User not found/));
  });
});
