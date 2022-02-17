/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import StoreProvider from '../../components/StoreProvider';
import Register from './Register';

describe('Component <Register />', () => {
  let props: any;
  beforeEach(() => (props = { navigation: { navigate: jest.fn(), route: { params: {} } } }));

  it('forgot password request sent successfully', async () => {
    // jest
    //   .spyOn(Auth, 'Register')
    //   .mockImplementation(() => Promise.resolve({ message: 'forgot password request sent' }));
    const screen = render(<Register {...props} />, { wrapper: StoreProvider });
    const goback = await screen.findByTestId('Go.Back');
    fireEvent.press(goback);

    const email = await screen.findByTestId('Email.Input');
    fireEvent.changeText(email, 'test@testing.com');
    const forgot = screen.getByTestId('Forgot.Password');
    await act(async () => fireEvent.press(forgot)); // wait for Formik to handle submit
  });
  it('forgot password request failure', async () => {
    // jest.spyOn(Auth, 'Register').mockImplementation(() => Promise.reject(new Error('test error')));
    const screen = render(<Register {...props} />, { wrapper: StoreProvider });
    const email = await screen.findByTestId('Email.Input');
    fireEvent.changeText(email, 'test@testing.com');
    const forgot = screen.getByTestId('Forgot.Password');
    await act(async () => fireEvent.press(forgot)); // wait for Formik to handle submit
  });
});
