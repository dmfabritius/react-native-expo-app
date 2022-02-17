import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { rest, server } from '../msw/setupServer';
import StoreProvider from '../components/StoreProvider';
import Root from './Root';

describe('Component <Root />', () => {
  it('component renders logged out', async () => {
    const screen = render(<Root />);
    await screen.findAllByText(/WELCOME/, { interval: 500, timeout: 500 });
  });
  it('component renders logged in', async () => {
    server.use(unavailable);
    const screen = render(<Root />, { wrapper: StoreProvider });
    const missing = await waitFor(() => screen.queryAllByText(/WELCOME/), { interval: 500, timeout: 500 });
    expect(missing.length).toBe(0);

    const privacy = screen.getByTestId('Privacy.Link');
    fireEvent.press(privacy);
  });
});

const unavailable = rest.get('*', (_, res) => {
  return res.networkError('Network error');
});
