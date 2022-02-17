// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import moment from 'moment';
import { rest, server } from '../../msw/setupServer';
import { sleep } from '../../utils';
import StoreProvider from '../../components/StoreProvider';
import LibraryDetails from './LibraryDetails';

// an id number of 0 indicates a new library, otherwise it's an existing one
const createTestProps = (id: number) => ({
  navigation: { goBack: jest.fn(), navigate: jest.fn() },
  route: {
    params: {
      dateRange: {
        from: moment().subtract(1, 'month').toDate().toISOString(),
        to: moment().toDate().toISOString(),
      },
      id,
    },
  },
});

describe('Component <LibraryDetails />', () => {
  it('renders library details', async () => {
    // mount the component and let it load/populate the mock details data
    server.use(library);
    const props: any = createTestProps(1);
    const screen = render(<LibraryDetails {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/LogoIpsum/, { interval: 250 });
    const edit = await screen.findByTestId('Edit.Button');
    fireEvent.press(edit);
    const cancel = await screen.findByTestId('Cancel.Button');
    fireEvent.press(cancel);
    fireEvent.press(edit);
    const submit = await screen.findByTestId('Submit.Button');
    fireEvent.press(submit);
    const back = await screen.findByTestId('Go.Back');
    fireEvent.press(back);
  });
  it('renders new library', async () => {
    // mount the component as a new library
    server.use(library);
    const props: any = createTestProps(0);
    const screen = render(<LibraryDetails {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/Library/, { interval: 250 });
    // screen.debug(`---1--- @ ${new Date()}`);
    // await sleep(500);
  });
  it('handles network error', async () => {
    server.use(library_unavailable);
    const props: any = createTestProps(1);
    const screen = render(<LibraryDetails {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/NO DATA/, { interval: 250 });
    await sleep(250);
  });
});

const library = rest.get('*/library-summary/library/1', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      library: { id: 1, name: 'LogoIpsum' },
    }),
  );
});

const library_unavailable = rest.get('*/library-summary/library/1', (_, res) => {
  return res.networkError('Network error');
});
